// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYuYPIatOTmGas-qFfX3yH_dGc4_Jlcdw",
  authDomain: "hackathon2-7d7be.firebaseapp.com",
  projectId: "hackathon2-7d7be",
  storageBucket: "hackathon2-7d7be.firebasestorage.app",
  messagingSenderId: "506915528285",
  appId: "1:506915528285:web:df218c5167dd12a06837b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;