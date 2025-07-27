
'use server';
/**
 * @fileOverview Initializes the Genkit AI instance.
 *
 * This file sets up the Genkit library with the necessary plugins and configuration.
 * It retrieves the Google API key from the environment variables provided by
 * Firebase App Hosting.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Initialize Genkit with the Google AI plugin.
// The API key is provided as an environment variable by App Hosting.
// Note: App Hosting requires environment variable names to be lowercase.
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.google_api_key,
    }),
  ],
  // Disabling telemetry and logging for a cleaner setup.
  enableV1Telemetry: false,
  logLevel: 'silent',
});
