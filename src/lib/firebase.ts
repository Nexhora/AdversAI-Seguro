import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Define un tipo para la configuración para asegurar que todas las claves están presentes
type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

// Lee la configuración directamente de las variables de entorno del proceso.
// Next.js se encarga de exponer las variables con prefijo NEXT_PUBLIC_ al cliente.
const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ""
};

// Validación: Comprueba si alguna de las claves de Firebase falta en el entorno
// Esto proporciona un mensaje de error claro si las variables de entorno no están configuradas.
if (Object.values(firebaseConfig).some(value => !value)) {
    console.error("Las credenciales de Firebase no están configuradas correctamente en las variables de entorno.");
    
    // En un entorno de cliente (navegador), podrías querer mostrar un mensaje al usuario.
    if (typeof window !== 'undefined') {
        const body = document.querySelector('body');
        if (body) {
            body.innerHTML = `
                <div style="font-family: sans-serif; padding: 2rem; text-align: center; background-color: #fff3f3; color: #b71c1c; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <h1 style="font-size: 1.5rem; margin-bottom: 1rem;">Error Crítico de Configuración</h1>
                    <p>Las credenciales de Firebase no están configuradas correctamente. La aplicación no puede conectarse a los servicios de Firebase.</p>
                    <p style="margin-top: 0.5rem; font-size: 0.9rem;">Esto suele deberse a que las variables de entorno de Firebase no se han configurado en el backend de App Hosting.</p>
                </div>
            `;
        }
    }
    // Detiene la ejecución del script para evitar más errores.
    throw new Error("Configuración de Firebase incompleta. Revisa las variables de entorno en App Hosting.");
}


// Inicializa Firebase de forma segura
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
