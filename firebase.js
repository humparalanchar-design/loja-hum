import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
export const firebaseConfig = {
  apiKey: "AIzaSyBwrAEGSlJL_y6UgLVUAjseT4Os4fZ1Olc",
  authDomain: "minha-loja-hum.firebaseapp.com",
  projectId: "minha-loja-hum",
  storageBucket: "minha-loja-hum.firebasestorage.app",
  messagingSenderId: "66659292101",
  appId: "1:66659292101:web:e061665eff8b32d3d2f1ac",
  measurementId: "G-JFDK9CVV4E"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
