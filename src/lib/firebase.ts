// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { firebaseConfig } from "./firebase-config";

// This file implements a Singleton pattern to ensure Firebase is initialized only once.
// This is a robust way to prevent initialization errors in Next.js, especially in server components
// and environments where code might be re-evaluated.

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

// The `getApps().length === 0` check ensures that we only initialize the app once.
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    // If the app is already initialized, we retrieve it.
    app = getApp();
}

// Initialize other Firebase services using the (potentially existing) app instance.
auth = getAuth(app);
db = getFirestore(app);
storage = getStorage(app);

// Export the initialized services for use throughout the application.
export { app, auth, db, storage };
