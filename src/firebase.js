import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBF0Gc8UyUgWWJFOjWkf-8pUmVpMD0rhxM",
  authDomain: "where-is-my-money-7ad0e.firebaseapp.com",
  projectId: "where-is-my-money-7ad0e",
  storageBucket: "where-is-my-money-7ad0e.appspot.com",
  messagingSenderId: "372285405481",
  appId: "1:372285405481:web:5eb6e3c7f27c0f7e45df38",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
