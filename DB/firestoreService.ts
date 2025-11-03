import {
collection, query, where, getDocs, doc, getDoc, addDoc, setDoc
} from "firebase/firestore";
import { db } from "./firebase";

/**

* Obtiene todos los documentos de una colección.
  */
  export async function getCollectionData(collectionName: string): Promise<any[]> {
  const collectionRef = collection(db, collectionName);
  const querySnapshot = await getDocs(collectionRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

/**

* Obtiene un documento específico por ID.
  */
  export async function getDocumentData(collectionName: string, docId: string): Promise<any | undefined> {
  try {
  const docRef = doc(db, `${collectionName}/${docId}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
  } catch (err) {
  console.warn('getDocumentData: fetch by doc id failed, trying field query', err);
  }

try {
const collectionRef = collection(db, collectionName);
const q = query(collectionRef, where('id', '==', docId));
const snapshot = await getDocs(q);
if (!snapshot.empty) {
const d = snapshot.docs[0];
return { id: d.id, ...d.data() };
}
} catch (err) {
console.warn('getDocumentData fallback query failed', err);
}

return undefined;
}

/**

* Agrega un nuevo documento a una colección.
  */
  export async function addDocument(collectionName: string, data: any): Promise<string> {
  const collectionRef = collection(db, collectionName);
  const docRef = await addDoc(collectionRef, data);
  return docRef.id;
  }

/**

* Actualiza un documento existente (merge = true para no sobreescribir).
  */
  export async function updateDocument(collectionName: string, docId: string, data: any): Promise<void> {
  const docRef = doc(db, `${collectionName}/${docId}`);
  await setDoc(docRef, data, { merge: true });
  }

/**

* Obtiene usuarios por correo electrónico.
  */
  export async function getUsuariosByCorreo(correo: string) {
  const collectionRef = collection(db, "Usuario");
  const q = query(collectionRef, where("correo", "==", correo));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

/**

* Verifica si un usuario con un correo específico ya existe.
  */
  export async function userExistsByEmail(correo: string): Promise<boolean> {
  const collectionRef = collection(db, "Usuario");
  const q = query(collectionRef, where("correo", "==", correo));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
  }

/**

* Crea un nuevo usuario si no existe ya en Firestore.
  */
  export async function createUserIfNotExists(userData: {
  uid: string;
  nickname: string;
  direccion: string;
  telefono: string;
  correo: string;
  }): Promise<void> {
  const exists = await userExistsByEmail(userData.correo);
  if (!exists) {
  const collectionRef = collection(db, "Usuario");
  await addDoc(collectionRef, userData);
  console.l
