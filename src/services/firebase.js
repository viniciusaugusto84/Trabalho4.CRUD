import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIyElvEgYpU9_fV92RTTr84ZXhM4oLUZg",
  authDomain: "trabalho4-crud.firebaseapp.com",
  projectId: "trabalho4-crud",
  storageBucket: "trabalho4-crud.firebasestorage.app",
  messagingSenderId: "616459405949",
  appId: "1:616459405949:web:188dd27f1acb59b5afff14"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
