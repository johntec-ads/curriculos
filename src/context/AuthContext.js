import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
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

  // Registrar novo usuário com email e senha
  async function signup(email, password) {
    let userCredential = null;
    console.log("Iniciando processo de registro...");
    
    try {
      // Primeiro, criar a conta de autenticação
      console.log("Criando conta de autenticação...");
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Conta de autenticação criada com sucesso.");
      
      try {
        // Depois, tentar criar o documento no Firestore
        console.log("Criando documento de usuário no Firestore...");
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: email,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        });
        console.log("Documento de usuário criado com sucesso.");
      } catch (firestoreError) {
        // Se falhar ao criar documento no Firestore, registrar o erro mas não falhar o signup
        console.error("Erro ao criar documento de usuário:", firestoreError);
        // Podemos tentar novamente mais tarde quando o usuário fizer login
      }
      
      console.log("Processo de registro concluído com sucesso.");
      return userCredential;
    } catch (authError) {
      // Erros na criação da conta de autenticação são propagados
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
      const result = await signInWithPopup(auth, provider);
      console.log("Login com Google realizado com sucesso para:", result.user.email);
      
      // Verificar se é a primeira vez que o usuário faz login
      try {
        const userRef = doc(db, "users", result.user.uid);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
          console.log("Primeiro login do usuário, criando documento no Firestore...");
          // Criar um documento para o usuário no Firestore
          await setDoc(userRef, {
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
          });
          console.log("Documento do usuário criado com sucesso.");
        } else {
          // Atualizar último login
          await setDoc(userRef, {
            lastLogin: serverTimestamp()
          }, { merge: true });
          console.log("Último login atualizado no Firestore.");
        }
      } catch (firestoreError) {
        // Se falhar ao interagir com Firestore, registrar o erro mas não falhar o login
        console.error("Erro ao interagir com o Firestore durante login com Google:", firestoreError);
      }
      
      return result;
    } catch (authError) {
      // Erros na autenticação com o Google são propagados
      console.error("Erro durante autenticação com Google:", authError);
      throw authError;
    }
  }

  // Logout
  function logout() {
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

  // Acompanhar mudanças no estado de autenticação
  useEffect(() => {
    console.log("Configurando listener de autenticação...");
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Estado de autenticação alterado:", user ? `Usuário logado: ${user.email}` : "Usuário deslogado");
      setCurrentUser(user);
      setLoading(false);
      
      // Se houver um usuário logado, atualizar último login
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
    updateUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}