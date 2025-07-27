// @ts-check
import sm from '@google-cloud/secret-manager';

/**
 * Retrieves secrets from Google Secret Manager and sets them as environment variables.
 * This function is designed to run only in the Firebase Studio environment.
 * @param {string[]} secretNames
 * @returns {Promise<Record<string, string>>}
 */
async function getSecrets(secretNames) {
  const secrets = {};
  if (process.env.STUDIO_ENVIRONMENT !== 'true') {
    return secrets;
  }

  try {
    const client = new sm.SecretManagerServiceClient();
    const projectId = process.env.PROJECT_ID || process.env.GCLOUD_PROJECT || 'adverseai-yw88y';
    if (!projectId) {
      console.warn('Project ID not found, skipping secret loading.');
      return secrets;
    }

    for (const name of secretNames) {
      const [version] = await client.accessSecretVersion({
        name: `projects/${projectId}/secrets/${name}/versions/latest`,
      });
      const payload = version.payload?.data?.toString();
      if (payload) {
        secrets[name] = payload;
      }
    }
  } catch (error) {
    console.error('Error fetching secrets for studio environment:', error);
  }
  return secrets;
}

const secrets = await getSecrets([
    'GOOGLE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID',
    'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID',
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Inject the secrets into the build process and runtime environment.
  env: {
    ...secrets,
  },
  experimental: {
    // This is required for App Hosting to support server actions.
    serverActions: {
      allowedOrigins: [
        'adverseai-yw88y.web.app',
        'adverseai-yw88y.firebaseapp.com',
      ],
    },
  },
};

export default nextConfig;
