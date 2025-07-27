
'use server';
/**
 * @fileOverview Initializes the Genkit AI instance.
 *
 * This file sets up the Genkit library with the necessary plugins and configuration.
 * It uses a hardcoded API key as a last resort to bypass environment configuration
 * issues in production.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Initialize Genkit with the Google AI plugin and the hardcoded API key.
// This is a workaround for environment variable issues in Firebase App Hosting.
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: 'AIzaSyBamwBBtLl6ec9WkycSJpX5GBdRrYoBI40',
    }),
  ],
  // Disabling telemetry and logging for a cleaner setup.
  enableV1Telemetry: false,
  logLevel: 'silent',
});
