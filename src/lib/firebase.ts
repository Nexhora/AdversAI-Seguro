// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration is read directly from Next.js environment variables
// Next.js automatically handles the loading of these variables from .env.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// A simple check to see if the essential variables are there.
// This is primarily for debugging and server-side logging.
export const firebaseCredentialsExist = !!firebaseConfig.projectId && !!firebaseConfig.apiKey;

if (!firebaseCredentialsExist) {
    // This message will be logged on the server or in the browser console
    // if the Firebase environment variables are not set.
    console.error("Firebase configuration variables are not set. Please check your .env file or hosting environment variables.");
}

// Initialize Firebase
// This pattern prevents re-initializing the app on hot-reloads
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (firebaseCredentialsExist) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
} else {
    // In case of missing credentials, we provide mock/dummy objects
    // to prevent the application from crashing immediately.
    // The UI will show a warning instead.
    app = {} as FirebaseApp;
    auth = {} as Auth;
    db = {} as Firestore;
    storage = {} as FirebaseStorage;
}


// Export the initialized services
export { app, auth, db, storage };