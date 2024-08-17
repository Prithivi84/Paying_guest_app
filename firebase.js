// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeJdIoKBqsZeTLZjeEj2URwM13kY9mEPk",
  authDomain: "room-rent-dad49.firebaseapp.com",
  projectId: "room-rent-dad49",
  storageBucket: "room-rent-dad49.appspot.com",
  messagingSenderId: "383929927836",
  appId: "1:383929927836:web:56427d3f14f14f9dc14559",
  measurementId: "G-VXDVFH0B4V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
