// Importa las funciones necesarias desde el SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
apiKey: "AIzaSyBr27A9ZS46DHbgYsgZoUtWgggGjgVePus",
authDomain: "conpatas-f7d07.firebaseapp.com",
databaseURL: "[https://conpatas-f7d07-default-rtdb.firebaseio.com](https://conpatas-f7d07-default-rtdb.firebaseio.com)",
projectId: "conpatas-f7d07",
storageBucket: "conpatas-f7d07.appspot.com", // ✅ corregido (antes terminaba en .app)
messagingSenderId: "1073272147619",
appId: "1:1073272147619:web:5928174603736fa8a6f916",
measurementId: "G-P9ZB1CQFXV",
};

// Inicializa la app principal de Firebase
export const app = initializeApp(firebaseConfig);

// Inicializa Firestore
export const db = getFirestore(app);

// Inicializa Firebase Auth
export const auth = getAuth(app);

// Inicializa Analytics solo si está disponible (por ejemplo, en el navegador)
isSupported().then((supported) => {
if (supported) {
getAnalytics(app);
console.log("✅ Firebase Analytics inicializado correctamente");
} else {
console.log("⚠️ Firebase Analytics no disponible en este entorno");
}
});
