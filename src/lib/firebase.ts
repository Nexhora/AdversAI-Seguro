
// src/lib/firebase.ts
// Este archivo se encarga de inicializar Firebase, usando el mecanismo
// nativo de Next.js para cargar las variables de entorno.

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Next.js carga automáticamente las variables de entorno que comienzan con NEXT_PUBLIC_
// en el objeto process.env, tanto en el servidor como en el cliente.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Validación robusta para asegurar que todas las claves necesarias están presentes.
const allKeysPresent =
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.storageBucket &&
  firebaseConfig.messagingSenderId &&
  firebaseConfig.appId;

let app: FirebaseApp;
let auth;
let db;

if (!allKeysPresent) {
  console.error(
    "Error de Configuración de Firebase: Faltan una o más claves en tu archivo .env. Por favor, revisa que todas las variables de entorno NEXT_PUBLIC_FIREBASE_* estén definidas."
  );

  // Mostramos un error visual si estamos en el navegador
  if (typeof window !== "undefined") {
    const body = document.querySelector("body");
    if (body) {
      body.innerHTML = `
        <div style="font-family: sans-serif; padding: 2rem; text-align: center; background-color: #fff3f3; color: #b71c1c; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <h1 style="font-size: 1.5rem; margin-bottom: 1rem;">Error de Configuración de Firebase</h1>
            <p>Las credenciales de Firebase no están configuradas correctamente en el archivo <strong>.env</strong>.</p>
            <p style="margin-top: 0.5rem; font-size: 0.9rem;">Por favor, contacta al soporte o revisa la configuración de tu proyecto.</p>
            <p style="margin-top: 1rem; font-size: 0.8rem; color: #666;">La aplicación no puede continuar sin una conexión válida a Firebase.</p>
        </div>
      `;
    }
  }
} else {
  // Inicializa Firebase solo si todas las claves están presentes.
  // Esto previene errores si la app ya está inicializada (HMR).
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, auth, db };
