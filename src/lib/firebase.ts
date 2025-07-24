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

// This check is now simplified or can be considered implicit.
// If the values aren't set, Firebase initialization will fail with a clear error.
export const firebaseCredentialsExist = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId
);

if (!firebaseCredentialsExist) {
    // This message will be logged on the server or in the browser console
    // if the Firebase environment variables are not set.
    console.error("Firebase basic configuration variables (apiKey, projectId) are not set. Please check your .env file or hosting environment variables.");
}

// Initialize Firebase
// This pattern prevents re-initializing the app on hot-reloads
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

// Export the initialized services
export { app, auth, db, storage };
