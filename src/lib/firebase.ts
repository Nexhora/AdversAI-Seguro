
'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Validar que las variables de entorno existan del lado del cliente
if (
  !process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
  !process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
  !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
) {
    // En el lado del cliente, no podemos mostrar un error fatal en el servidor.
    // En su lugar, podemos registrarlo en la consola y la interfaz de usuario mostrará un error.
    console.error("Firebase config environment variables are not set.");
}


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};


let app: FirebaseApp;
let auth: Auth;
let db: Firestore;


if (typeof window !== 'undefined' && !getApps().length) {
    if (firebaseConfig.apiKey && firebaseConfig.projectId) {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
    } else {
        // En el cliente, si la configuración no está, no podemos inicializar.
        // Los componentes que usen `useAuth` o `db` fallarán y mostrarán un estado de error.
        console.error("Cannot initialize Firebase: Missing API Key or Project ID.");
    }
} else if (typeof window !== 'undefined' && getApps().length > 0) {
    app = getApp();
    auth = getAuth(app);
    db = getFirestore(app);
}

// @ts-ignore
export { app, auth, db };
