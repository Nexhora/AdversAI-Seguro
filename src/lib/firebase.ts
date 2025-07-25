
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

// --- Configuración para el Lado del Cliente (Build-Time) ---
// Leídas durante 'next build' y empaquetadas en el JS del cliente.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// --- Configuración para el Lado del Servidor (Run-Time) ---
// Leídas en el servidor en tiempo de ejecución, donde los secretos de App Hosting están disponibles.
const getServerFirebaseConfig = () => ({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
});

// Decidimos qué configuración usar. Si estamos en el servidor, usamos la de run-time,
// si no, la de build-time (cliente).
const finalConfig = typeof window === 'undefined' ? getServerFirebaseConfig() : firebaseConfig;

// Esta comprobación es ahora más robusta y verifica la configuración final.
export const firebaseCredentialsExist = !!(
  finalConfig.apiKey &&
  finalConfig.projectId
);

if (!firebaseCredentialsExist) {
    console.error("Firebase configuration variables are missing. The app might not work correctly. Please check your environment variables.");
    // Detailed log for easier debugging
    console.log("Loaded Firebase Client Config:", {
        apiKey: firebaseConfig.apiKey ? 'loaded' : 'MISSING',
        projectId: firebaseConfig.projectId ? 'loaded' : 'MISSING',
    });
     if (typeof window === 'undefined') {
        const serverConfig = getServerFirebaseConfig();
        console.log("Loaded Firebase Server Config:", {
            apiKey: serverConfig.apiKey ? 'loaded' : 'MISSING',
            projectId: serverConfig.projectId ? 'loaded' : 'MISSING',
        });
    }
}


// Initialize Firebase
// This pattern prevents re-initializing the app on every hot-reload.
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (firebaseCredentialsExist) {
    app = getApps().length ? getApp() : initializeApp(finalConfig);
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
