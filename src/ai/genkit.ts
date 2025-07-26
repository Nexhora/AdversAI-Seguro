/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Se centraliza toda la configuración de Genkit en este archivo para asegurar
// la compatibilidad con el entorno de compilación de producción de Next.js.
// El GOOGLE_API_KEY se obtiene automáticamente de las variables de entorno del servidor.
export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  // Directorio donde se guardan los registros de Genkit.
  logSinker: 'json-file',
  // Habilita la UI de desarrollo de Genkit para probar flujos localmente.
  // Ejecuta `genkit start` para lanzarla.
  enableDevUI: true,
  // Ruta donde se encuentran tus flujos para que Genkit pueda descubrirlos.
  flowPath: 'src/ai/flows',
});
