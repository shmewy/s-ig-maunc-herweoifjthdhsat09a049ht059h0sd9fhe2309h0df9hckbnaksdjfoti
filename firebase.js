// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCjvy5EKuRxrDyAkwDV9m0RToBLv4kwRec",
  authDomain: "lunatechatapp.firebaseapp.com",
  projectId: "lunatechatapp",
  storageBucket: "lunatechatapp.appspot.com",
  messagingSenderId: "272689538726",
  appId: "1:272689538726:web:15f5be1bb794f8f735b667",
  measurementId: "G-Y09M65WGJL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(error);
    });
};

export { signInWithGoogle };
