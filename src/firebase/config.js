// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6pzetJENpnHpiVlAlNssNdM0wRpyDHMg",
  authDomain: "huldra-test1.firebaseapp.com",
  projectId: "huldra-test1",
  storageBucket: "huldra-test1.appspot.com",
  messagingSenderId: "525546687842",
  appId: "1:525546687842:web:b4d956366f581e0439b03b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;