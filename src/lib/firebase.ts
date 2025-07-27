// src/lib/firebase.ts
// This file initializes Firebase using environment variables.
// It's designed to work seamlessly in both local (studio) and production environments
// by relying on the variables provided by the Next.js runtime.

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// These variables are loaded by Next.js from process.env.
// In the studio, they come from the .env file via next.config.js rewrites.
// In production, they are injected by the apphosting.yaml configuration.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// Robust validation to ensure all necessary keys are present.
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  // We throw an error during development/build time to catch this early.
  if (process.env.NODE_ENV !== 'production') {
      console.error(
        "La configuración de Firebase es inválida. Revisa los secretos de tu proyecto (NEXT_PUBLIC_FIREBASE_...)."
      );
  }
}

// Initialize Firebase only if it hasn't been initialized yet.
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);

export { app, auth, db };
