// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration is now hardcoded here.
// IMPORTANT: These keys are public and are secured by Firebase Security Rules.
// It is safe and standard practice to have them in the source code for client-side initialization.
const firebaseConfig = {
  apiKey: "AIzaSyDI7mUnIQkf2JjvdYA2x9KirLVy0ixvofE",
  authDomain: "adverseai-yw88y.firebaseapp.com",
  projectId: "adverseai-yw88y",
  storageBucket: "adverseai-yw88y.appspot.com",
  messagingSenderId: "291201286336",
  appId: "1:291201286336:web:7388bf9d0963f69e41ad25"
};

// For hard debugging: this should be visible in Cloud Logging in production
console.log("[firebase.ts] firebaseConfig loaded:", {
  hasApiKey: !!firebaseConfig.apiKey,
  hasProjectId: !!firebaseConfig.projectId,
});

// A simple boolean check to see if the essential keys exist in the hardcoded config.
// This helps prevent runtime errors if the object is accidentally left empty.
export const firebaseCredentialsExist = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

// Initialize Firebase services
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

// This pattern prevents re-initializing the app on every hot-reload.
if (getApps().length === 0) {
  if (firebaseCredentialsExist) {
    app = initializeApp(firebaseConfig);
  } else {
    // If the credentials are not there, we log an error but do not throw,
    // to avoid crashing the server during build or render. The AuthProvider will handle the user-facing notice.
    console.error("Firebase configuration is missing or incomplete in src/lib/firebase.ts. The app will not connect to Firebase.");
    app = {} as FirebaseApp;
  }
} else {
    app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);
storage = getStorage(app);


export { app, auth, db, storage };
