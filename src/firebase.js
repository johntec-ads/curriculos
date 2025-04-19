// Configuração do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Substitua estas configurações pelas suas próprias do Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAnnqX-s98jDvwBz2mobBfraDzDTxYmFNY",
  authDomain: "curriculos-a802a.firebaseapp.com",
  projectId: "curriculos-a802a",
  storageBucket: "curriculos-a802a.firebasestorage.app",
  messagingSenderId: "329709244316",
  appId: "1:329709244316:web:f9c25cd73b2de9b8990259",
  measurementId: "G-FT5YJQ2NTL"
};

// Inicializando Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db, analytics };