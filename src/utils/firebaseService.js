import { auth, db } from '../firebase';
import { signInAnonymously as fbSignInAnonymously } from 'firebase/auth';
import { collection, doc, setDoc, getDocs, serverTimestamp } from 'firebase/firestore';

/**
 * Serviço simples para salvar/recuperar currículos no Firestore
 * Estrutura recomendada: users/{uid}/curriculums/{curriculumId}
 */

export async function signInAnonymously() {
  try {
    const result = await fbSignInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.error('Erro ao autenticar anonimamente:', error);
    throw error;
  }
}

export async function saveCurriculumForUser(uid, curriculumId, data) {
  try {
    const ref = doc(db, 'users', uid, 'curriculums', curriculumId);
    await setDoc(ref, {
      owner: uid,
      payload: data,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Erro ao salvar currículo no Firestore:', error);
    throw error;
  }
}

export async function createOrUpdateCurriculumForUser(uid, data) {
  // criar id simples baseado em timestamp
  const id = `curr_${Date.now()}`;
  return saveCurriculumForUser(uid, id, data);
}

export async function loadCurriculumsForUser(uid) {
  try {
    const colRef = collection(db, 'users', uid, 'curriculums');
    const snap = await getDocs(colRef);
    const list = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
    return list;
  } catch (error) {
    console.error('Erro ao carregar currículos do Firestore:', error);
    throw error;
  }
}

export async function migrateLocalToCloud(uid, localData) {
  // cria novo documento com payload
  try {
    const res = await createOrUpdateCurriculumForUser(uid, localData);
    return res;
  } catch (error) {
    throw error;
  }
}
