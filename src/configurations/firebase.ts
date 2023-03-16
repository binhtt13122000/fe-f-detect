// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJa0WpsqD5rXzuIt1eVATEfTYU7MZCUp8",
  authDomain: "fu-pet-ai.firebaseapp.com",
  projectId: "fu-pet-ai",
  storageBucket: "fu-pet-ai.appspot.com",
  messagingSenderId: "649749258083",
  appId: "1:649749258083:web:71605d9bdaff4ddeee7d56",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app);

export default app;
