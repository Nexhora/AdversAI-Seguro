/**
 * @fileoverview This file initializes and aiconfigures the Genkit AI library.
 */
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Initialize the Genkit AI platform with the Google AI plugin.
// Genkit will automatically look for the GEMINI_API_KEY in the environment variables.
export const ai = genkit({
  plugins: [googleAI()],
});
