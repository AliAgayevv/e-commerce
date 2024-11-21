import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC7SUsS3lJDX1TA_5ogWa7PrgDZxE_5J7k",
  authDomain: "e-commerce-77767.firebaseapp.com",
  projectId: "e-commerce-77767",
  storageBucket: "e-commerce-77767.firebasestorage.app",
  messagingSenderId: "970479329902",
  appId: "1:970479329902:web:e5400aac71a3fd836c7c7f",
  measurementId: "G-KP4VZ609L9",
};

// Firebase App Initialization
const app = initializeApp(firebaseConfig);

// Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);