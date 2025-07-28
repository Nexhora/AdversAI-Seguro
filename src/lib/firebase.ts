
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

// Helper function to initialize Firebase and return app, auth, and db
function initializeFirebase() {
    if (firebaseConfig.apiKey && firebaseConfig.projectId) {
        const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
        const auth = getAuth(app);
        const db = getFirestore(app);
        return { app, auth, db };
    }
    // This should not happen in a correctly configured environment
    console.error("Firebase configuration variables are missing.");
    // Return nulls or throw an error if configuration is missing
    return { app: null, auth: null, db: null };
}

const { app, auth, db } = initializeFirebase();

// Export the initialized services.
// The "as Auth" and "as Firestore" are necessary because they could be undefined if initialization fails.
// Components using these should handle the possibility of them being uninitialized.
export { app, auth, db };
