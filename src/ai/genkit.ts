import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {config} from 'dotenv';

config(); // Load environment variables from .env file

export const ai = genkit({
  plugins: [
    googleAI({apiKey: process.env.google_api_key}), // Genkit will use the lowercase key
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
