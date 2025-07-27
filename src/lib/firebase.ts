
// src/lib/firebase.ts
// This file initializes Firebase using environment variables.
// It's designed to work seamlessly in both local (studio) and production environments
// by relying on the variables provided by the Next.js runtime.

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// These variables are loaded by Next.js from process.env.
// In the studio, they come from the .env file (prefixed with NEXT_PUBLIC_).
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

// Initialize Firebase only if it hasn't been initialized yet.
// This is the recommended pattern for Next.js to prevent re-initialization on hot reloads.
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);

export { app, auth, db };
