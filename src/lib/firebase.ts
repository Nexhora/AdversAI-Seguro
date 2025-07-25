// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration is read directly from Next.js environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if the essential Firebase config values are present.
// This is a safeguard for developers.
const firebaseCredentialsExist = !!(firebaseConfig.apiKey && firebaseConfig.projectId);

if (!firebaseCredentialsExist) {
    // This will only log an error in the server console or browser console,
    // it will not render a full-page error, preventing build failures.
    console.error("Firebase configuration variables are missing. The app might not work correctly. Please check your environment variables.");
}

// Initialize Firebase
// This pattern prevents re-initializing the app on every hot-reload.
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

// We only initialize if the credentials exist. This prevents errors during build time if variables are not set.
if (firebaseCredentialsExist) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
} else {
    // If credentials don't exist, we provide placeholder objects
    // to prevent the rest of the app from crashing on import.
    // The AuthProvider will handle the UI error state.
    app = {} as FirebaseApp;
    auth = {} as Auth;
    db = {} as Firestore;
    storage = {} as FirebaseStorage;
}

// Export the initialized services and the existence check
export { app, auth, db, storage, firebaseCredentialsExist };
