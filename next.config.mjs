// @ts-check
import {getSecret} from '@google-cloud/secret-manager';

async function getGoogleSecret(secretName) {
  if (!process.env.GOOGLE_CLOUD_PROJECT) {
    console.error('La variable de entorno GOOGLE_CLOUD_PROJECT no está configurada.');
    return undefined;
  }
  const name = `projects/${process.env.GOOGLE_CLOUD_PROJECT}/secrets/${secretName}/versions/latest`;
  try {
    const [version] = await getSecret({name});
    const payload = version.payload?.data?.toString();
    if (!payload) {
      console.warn(`El secreto '${secretName}' está vacío.`);
    }
    return payload;
  } catch (error) {
    console.error(`Error al obtener el secreto '${secretName}':`, error);
    return undefined;
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración base de Next.js
};

// Esta función se ejecuta al iniciar el servidor de Next.js
async function loadSecretsIntoEnv() {
  // Solo cargamos secretos si estamos en el entorno del estudio
  if (process.argv.includes('--is-studio=true')) {
    console.log('Entorno de estudio detectado, cargando secretos...');
    const secretsToFetch = {
      'GOOGLE_API_KEY': 'GOOGLE_API_KEY',
      'NEXT_PUBLIC_FIREBASE_API_KEY': 'NEXT_PUBLIC_FIREBASE_API_KEY',
      'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN': 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
      'NEXT_PUBLIC_FIREBASE_PROJECT_ID': 'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
      'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
      'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
      'NEXT_PUBLIC_FIREBASE_APP_ID': 'NEXT_PUBLIC_FIREBASE_APP_ID',
      'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID': 'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID',
    };

    const secretPromises = Object.entries(secretsToFetch).map(async ([envVar, secretName]) => {
      const secretValue = await getGoogleSecret(secretName);
      if (secretValue) {
        process.env[envVar] = secretValue;
      }
    });

    await Promise.all(secretPromises);
    console.log('Secretos cargados en process.env.');
  }
}

export default async function() {
  await loadSecretsIntoEnv();
  return nextConfig;
}