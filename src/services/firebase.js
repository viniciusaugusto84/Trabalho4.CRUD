import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIyElvEgYpU9_fV92RTTr84ZXhM4oLUZg",
  authDomain: "trabalho4-crud.firebaseapp.com",
  projectId: "trabalho4-crud",
  storageBucket: "trabalho4-crud.firebasestorage.app",
  messagingSenderId: "616459405949",
  appId: "1:616459405949:web:188dd27f1acb59b5afff14",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
