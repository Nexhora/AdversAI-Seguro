// src/lib/firebase.ts
// This file initializes Firebase using environment variables.
// It's designed to work seamlessly in both local (studio) and production environments
// by relying on the variables provided by the Next.js runtime, which are populated
// by App Hosting's secret management.

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// These variables are loaded by Next.js from process.env.
// In the studio, they come from the .env file.
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

// Robust validation to ensure all necessary keys are present at runtime.
const allKeysPresent = Object.values(firebaseConfig).every(Boolean);

if (allKeysPresent) {
  // Initialize Firebase only if it hasn't been initialized yet.
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  // If keys are missing, we log an error and do not initialize Firebase.
  // This helps identify the configuration problem immediately.
  console.error(
    "Error de Configuración de Firebase: Una o más variables de entorno de Firebase no se encontraron. Revisa tu archivo .env (para el estudio) o la configuración de secretos en App Hosting (para producción)."
  );
  // We throw an error during development/build time to catch this early.
  if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        "La configuración de Firebase es inválida. Faltan variables de entorno. Revisa tu archivo .env."
      );
  }
}

export { app, auth, db };
