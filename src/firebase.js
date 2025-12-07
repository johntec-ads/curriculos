// Configuração do Firebase
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  browserSessionPersistence,
  setPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Usando variáveis de ambiente para as configurações do Firebase
// Com fallbacks explícitos para desenvolvimento local
const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_FIREBASE_API_KEY ||
    'AIzaSyAnnqX-s98jDvwBz2mobBfraDzDTxYmFNY',
  authDomain:
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
    'curriculos-a802a.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'curriculos-a802a',
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
    'curriculos-a802a.appspot.com',
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '1028133304258',
  appId:
    process.env.REACT_APP_FIREBASE_APP_ID ||
    '1:1028133304258:web:5b9b9b9b9b9b9b9b9b9b9b',
  measurementId:
    process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || 'G-JKEMXFD5LM',
};

// Inicializando Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configurando persistência de autenticação para sessão de navegador
// Isso resolve problemas com cookies de terceiros em desenvolvimento local
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log(
      'Persistência de autenticação configurada para sessão do navegador'
    );
  })
  .catch((error) => {
    console.error('Erro ao configurar persistência:', error);
  });

const db = getFirestore(app);

// Inicializar analytics apenas em produção para evitar erros em desenvolvimento
let analytics = null;
if (process.env.NODE_ENV === 'production') {
  analytics = getAnalytics(app);
}

export { app, auth, db, analytics };
