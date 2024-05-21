import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTvVMKQ3UnoF1sWL0mh-4wmwGIfusbar4",
  authDomain: "lunatelogin.firebaseapp.com",
  projectId: "lunatelogin",
  storageBucket: "lunatelogin.appspot.com",
  messagingSenderId: "456336548589",
  appId: "1:456336548589:web:eb368b3db657a24f18a2e4",
  measurementId: "G-PZPBKP9CVV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
