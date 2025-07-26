
'use server';

/**
 * @fileOverview Predicts ad performance metrics.
 */

import {ai} from '@/ai/genkit';
import { z } from 'zod';

const PredictAdPerformanceInputSchema = z.object({
  headline: z.string().describe('El titular del anuncio.'),
  bodyText: z.string().describe('El cuerpo de texto del anuncio (combinación de texto principal y descripción).'),
  targetAudience: z.string().describe('La audiencia objetivo para el anuncio.'),
  campaignGoal: z.string().describe('El objetivo de la campaña publicitaria.'),
  historicalData: z.string().describe('Datos de rendimiento histórico para anuncios similares.'),
});
export type PredictAdPerformanceInput = z.infer<typeof PredictAdPerformanceInputSchema>;

const PredictAdPerformanceOutputSchema = z.object({
  predictedCTR: z.number().describe('La tasa de clics (CTR) predicha del anuncio.'),
  predictedConversionRate: z.number().describe('La tasa de conversión predicha del anuncio.'),
  predictedCPA: z.number().describe('El costo por adquisición (CPA) predicho del anuncio.'),
  aBTestingRecommendation: z.string().describe('Recomendación para configuraciones de pruebas A/B.'),
  explanation: z.string().describe('Explicación de las predicciones y recomendaciones.'),
});
export type PredictAdPerformanceOutput = z.infer<typeof PredictAdPerformanceOutputSchema>;

export async function predictAdPerformance(input: PredictAdPerformanceInput): Promise<PredictAdPerformanceOutput> {
  return predictAdPerformanceFlow(input);
}

const predictAdPerformancePrompt = ai.definePrompt({
  name: 'predictAdPerformancePrompt',
  input: {schema: PredictAdPerformanceInputSchema},
  output: {schema: PredictAdPerformanceOutputSchema},
  model: 'googleai/gemini-1.5-pro-latest',
  prompt: `Eres un experto en la predicción del rendimiento publicitario. La respuesta DEBE ser en español.

  Dados los siguientes detalles del anuncio, predice sus métricas de rendimiento y recomienda configuraciones de pruebas A/B.

  Detalles del Anuncio:
  Titular: {{{headline}}}
  Cuerpo de Texto: {{{bodyText}}}
  Audiencia Objetivo: {{{targetAudience}}}
  Objetivo de la Campaña: {{{campaignGoal}}}
  Datos Históricos: {{{historicalData}}}

  Proporciona la salida estrictamente como un objeto JSON con las claves: "predictedCTR", "predictedConversionRate", "predictedCPA", "aBTestingRecommendation", "explanation".
  `,
});

const predictAdPerformanceFlow = ai.defineFlow(
  {
    name: 'predictAdPerformanceFlow',
    inputSchema: PredictAdPerformanceInputSchema,
    outputSchema: PredictAdPerformanceOutputSchema,
  },
  async input => {
    const { output } = await predictAdPerformancePrompt(input);
    if (!output) {
      throw new Error('The AI returned an empty response for performance prediction.');
    }
    // Ensure numbers are parsed correctly, although `output()` should handle this.
    output.predictedCTR = Number(output.predictedCTR);
    output.predictedConversionRate = Number(output.predictedConversionRate);
    output.predictedCPA = Number(output.predictedCPA);
    return output;
  }
);
