
import {genkit, configureGenkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { firebase } from 'genkit/plugins/firebase';

export const ai = genkit({
  plugins: [
    firebase(),
    googleAI({
      apiVersion: ['v1beta']
    }),
  ],
  logSinker: 'json-file',
  enableDevUI: true,
  flowPath: 'src/ai/flows',
});
