// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration.
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


// This robust pattern prevents issues in Next.js environments by ensuring the app is only initialized once.
// It's the recommended approach for this kind of setup.
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

export { app, auth, db, storage };
