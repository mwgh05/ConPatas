import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { app } from "./firebase";
import { createUserIfNotExists } from "./firestoreService";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/**
 * Inicia sesión con Google.
 * Si el usuario no existe en Firestore, lo crea.
 */
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Crear el usuario en Firestore si no existe
    await createUserIfNotExists({
      uid: user.uid,
      nickname: user.displayName || "Sin nombre",
      direccion: "",
      telefono: "",
      correo: user.email || "",
    });

    console.log("✅ Usuario autenticado:", user.displayName);
    return user;
  } catch (error) {
    console.error(" Error en autenticación:", error);
    throw error;
  }
}

/**
 * Cierra la sesión del usuario autenticado.
 */
export async function logout() {
  try {
    await signOut(auth);
    console.log("👋 Sesión cerrada correctamente");
  } catch (error) {
    console.error(" Error al cerrar sesión:", error);
  }
}
