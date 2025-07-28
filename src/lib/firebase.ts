
'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// These variables are populated by App Hosting.
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

// This check prevents re-initializing the app on every render in the browser.
// It also ensures that Firebase is only initialized on the client-side.
if (typeof window !== 'undefined') {
    if (!getApps().length) {
        // Only initialize if all the necessary config variables are present
        if (firebaseConfig.apiKey && firebaseConfig.projectId) {
            app = initializeApp(firebaseConfig);
            auth = getAuth(app);
            db = getFirestore(app);
        } else {
            console.error("Firebase configuration variables are missing. Firebase cannot be initialized.");
        }
    } else {
        // If the app is already initialized, just get the existing instances.
        app = getApp();
        auth = getAuth(app);
        db = getFirestore(app);
    }
}


// Export the initialized services.
// The "as Auth" and "as Firestore" are necessary because they could be undefined if initialization fails.
// Components using these should handle the possibility of them being uninitialized.
export { app, auth, db };
