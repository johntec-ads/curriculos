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
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Criar um documento para o usuário no Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });
      
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  // Login com email e senha
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Login com Google
  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Verificar se é a primeira vez que o usuário faz login
      const userRef = doc(db, "users", result.user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // Criar um documento para o usuário no Firestore
        await setDoc(userRef, {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        });
      } else {
        // Atualizar último login
        await setDoc(userRef, {
          lastLogin: serverTimestamp()
        }, { merge: true });
      }
      
      return result;
    } catch (error) {
      throw error;
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
      
      // Se houver um usuário logado, atualizar último login
      if (user) {
        try {
          await setDoc(doc(db, "users", user.uid), {
            lastLogin: serverTimestamp()
          }, { merge: true });
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