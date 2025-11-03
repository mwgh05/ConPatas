import { collection, query, where, getDocs, doc, getDoc, addDoc, setDoc } from "firebase/firestore";
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
  const docRef = doc(db, `${collectionName}/${docId}`);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : undefined;
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
 * Crea un nuevo usuario en la colección "Usuario" si no existe.
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
    console.log(`✅ Usuario agregado a Firestore: ${userData.nickname}`);
  } else {
    console.log(`ℹ️ Usuario ${userData.correo} ya existe en Firestore`);
  }
}

/**
 * Obtiene los perros (colección "Perro").
 */
export async function getDogs(): Promise<any[]> {
  const collectionRef = collection(db, "Perro");
  const querySnapshot = await getDocs(collectionRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Obtiene mensajes de un chat específico.
 */
export async function getChatMessages(chatId: number): Promise<any[]> {
  const collectionRef = collection(db, "Mensaje");
  const q = query(collectionRef, where("chat", "==", chatId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Obtiene todos los chats en los que participa el usuario.
 */
export async function getChatsByEmail(email: string): Promise<any[]> {
  const collectionRef = collection(db, "Chat");
  const q1 = query(collectionRef, where("usuario1", "==", email));
  const q2 = query(collectionRef, where("usuario2", "==", email));

  const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);
  const chats = [...snap1.docs, ...snap2.docs].map(doc => ({ id: doc.id, ...doc.data() }));

  // Eliminar duplicados por ID
  const unique = Array.from(new Map(chats.map(c => [c.id, c])).values());
  return unique;
}
