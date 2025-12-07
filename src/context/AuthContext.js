import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectInProgress, setRedirectInProgress] = useState(false);

  // Registrar novo usuário com email e senha
  async function signup(email, password) {
    let userCredential = null;
    console.log("Iniciando processo de registro...");
    
    try {
      console.log("Criando conta de autenticação...");
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Conta de autenticação criada com sucesso.");
      
      try {
        console.log("Criando documento de usuário no Firestore...");
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: email,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        });
        console.log("Documento de usuário criado com sucesso.");
      } catch (firestoreError) {
        console.error("Erro ao criar documento de usuário:", firestoreError);
      }
      
      console.log("Processo de registro concluído com sucesso.");
      return userCredential;
    } catch (authError) {
      console.error("Erro na autenticação durante registro:", authError);
      throw authError;
    }
  }

  // Login com email e senha
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Login com Google
  async function loginWithGoogle() {
    try {
      console.log("Iniciando login com Google...");
      const provider = new GoogleAuthProvider();
      
      // Adicionando escopo para garantir acesso adequado
      provider.addScope('https://www.googleapis.com/auth/userinfo.email');
      provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
      
      // Adicionando configuração para melhorar compatibilidade
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      
      // Usar sempre popup para todos os dispositivos
      console.log("Usando popup para autenticação...");
      try {
        const result = await signInWithPopup(auth, provider);
        console.log("Login com Google realizado com sucesso para:", result.user.email);
        
        await updateUserDataAfterLogin(result.user);
        return result;
      } catch (popupError) {
        console.error("Erro ao tentar login com popup:", popupError);
        
        // Se o popup falhar, tentar uma vez com redirecionamento
        if (popupError.code === 'auth/popup-blocked' || popupError.code === 'auth/popup-closed-by-user') {
          console.warn("Popup bloqueado ou fechado, tentando com redirecionamento");
          setRedirectInProgress(true);
          localStorage.setItem('authRedirectInProgress', 'true');
          await signInWithRedirect(auth, provider);
          return null;
        } else {
          throw popupError;
        }
      }
    } catch (authError) {
      console.error("Erro durante autenticação com Google:", authError);
      throw authError;
    }
  }

  // Função auxiliar para atualizar dados do usuário após login
  async function updateUserDataAfterLogin(user) {
    try {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        console.log("Primeiro login do usuário, criando documento no Firestore...");
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        });
        console.log("Documento do usuário criado com sucesso.");
      } else {
        await setDoc(userRef, {
          lastLogin: serverTimestamp()
        }, { merge: true });
        console.log("Último login atualizado no Firestore.");
      }
    } catch (firestoreError) {
      console.error("Erro ao interagir com o Firestore após login:", firestoreError);
    }
  }

  // Logout
  function logout() {
    localStorage.removeItem('authRedirectInProgress');
    return signOut(auth);
  }

  // Recuperação de senha
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // Atualizar informações do usuário
  async function updateUserData(userData) {
    if (!currentUser) return;
    
    try {
      await setDoc(doc(db, "users", currentUser.uid), {
        ...userData,
        updatedAt: serverTimestamp()
      }, { merge: true });
      
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Verificar resultado do redirecionamento ao carregar
  useEffect(() => {
    async function checkRedirectResult() {
      const redirectInProgress = localStorage.getItem('authRedirectInProgress') === 'true';
      
      if (redirectInProgress) {
        console.log("Verificando resultado do redirecionamento de autenticação...");
        try {
          const result = await getRedirectResult(auth);
          localStorage.removeItem('authRedirectInProgress');
          
          if (result && result.user) {
            console.log("Login com Google por redirecionamento concluído com sucesso");
            await updateUserDataAfterLogin(result.user);
          }
        } catch (error) {
          console.error("Erro ao processar resultado do redirecionamento:", error);
          localStorage.removeItem('authRedirectInProgress');
        } finally {
          setRedirectInProgress(false);
        }
      }
    }
    
    checkRedirectResult();
  }, []);

  // Acompanhar mudanças no estado de autenticação
  useEffect(() => {
    console.log("Configurando listener de autenticação...");
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Estado de autenticação alterado:", user ? `Usuário logado: ${user.email}` : "Usuário deslogado");
      setCurrentUser(user);
      setLoading(false);
      
      if (user) {
        try {
          console.log("Atualizando último login no Firestore...");
          await setDoc(doc(db, "users", user.uid), {
            lastLogin: serverTimestamp()
          }, { merge: true });
          console.log("Último login atualizado com sucesso.");
        } catch (error) {
          console.error("Erro ao atualizar último login:", error);
        }
      }
    });
    
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    updateUserData,
    redirectInProgress
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}