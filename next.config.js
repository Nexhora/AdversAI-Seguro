
// @ts-check

// This file is not intended to be executed directly. It's used by the Next.js CLI.
// It's a workaround to load secrets from Google Secret Manager in the studio environment.
// In production, the secrets are loaded by App Hosting.
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

/**
 * @param {string} name
 * @returns {Promise<string | undefined>}
 */
async function getSecret(name) {
  if (!process.env.GCLOUD_PROJECT && !process.env.GOOGLE_CLOUD_PROJECT) {
    console.warn(`GOOGLE_CLOUD_PROJECT not set, cannot fetch secret: ${name}`);
    return;
  }
  const projectId = process.env.GCLOUD_PROJECT ?? process.env.GOOGLE_CLOUD_PROJECT;
  const client = new SecretManagerServiceClient();
  try {
    const [version] = await client.accessSecretVersion({
      name: `projects/${projectId}/secrets/${name}/versions/latest`,
    });

    const payload = version.payload?.data?.toString();
    return payload;
  } catch(err) {
    console.warn(`Could not access secret: ${name}. Make sure it exists and the service account has permissions.`);
    return undefined;
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true, // Recommended for new apps
  async redirects() {
    return [];
  },
  // This is a workaround to load secrets from Google Secret Manager in the studio environment.
  // In production, the secrets are loaded by App Hosting.
  async rewrites() {
    if (process.argv.includes('--is-studio=true')) {
      const secrets = [
        'GOOGLE_API_KEY',
        'NEXT_PUBLIC_FIREBASE_API_KEY',
        'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
        'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
        'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
        'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
        'NEXT_PUBLIC_FIREBASE_APP_ID',
        'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID',
      ];
      for (const secret of secrets) {
        // Do not overwrite existing env vars
        if (!process.env[secret]) {
           process.env[secret] = (await getSecret(secret)) ?? '';
        }
      }
    }
    return [];
  },
};

module.exports = nextConfig;
