
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration is read from environment variables
const firebaseConfig = {
  apiKey: process.env.next_public_firebase_api_key,
  authDomain: process.env.next_public_firebase_auth_domain,
  projectId: process.env.next_public_firebase_project_id,
  storageBucket: process.env.next_public_firebase_storage_bucket,
  messagingSenderId: process.env.next_public_firebase_messaging_sender_id,
  appId: process.env.next_public_firebase_app_id,
};

// Conditionally initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

// Check that all the environment variables are set.
export const firebaseCredentialsExist = !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId
);


if (firebaseCredentialsExist) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
} else {
    // In a real app, you'd want to handle this case gracefully.
    // Maybe show a message to the user or log a serious error.
    console.error("Firebase configuration variables are not set. Please check your .env file.");
}

// Export the initialized services
export { app, auth, db, storage };
