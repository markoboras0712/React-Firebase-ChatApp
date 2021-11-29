import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyCGoE_1drTwr4MwboEwORA2i8rjQ3iqaaU",
  authDomain: "react-chat-7b05a.firebaseapp.com",
  projectId: "react-chat-7b05a",
  storageBucket: "react-chat-7b05a.appspot.com",
  messagingSenderId: "887282888277",
  appId: "1:887282888277:web:dbc8403bc27dd0470e6edc",
  measurementId: "G-98FMKB9G8W",
});

export const db = getFirestore();
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
