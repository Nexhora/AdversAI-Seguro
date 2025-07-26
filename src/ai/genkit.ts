/**
 * @fileoverview This file is temporarily deactivated to isolate a production build issue.
 * The AI functionality will be restored once the application's core is stable.
 */

// All AI-related initializations are commented out.
/*
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
*/

// A placeholder export to prevent import errors in other files.
export const ai = {};
