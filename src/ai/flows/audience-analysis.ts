'use server';
/**
 * @fileOverview AI-powered audience analysis flow to refine ad campaigns.
 *
 * - analyzeAudience - Analyzes and segments target audiences based on criteria and real-time trends.
 * - AnalyzeAudienceInput - Input type for the analyzeAudience function.
 * - AnalyzeAudienceOutput - Return type for the analyzeAudience function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeAudienceInputSchema = z.object({
  demographics: z
    .string()
    .describe('Información demográfica inicial sobre la audiencia objetivo.'),
  psychographics: z
    .string()
    .describe('Información psicográfica inicial sobre la audiencia objetivo (intereses, valores, estilo de vida).'),
  behavior: z
    .string()
    .describe('Información conductual inicial sobre la audiencia objetivo (compras pasadas, actividad en línea).'),
  realTimeTrends: z
    .string()
    .optional()
    .describe('Cualquier tendencia en tiempo real que pueda afectar a la audiencia.'),
  brandName: z.string().optional().describe('El nombre de la marca.'),
  industry: z.string().describe('La industria de la marca.'),
});
export type AnalyzeAudienceInput = z.infer<typeof AnalyzeAudienceInputSchema>;

const AnalyzeAudienceOutputSchema = z.object({
  refinedSegments: z
    .string()
    .describe('Una descripción en 2 o 3 frases de los segmentos de audiencia clave.'),
  emergingTrends: z
    .string()
    .describe('Una descripción en 2 o 3 frases de las tendencias más importantes que afectan a esta audiencia.'),
  competitiveAnalysis: z
    .string()
    .optional()
    .describe('Un breve análisis de 1 o 2 frases sobre cómo la competencia podría dirigirse a esta audiencia.'),
});
export type AnalyzeAudienceOutput = z.infer<typeof AnalyzeAudienceOutputSchema>;

export async function analyzeAudience(input: AnalyzeAudienceInput): Promise<AnalyzeAudienceOutput> {
  return analyzeAudienceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeAudiencePrompt',
  input: {schema: AnalyzeAudienceInputSchema},
  output: {schema: AnalyzeAudienceOutputSchema},
  model: 'googleai/gemini-1.5-pro-latest',
  prompt: `Eres un analista de marketing experto. Analiza la siguiente información de la audiencia y proporciona un resumen conciso en español.

Industria: {{{industry}}}
Datos Demográficos: {{{demographics}}}
Psicografía: {{{psychographics}}}
Comportamiento: {{{behavior}}}
{{#if realTimeTrends}}Tendencias: {{{realTimeTrends}}}{{/if}}

Basado en esto, genera un objeto JSON con tres claves:
1.  "refinedSegments": Describe los segmentos de audiencia clave.
2.  "emergingTrends": Describe las tendencias emergentes que les afectan.
3.  "competitiveAnalysis": Describe brevemente el panorama competitivo.

La respuesta debe ser solo el objeto JSON, nada más.`,
});

const analyzeAudienceFlow = ai.defineFlow(
  {
    name: 'analyzeAudienceFlow',
    inputSchema: AnalyzeAudienceInputSchema,
    outputSchema: AnalyzeAudienceOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI returned an empty response for audience analysis.');
    }
    return output;
  }
);
