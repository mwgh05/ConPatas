import { collection, query, where, getDocs, doc, getDoc, addDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

// Obtener todos los documentos de una colección
export async function getCollectionData(collectionName: string): Promise<any[]> {
  const collectionRef = collection(db, collectionName);
  const querySnapshot = await getDocs(collectionRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Obtener un documento específico por ID
export async function getDocumentData(collectionName: string, docId: string): Promise<any | undefined> {
  const docRef = doc(db, `${collectionName}/${docId}`);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : undefined;
}

// Agregar un nuevo documento a una colección
export async function addDocument(collectionName: string, data: any): Promise<string> {
  const collectionRef = collection(db, collectionName);
  const docRef = await addDoc(collectionRef, data);
  return docRef.id;
}

// Actualizar un documento existente
export async function updateDocument(collectionName: string, docId: string, data: any): Promise<void> {
  const docRef = doc(db, `${collectionName}/${docId}`);
  await setDoc(docRef, data, { merge: true });
}

// Obtener usuarios por correo electrónico
export async function getUsuariosByCorreo(correo: string) {
  const collectionRef = collection(db, "Usuario");
  const q = query(collectionRef, where("correo", "==", correo));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Verificar si un usuario con un correo específico existe
export async function userExistsByEmail(correo: string): Promise<boolean> {
  const collectionRef = collection(db, "Usuario"); 
  const q = query(collectionRef, where("correo", "==", correo));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

// Obtener perros
export async function getDogs(): Promise<any[]> {
  const collectionRef = collection(db, "Perro");
  const querySnapshot = await getDocs(collectionRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Obtener mensajes de un chat específico
export async function getChatMessages(chatId: number): Promise<any[]> {
  const collectionRef = collection(db, "Mensaje");
  const q = query(collectionRef, where("chat", "==", chatId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Obtener chats donde el usuario es usuario1 o usuario2
export async function getChatsByEmail(email: string): Promise<any[]> {
  const collectionRef = collection(db, "Chat");
  const q = query(
    collectionRef,
    where("usuario1", "==", email)
  );
  const q2 = query(
    collectionRef,
    where("usuario2", "==", email)
  );

  const [snapshot1, snapshot2] = await Promise.all([getDocs(q), getDocs(q2)]);
  const chats1 = snapshot1.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const chats2 = snapshot2.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Combine and remove duplicates if needed
  const allChats = [...chats1, ...chats2];
  const uniqueChats = Array.from(new Map(allChats.map(chat => [chat.id, chat])).values());

  return uniqueChats;
}