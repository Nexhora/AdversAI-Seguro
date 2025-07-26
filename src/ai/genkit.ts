import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// The API key is specified in genkit.config.ts, so we don't need to specify it here.
// The Next.js plugin will automatically pick up the GOOGLE_API_KEY environment variable.
export const ai = genkit({
  plugins: [
    googleAI()
  ],
});
