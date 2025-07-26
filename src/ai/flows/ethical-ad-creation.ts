'use server';

/**
 * @fileOverview A flow for ethical ad creation, ensuring brand safety and legal compliance.
 *
 * - ethicalAdCreation - A function that handles the ethical ad creation process.
 * - EthicalAdCreationInput - The input type for the ethicalAdCreation function.
 * - EthicalAdCreationOutput - The return type for the ethicalAdCreation function.
 */

import {ai} from '@/ai/genkit';
import { z } from 'zod';

const EthicalAdCreationInputSchema = z.object({
  adText: z.string().describe('El contenido de texto del anuncio.'),
  brandGuidelines: z
    .string()
    .describe('Las directrices de la marca a seguir, incluyendo el tono y las palabras prohibidas.'),
  legalRequirements: z.string().describe('Los requisitos legales para el anuncio.'),
});
export type EthicalAdCreationInput = z.infer<typeof EthicalAdCreationInputSchema>;

const EthicalAdCreationOutputSchema = z.object({
  isEthical: z
    .boolean()
    .describe('Si el contenido del anuncio se adhiere a las directrices éticas y los requisitos legales.'),
  explanation: z
    .string()
    .describe(
      'Una explicación de por qué el contenido del anuncio es ético o no, con sugerencias de mejora si no es ético.'
    ),
  suggestedAlternatives: z
    .array(z.string())
    .describe('Sugerencias de contenido de anuncio alternativo que se adhieren a las directrices éticas y los requisitos legales.'),
});
export type EthicalAdCreationOutput = z.infer<typeof EthicalAdCreationOutputSchema>;

export async function ethicalAdCreation(
  input: EthicalAdCreationInput
): Promise<EthicalAdCreationOutput> {
  return ethicalAdCreationFlow(input);
}

const ethicalAdCreationPrompt = ai.definePrompt({
  name: 'ethicalAdCreationPrompt',
  input: {schema: EthicalAdCreationInputSchema},
  output: {schema: EthicalAdCreationOutputSchema},
  model: 'googleai/gemini-1.5-pro-latest',
  prompt: `Eres un asistente de IA especializado en publicidad ética. Tu función es revisar el contenido de los anuncios y asegurarte de que cumpla con las directrices éticas, los estándares de seguridad de la marca y el cumplimiento legal. La respuesta DEBE ser en español.

  Este es el contenido del anuncio:
  {{adText}}

  Estas son las directrices de la marca a seguir:
  {{brandGuidelines}}

  Estos son los requisitos legales a cumplir:
  {{legalRequirements}}

  Basándote en la información anterior, determina si el contenido del anuncio es ético y cumple con las normativas. Proporciona una explicación detallada de tu determinación. Si el contenido se considera no ético o no cumple con las normativas, sugiere contenido publicitario alternativo que se adhiera a las directrices y requisitos.

  El resultado debe ser estrictamente un objeto JSON con las siguientes claves:
  - "isEthical" (booleano): true si el contenido es ético y cumple, false en caso contrario.
  - "explanation" (cadena): Una explicación detallada de la determinación.
  - "suggestedAlternatives" (array de cadenas): Sugerencias de contenido publicitario alternativo.
  `,
});

const ethicalAdCreationFlow = ai.defineFlow(
  {
    name: 'ethicalAdCreationFlow',
    inputSchema: EthicalAdCreationInputSchema,
    outputSchema: EthicalAdCreationOutputSchema,
  },
  async input => {
    const { output } = await ethicalAdCreationPrompt(input);
    if (!output) {
      throw new Error('The AI returned an empty response for ethical check.');
    }
    return output;
  }
);
