// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB4UN3nst1WLILNcLnjPmrfwAHcgpmo6zM",
  authDomain: "lunaticchatroom.firebaseapp.com",
  projectId: "lunaticchatroom",
  storageBucket: "lunaticchatroom.appspot.com",
  messagingSenderId: "1015861532385",
  appId: "1:1015861532385:web:6622ca215026250972c9a0",
  measurementId: "G-WHGGZNNLMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
