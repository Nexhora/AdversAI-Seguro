
'use server';

/**
 * @fileOverview A flow for analyzing a URL to extract campaign information.
 *
 * - analyzeUrlForCampaign - A function that analyzes a URL to extract campaign information.
 * - AnalyzeUrlInput - The input type for the analyzeUrlForCampaign function.
 * - AnalyzeUrlOutput - The return type for the analyzeUrlForCampaign function.
 */

import {ai} from '@/ai/genkit';
import {httpGet} from '@/ai/tools/http';
import { z } from 'zod';

const AnalyzeUrlInputSchema = z.object({
  url: z.string().url().describe('The URL of the website to analyze.'),
});
export type AnalyzeUrlInput = z.infer<typeof AnalyzeUrlInputSchema>;

const AnalyzeUrlOutputSchema = z.object({
  brandName: z.string().describe('El nombre de la marca o empresa.'),
  productName: z.string().describe('El producto o servicio principal que se ofrece.'),
  productDescription: z
    .string()
    .describe('Un resumen detallado de lo que es el producto/servicio, sus características y beneficios.'),
  targetAudience: z
    .string()
    .describe('Una descripción del público objetivo en términos demográficos o de intereses.'),
  uniqueSellingProposition: z
    .string()
    .describe('La propuesta única de venta (qué hace que el producto sea especial).'),
  painPoints: z.string().optional().describe('Los puntos de dolor que el producto resuelve, inferidos del texto (separados por comas).'),
  features: z.string().optional().describe('Las características clave del producto, inferidas del texto (separadas por comas).'),
  benefits: z.string().optional().describe('Los beneficios clave para el cliente, inferidos de las características (separados por comas).'),
  bonuses: z.string().optional().describe('Cualquier bono o extra ofrecido, inferido del texto (separado por comas).'),
  socialProof: z.string().optional().describe('Descripción de cualquier prueba social encontrada (testimonios, reseñas, logos de clientes).'),
  guarantee: z.string().optional().describe('Descripción de cualquier garantía encontrada (ej. "garantía de devolución de dinero de 7 días").'),
});
export type AnalyzeUrlOutput = z.infer<typeof AnalyzeUrlOutputSchema>;

export async function analyzeUrlForCampaign(
  input: AnalyzeUrlInput
): Promise<AnalyzeUrlOutput> {
  return analyzeUrlFlow(input);
}

const analyzeUrlPrompt = ai.definePrompt({
  name: 'analyzeUrlPrompt',
  tools: [httpGet],
  input: {schema: AnalyzeUrlInputSchema},
  output: {schema: AnalyzeUrlOutputSchema},
  model: 'googleai/gemini-1.5-pro-latest',
  prompt: `Eres un estratega de marketing y copywriter de élite. Tu misión es analizar el CONTENIDO TEXTUAL ESTRUCTURADO de una página web para extraer información estratégica y precisa que se usará para crear una landing page de alta conversión. Se te ha proporcionado una URL. Tu tarea es utilizar la herramienta 'httpGet' para obtener un RESUMEN de la página y luego analizar ese resumen para identificar la siguiente información. La respuesta DEBE ser en español.

Usa la herramienta httpGet con la URL: {{{url}}}

Una vez que tengas el contenido resumido de la página (título, encabezados, párrafos), analízalo con precisión. NO INVENTES información. Si no encuentras algún campo obligatorio, haz tu mejor esfuerzo para inferirlo del contexto. Si no encuentras un campo opcional, déjalo vacío.

1.  **brandName:** Busca el nombre de la empresa o marca. Prioriza el título de la página o el propio dominio de la URL.
2.  **productName:** Identifica el producto o servicio principal. Búscalo en los titulares principales (H1, H2s). Sé conciso y directo.
3.  **productDescription:** Crea un resumen detallado de lo que es el producto. Basa tu resumen en los párrafos proporcionados. Combina la información para dar una visión clara.
4.  **targetAudience:** ¿A quién se dirige esta página? INFIERE el público objetivo a partir del lenguaje, los problemas mencionados y los ejemplos en los textos. Describe el público en términos demográficos, de intereses o de profesión.
5.  **uniqueSellingProposition:** ¿Qué hace a este producto único? Busca frases que lo diferencien de la competencia. A menudo está en un subtítulo cerca del H1 o en un párrafo destacado.
6.  **painPoints:** INFIERE los puntos de dolor del cliente a partir de los párrafos. Busca problemas que el producto dice resolver. Extrae 2-3 y sepáralos por comas.
7.  **features:** Busca listas o frases cortas en los párrafos que describan las características. Extrae 3-5 y sepáralas por comas.
8.  **benefits:** Traduce las 'features' en beneficios. Por cada característica, pregúntate "¿y esto qué le permite al cliente?". INFIERE los resultados finales que el cliente obtiene. Extrae 3-4 y sepáralos por comas.
9.  **bonuses:** Busca activamente palabras como "bono", "regalo", "gratis" o "extras" en los textos. Si los encuentras, descríbelos y sepáralos por comas. Si no, déjalo vacío.
10. **socialProof:** Busca secciones con las palabras "testimonios", "opiniones" o "qué dicen nuestros clientes". Describe lo que encuentres. Si no hay nada, déjalo vacío.
11. **guarantee:** Busca cualquier mención a "garantía", "compra segura", "sin riesgos". Describe la garantía ofrecida. Si no hay, déjalo vacío.

Proporciona la salida estrictamente en el formato JSON requerido. Basa tus respuestas únicamente en el contenido de texto proporcionado por la herramienta.`,
});

const analyzeUrlFlow = ai.defineFlow(
  {
    name: 'analyzeUrlFlow',
    inputSchema: AnalyzeUrlInputSchema,
    outputSchema: AnalyzeUrlOutputSchema,
  },
  async (input) => {
    const {output} = await analyzeUrlPrompt(input);
    if (!output) {
      // This provides a much clearer error message to the user.
      throw new Error(
        'La IA no devolvió una respuesta válida. Esto puede ocurrir si la URL no es accesible, no contiene suficiente información de texto, o está protegida. Por favor, prueba con una URL diferente o rellena los campos del formulario manualmente.'
      );
    }
    return output;
  }
);
