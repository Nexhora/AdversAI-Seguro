
'use server';
/**
 * @fileOverview Initializes the Genkit AI instance.
 *
 * This file sets up the Genkit library with the necessary plugins and configuration.
 * It retrieves the Google API key from the environment variables. In the studio,
 * this comes from the .env file. In production, it's provided by
 * Firebase App Hosting's secret management.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Initialize Genkit with the Google AI plugin.
// The API key is provided as an environment variable by App Hosting.
// We only initialize the plugin if the key is actually present.
const plugins = [];
if (process.env.GOOGLE_API_KEY) {
  plugins.push(googleAI({
    apiKey: process.env.GOOGLE_API_KEY,
  }));
}

export const ai = genkit({
  plugins,
  // Disabling telemetry and logging for a cleaner setup.
  enableV1Telemetry: false,
  logLevel: 'silent',
});
