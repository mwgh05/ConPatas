// Importa las funciones necesarias desde el SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBr27A9ZS46DHbgYsgZoUtWgggGjgVePus",
  authDomain: "conpatas-f7d07.firebaseapp.com",
  databaseURL: "https://conpatas-f7d07-default-rtdb.firebaseio.com",
  projectId: "conpatas-f7d07",
  storageBucket: "conpatas-f7d07.appspot.com", // 🔧 corregido (".app" → ".appspot.com")
  messagingSenderId: "1073272147619",
  appId: "1:1073272147619:web:5928174603736fa8a6f916",
  measurementId: "G-P9ZB1CQFXV",
};

// Inicializa Firebase
export const app = initializeApp(firebaseConfig);

// Inicializa Firestore
export const db = getFirestore(app);

// Inicializa Analytics (solo si el entorno lo soporta, ej. navegador)
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
    console.log("📊 Firebase Analytics inicializado");
  } else {
    console.log("⚠️ Firebase Analytics no disponible en este entorno");
  }
});
