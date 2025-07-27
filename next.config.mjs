// @ts-check
import sm from '@google-cloud/secret-manager';

/**
 * This file is used to load secrets from Google Secret Manager into the development environment.
 * It's a workaround for the studio environment where .env file editing is restricted.
 * In production, environment variables are set by apphosting.yaml.
 */

/**
 * @param {string} name
 * @returns {Promise<string | undefined>}
 */
async function getSecret(name) {
  if (!process.env.GOOGLE_CLOUD_PROJECT) {
    // This check is important because getSecret will fail without a project ID.
    // In production, this is set by App Hosting. In the studio, it might not be.
    // We can assume if this is not set, we're not in an environment to fetch secrets.
    return undefined;
  }
  const client = new sm.SecretManagerServiceClient();
  try {
    const [version] = await client.accessSecretVersion({
      name: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/secrets/${name}/versions/latest`,
    });
    const payload = version.payload?.data?.toString();
    return payload;
  } catch (error) {
    console.warn(`Could not load secret ${name}:`, error instanceof Error ? error.message : String(error));
    return undefined;
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    // The `serverRuntimeConfig` is accessible on the server-side.
    // We use this to load secrets only when the server starts.
    // This will run in the studio environment because of the --is-studio flag.
    async serverRuntimeConfig() {
        if (process.argv.includes('--is-studio=true')) {
            console.log('Studio environment detected, loading secrets...');
            try {
                const GOOGLE_API_KEY = await getSecret('GOOGLE_API_KEY');
                const NEXT_PUBLIC_FIREBASE_API_KEY = await getSecret('NEXT_PUBLIC_FIREBASE_API_KEY');
                const NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = await getSecret('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
                const NEXT_PUBLIC_FIREBASE_PROJECT_ID = await getSecret('NEXT_PUBLIC_FIREBASE_PROJECT_ID');
                const NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = await getSecret('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET');
                const NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = await getSecret('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID');
                const NEXT_PUBLIC_FIREBASE_APP_ID = await getSecret('NEXT_PUBLIC_FIREBASE_APP_ID');
                const NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = await getSecret('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID');
                
                // Set the secrets as environment variables for the Next.js application
                process.env.GOOGLE_API_KEY = GOOGLE_API_KEY;
                process.env.NEXT_PUBLIC_FIREBASE_API_KEY = NEXT_PUBLIC_FIREBASE_API_KEY;
                process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
                process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = NEXT_PUBLIC_FIREBASE_PROJECT_ID;
                process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
                process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
                process.env.NEXT_PUBLIC_FIREBASE_APP_ID = NEXT_PUBLIC_FIREBASE_APP_ID;
                process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

                console.log('Secrets loaded successfully.');
            } catch (error) {
                console.error("FATAL: Could not load secrets for studio environment.", error);
                // We exit here because the application will not work without these secrets.
                process.exit(1);
            }
        }
        return {};
    },
};

export default nextConfig;
