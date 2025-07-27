// src/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDI7mUnIQkf2JjvdYA2x9KirLVy0ixvofE",
  authDomain: "adverseai-yw88y.firebaseapp.com",
  projectId: "adverseai-yw88y",
  storageBucket: "adverseai-yw88y.firebasestorage.app",
  messagingSenderId: "291201286336",
  appId: "1:291201286336:web:7388bf9d0963f69e41ad25",
  measurementId: "",
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);

export { app, auth, db };
