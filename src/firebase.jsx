// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAC3_QCymO3bSL53gSohMWGk3G9mkotOOg",
  authDomain: "fulltime-historico.firebaseapp.com",
  projectId: "fulltime-historico",
  storageBucket: "fulltime-historico.firebasestorage.app",
  messagingSenderId: "888352218511",
  appId: "1:888352218511:web:716be04e4fc99a649bbffa",
  measurementId: "G-VMZEKC1PF8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// get the authentication firebase's functions
const auth = getAuth(app);

export { auth };