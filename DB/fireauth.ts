import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Usuario autenticado:", user.displayName);
    return user;
  } catch (error) {
    console.error("Error en autenticación:", error);
    throw error;
  }
}

export async function logout() {
  await signOut(auth);
  console.log("Sesión cerrada");
}