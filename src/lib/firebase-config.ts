/**
 * @fileoverview Este archivo contiene exclusivamente la configuración de Firebase.
 * Aislar la configuración en su propio archivo mejora la predictibilidad de la carga
 * y evita problemas de "árbol de dependencias" durante la compilación de Next.js.
 */

// Your web app's Firebase configuration.
// IMPORTANT: These keys are public and are secured by Firebase Security Rules.
// It is safe and standard practice to have them in the source code for client-side initialization.
export const firebaseConfig = {
  apiKey: "AIzaSyDI7mUnIQkf2JjvdYA2x9KirLVy0ixvofE",
  authDomain: "adverseai-yw88y.firebaseapp.com",
  projectId: "adverseai-yw88y",
  storageBucket: "adverseai-yw88y.appspot.com",
  messagingSenderId: "291201286336",
  appId: "1:291201286336:web:7388bf9d0963f69e41ad25"
};
