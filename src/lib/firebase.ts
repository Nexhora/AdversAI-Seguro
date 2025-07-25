
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

// This check is now more robust. It warns in the console if vars are missing
// but doesn't block the app from trying to initialize, which is better for production.
export const firebaseCredentialsExist = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId
);

if (!firebaseCredentialsExist) {
    console.error("Firebase configuration variables are missing. The app might not work correctly. Please check your environment variables.");
    // Detailed log for easier debugging
    console.log("Loaded Firebase Config:", {
        apiKey: firebaseConfig.apiKey ? 'loaded' : 'MISSING',
        authDomain: firebaseConfig.authDomain ? 'loaded' : 'MISSING',
        projectId: firebaseConfig.projectId ? 'loaded' : 'MISSING',
        storageBucket: firebaseConfig.storageBucket ? 'loaded' : 'MISSING',
        messagingSenderId: firebaseConfig.messagingSenderId ? 'loaded' : 'MISSING',
        appId: firebaseConfig.appId ? 'loaded' : 'MISSING',
    });
}

// Initialize Firebase
// This pattern prevents re-initializing the app on every hot-reload.
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (firebaseCredentialsExist) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
} else {
    // Provide dummy objects if not configured, to avoid fatal errors on import
    app = {} as FirebaseApp;
    auth = {} as Auth;
    db = {} as Firestore;
    storage = {} as FirebaseStorage;
}


// Export the initialized services
export { app, auth, db, storage };
