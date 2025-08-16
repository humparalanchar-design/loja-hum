// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBwrAEGSlJL_y6UgLVUAjseT4Os4fZ1Olc",
  authDomain: "minha-loja-hum.firebaseapp.com",
  projectId: "minha-loja-hum",
  storageBucket: "minha-loja-hum.firebasestorage.app",
  messagingSenderId: "66659292101",
  appId: "1:66659292101:web:e061665eff8b32d3d2f1ac",
  measurementId: "G-JFDK9CVV4E"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
