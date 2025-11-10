// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEARRDl7FzQnnAqnFxPPtsCs0qGH7GO-4",
  authDomain: "blogtime-2044c.firebaseapp.com",
  projectId: "blogtime-2044c",
  storageBucket: "blogtime-2044c.firebasestorage.app",
  messagingSenderId: "1054684471575",
  appId: "1:1054684471575:web:44f3a96d544d235f421752"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;