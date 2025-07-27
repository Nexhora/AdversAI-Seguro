
// src/lib/firebase.ts
// This file initializes Firebase using environment variables.
// It's designed to work seamlessly in both local (studio) and production environments
// by relying on the variables provided by the Next.js runtime, which are populated
// by App Hosting's secret management.

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// These variables are loaded by Next.js from process.env.
// In production and in the studio, they are injected by the apphosting.yaml configuration.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Robust validation to ensure all necessary keys are present at runtime.
const allKeysPresent = Object.values(firebaseConfig).every(Boolean);

let app: FirebaseApp;
let auth: any;
let db: any;

if (!allKeysPresent) {
  console.error(
    "Error de Configuración de Firebase: Una o más variables de entorno de Firebase no se encontraron. Asegúrate de que los secretos estén configurados correctamente en App Hosting y que el backend se esté ejecutando."
  );
  // This will prevent the app from crashing but functionality will be degraded.
  // Dependent parts of the app should handle the uninitialized services gracefully.
} else {
  // Initialize Firebase only if it hasn't been initialized yet.
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, auth, db };
