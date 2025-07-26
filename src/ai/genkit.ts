
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  logSinker: 'json-file',
  enableDevUI: true,
  flowPath: 'src/ai/flows',
});
