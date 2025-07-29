// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "adverseai-yw88y",
  "appId": "1:291201286336:web:95509066774d573941ad25",
  "storageBucket": "adverseai-yw88y.firebasestorage.app",
  "apiKey": "AIzaSyDI7mUnIQkf2JjvdYA2x9KirLVy0ixvofE",
  "authDomain": "adverseai-yw88y.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "291201286336"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
