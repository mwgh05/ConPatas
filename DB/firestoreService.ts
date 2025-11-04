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

// Obtener perros publicados por un propietario (por correo o por uid)
export async function getDogsByOwner(ownerEmail?: string): Promise<any[]> {
  const collectionRef = collection(db, "Perro");
  const queries = [] as any[];
  if (ownerEmail) queries.push(query(collectionRef, where('ownerEmail', '==', ownerEmail)));

  if (!queries.length) return [];

  const snapshots = await Promise.all(queries.map(q => getDocs(q)));
  // Merge docs and deduplicate by id
  const docMap = new Map<string, any>();
  for (const snap of snapshots) {
    for (const d of snap.docs) {
      const data = d.data() as any;
      // ensure id is present on the object
      data.id = d.id;
      docMap.set(d.id, data);
    }
  }

  // Normalize image fields similarly to getDogsFormatted
  const resolveImage = (entry: any): string | undefined => {
    if (!entry) return undefined;
    if (typeof entry === 'string') return entry;
    if (Array.isArray(entry)) {
      for (const it of entry) {
        const r = resolveImage(it);
        if (r) return r;
      }
      return undefined;
    }
    if (typeof entry === 'object') {
      return entry.url || entry.src || entry.path || entry.fullPath || entry.storagePath;
    }
    return undefined;
  };

  const results: any[] = [];
  for (const [, obj] of docMap) {
    const imageFromImageField = resolveImage(obj.image);
    const imageFromImagesArray = resolveImage(obj.images);
    const primaryImage = imageFromImageField || imageFromImagesArray || '';

    const imagesArray: string[] = [];
    if (Array.isArray(obj.images)) {
      for (const it of obj.images) {
        const r = resolveImage(it);
        if (r) imagesArray.push(r);
      }
    }
    if (!imagesArray.length && imageFromImageField) imagesArray.push(imageFromImageField);

    results.push({
      id: obj.id,
      name: obj.name || '',
      age: obj.age || '',
      breed: obj.breed || '',
      size: obj.size || 'mediano',
      description: obj.description || '',
      image: primaryImage,
      images: imagesArray,
      personality: Array.isArray(obj.personality) ? obj.personality : [],
      ownerEmail: obj.ownerEmail || null
    });
  }

  return results;
}
