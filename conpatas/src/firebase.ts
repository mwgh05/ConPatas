// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr27A9ZS46DHbgYsgZoUtWgggGjgVePus",
  authDomain: "conpatas-f7d07.firebaseapp.com",
  databaseURL: "https://conpatas-f7d07-default-rtdb.firebaseio.com",
  projectId: "conpatas-f7d07",
  storageBucket: "conpatas-f7d07.firebasestorage.app",
  messagingSenderId: "1073272147619",
  appId: "1:1073272147619:web:5928174603736fa8a6f916",
  measurementId: "G-P9ZB1CQFXV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);