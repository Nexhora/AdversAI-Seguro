'use server';

/**
 * @fileOverview A flow for generating ad creatives, including headlines, text, visuals, and CTAs, and presenting them as coherent ad concepts.
 *
 * - generateAdCreative - A function that generates ad creatives.
 * - GenerateAdCreativeInput - The input type for the generateAdCreative function.
 * - GenerateAdCreativeOutput - The return type for the generateAdCreative function.
 */

import {ai} from '@/ai/genkit';
import { z } from 'zod';

const GenerateAdCreativeInputSchema = z.object({
  brandName: z.string().optional().describe('El nombre de la marca.'),
  industry: z.string().describe('La industria de la marca.'),
  productName: z.string().describe('El nombre del producto o servicio.'),
  toneOfVoice: z.string().describe('El tono de voz para el anuncio.'),
  productDescription: z.string().describe('Una descripción del producto o servicio.'),
  campaignObjective: z.string().describe('El objetivo de la campaña publicitaria.'),
  targetAudience: z.string().describe('Una descripción de la audiencia objetivo.'),
  keywords: z.string().describe('Palabras clave relacionadas con el producto o servicio.'),
  isRemarketing: z.boolean().optional().describe('Indica si la campaña es para remarketing.'),
});
export type GenerateAdCreativeInput = z.infer<typeof GenerateAdCreativeInputSchema>;

const AdCreativeSchema = z.object({
  framework: z.string().describe('El framework de marketing utilizado (AIDA o PAS).'),
  headline: z.string().describe('El titular del anuncio (texto en negrita, debajo del visual).'),
  description: z.string().describe('La descripción que aparece debajo del titular.'),
  primaryText: z.string().describe('El texto principal del anuncio (aparece arriba del visual). El texto debe estar estructurado lógicamente según el framework, con saltos de línea entre cada parte (ej. entre Atención e Interés), pero sin incluir etiquetas como "Atención:".'),
  visualDescription: z.string().describe('Una descripción detallada en español del visual para el anuncio.'),
  visualDescriptionEnglish: z.string().describe('La traducción al inglés de la descripción del visual.'),
  callToAction: z.string().describe('La llamada a la acción para el anuncio.'),
});

const GenerateAdCreativeOutputSchema = z.array(AdCreativeSchema).describe('Un array de conceptos creativos para anuncios.');
export type GenerateAdCreativeOutput = z.infer<typeof GenerateAdCreativeOutputSchema>;

export async function generateAdCreative(input: GenerateAdCreativeInput): Promise<GenerateAdCreativeOutput> {
  return generateAdCreativeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAdCreativePrompt',
  input: {schema: GenerateAdCreativeInputSchema},
  output: {schema: GenerateAdCreativeOutputSchema},
  model: 'googleai/gemini-1.5-pro-latest',
  prompt: `Eres "AdVerse", un copywriter de respuesta directa y estratega de marketing de élite, especializado en crear anuncios de alto impacto que detienen el scroll y generan conversiones masivas. Tu maestría radica en la psicología del consumidor y el uso de frameworks probados para obtener resultados medibles. La respuesta DEBE ser en español e incluir emojis coherentes y estratégicamente colocados.

**Tu Misión:**
Genera exactamente DOS conceptos de anuncio de clase mundial basados en la siguiente información. Cada palabra debe tener un propósito. Cada frase debe guiar al usuario hacia la acción.

**Información de la campaña:**
{{#if brandName}}
- Nombre de la Marca: {{{brandName}}}
{{/if}}
- Industria: {{{industry}}}
- Nombre del Producto: {{{productName}}}
- Descripción del Producto: {{{productDescription}}}
- Tono de Voz: {{{toneOfVoice}}}
- Objetivo de la Campaña: {{{campaignObjective}}}
- Audiencia Objetivo: {{{targetAudience}}}
- Palabras Clave: {{{keywords}}}

{{#if isRemarketing}}
**Directiva de Remarketing (MUY IMPORTANTE):** Esta es una campaña de remarketing. La audiencia YA NOS CONOCE. No pierdas tiempo en presentaciones. Sé directo, asume familiaridad. Utiliza la urgencia ("última oportunidad"), la escasez ("quedan pocas plazas"), rompe objeciones ("¿Todavía lo dudas?"), o refuerza el beneficio clave que les hizo interesarse en primer lugar. Tu objetivo es cerrar la venta o la conversión AHORA.
{{/if}}

**Requisitos Creativos Estrictos:**

1.  **Concepto 1 - Framework AIDA (Atención, Interés, Deseo, Acción):**
    -   **Atención:** Un gancho magnético que detenga el scroll en seco. Usa una pregunta audaz, una estadística impactante o una declaración provocadora.
    -   **Interés:** Transforma las características del producto en beneficios tangibles. ¿Cómo mejora la vida del cliente? Pinta una imagen vívida.
    -   **Deseo:** Intensifica la emoción. Usa pruebas sociales, testimonios (hipotéticos si es necesario) o visualiza el resultado final ideal para el cliente. Haz que lo necesiten.
    -   **Acción:** Una Llamada a la Acción (CTA) clara, directa y con baja fricción.

2.  **Concepto 2 - Framework PAS (Problema, Agitación, Solución):**
    -   **Problema:** Identifica el dolor principal de la audiencia. Habla su idioma. Demuéstrales que entiendes su frustración mejor que nadie.
    -   **Agitación:** No te limites a nombrar el problema, ¡agítalo! Describe las consecuencias negativas de no resolverlo. Usa lenguaje emocional para que sientan la necesidad de un cambio.
    -   **Solución:** Presenta tu producto como el héroe, la solución definitiva a su problema agitado. Explica de forma clara y concisa cómo resuelve su dolor.

**Reglas de Oro para Ambos Conceptos:**
-   **Sin Etiquetas:** El **Texto Principal (primaryText)** debe fluir de manera natural. NO incluyas etiquetas como "Atención:", "Problema:", etc. Usa saltos de línea para estructurar las ideas.
-   **Titular (headline):** Debe ser potente y resumir el mayor beneficio o la solución más grande.
-   **Descripción (description):** Úsala para reforzar el titular o añadir un detalle de urgencia/escasez.
-   **Cumplimiento de Políticas:** Todo el texto debe ser ético y cumplir con las políticas publicitarias estándar (ej. de Meta/Facebook). Evita promesas exageradas, lenguaje discriminatorio o contenido prohibido.
-   **Emojis:** Úsalos con intención, para añadir emoción o dirigir la vista, no para rellenar espacio.
-   **Descripción del Visual (visualDescription):** Debe ser extremadamente detallada, evocadora y estar alineada con la emoción y el mensaje del copy. Describe la escena, la iluminación, los personajes, la acción.
-   **Traducción del Visual (visualDescriptionEnglish):** Traducción precisa al inglés de la descripción anterior.

Genera la salida estrictamente como un array JSON con dos objetos, uno para AIDA y otro para PAS.
`,
});

const generateAdCreativeFlow = ai.defineFlow(
  {
    name: 'generateAdCreativeFlow',
    inputSchema: GenerateAdCreativeInputSchema,
    outputSchema: GenerateAdCreativeOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    if (!output || output.length < 2) {
      throw new Error('La IA no generó los dos conceptos creativos requeridos.');
    }
    return output;
  }
);
