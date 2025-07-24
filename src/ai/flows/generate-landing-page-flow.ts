
'use server';
/**
 * @fileOverview A flow for generating a landing page structure based on a unified component architecture.
 * The AI's role is to generate a JSON object with a 'page' key containing an array of sections.
 */
import {ai} from '@/ai/genkit';
import { nanoid } from 'nanoid';
import { GenerateLandingPageInput, GenerateLandingPageInputSchema, GenerateLandingPageOutput, GenerateLandingPageOutputFlowSchema } from '@/ai/schemas/landing-page-generation';
import { analyzeUrlForCampaign } from './analyze-url-flow';


// Wrapper function that is called by the frontend.
export async function generateLandingPage(
  input: GenerateLandingPageInput
): Promise<GenerateLandingPageOutput> {
  // This flow now returns the object { page: [...] } directly.
  const pageData = await generateLandingPageFlow(input);
  
  // Add unique IDs to each section in the array.
  const sectionsWithIds = pageData.page.map(section => ({
      ...section,
      id: nanoid(),
  }));

  // Map AI output to the strict component props.
  const validatedSections = sectionsWithIds.map(section => {
    // This mapping ensures that each component receives only the props it expects.
    // For example, a "Hero" section will not receive a "features" array.
    switch (section.type) {
        case 'Hero':
            return {
                id: section.id,
                type: 'Hero',
                props: {
                    title: section.props.title || '',
                    subtitle: section.props.subtitle || '',
                    buttonText: section.props.buttonText || '',
                    bgColor: section.props.bgColor || 'bg-gray-900',
                    textColor: section.props.textColor || 'text-white',
                    textAlign: section.props.textAlign || 'center',
                }
            };
        case 'Features':
             return {
                id: section.id,
                type: 'Features',
                props: {
                    title: section.props.title || '',
                    subtitle: section.props.subtitle || '',
                    features: section.props.features || [],
                    bgColor: section.props.bgColor || 'bg-background',
                    textColor: section.props.textColor || 'text-foreground',
                }
            };
        case 'Text':
            return {
                id: section.id,
                type: 'Text',
                props: {
                    text: section.props.text || '',
                    as: section.props.as || 'p',
                    textAlign: section.props.textAlign || 'center',
                    bgColor: section.props.bgColor || 'bg-background',
                    textColor: section.props.textColor || 'text-foreground',
                }
            };
        case 'Button':
            return {
                id: section.id,
                type: 'Button',
                props: {
                    text: section.props.text || '',
                    variant: section.props.variant || 'default',
                    textAlign: section.props.textAlign || 'center',
                    bgColor: section.props.bgColor || 'bg-background',
                }
            };
        default:
            // Return a minimal section or throw an error if an unknown type is received
            return {
                id: section.id,
                type: 'Text',
                props: { text: 'Sección de tipo desconocido', as: 'p', textAlign: 'center' }
            };
    }
  });

  return { page: validatedSections };
}

const prompt = ai.definePrompt({
  name: 'generateLandingPageContentPrompt',
  input: {schema: GenerateLandingPageInputSchema},
  // The AI is now instructed to output an object with a 'page' key containing the array of sections.
  output: {schema: GenerateLandingPageOutputFlowSchema},
  model: 'googleai/gemini-1.5-pro-latest',
  prompt: `Eres 'Creadora Atómica', una IA experta en crear el CONTENIDO y la ESTRUCTURA para una página de ventas de alta conversión. Tu única tarea es generar un objeto JSON que contenga una clave "page", y el valor de esa clave DEBE ser un ARRAY JSON de secciones.

**DATOS DEL PRODUCTO:**
- Descripción del Producto: {{{productDescription}}}
- Público Objetivo: {{{targetAudience}}}
- Tono Visual y de Marca: {{{colorPalette}}}

**DIRECTIVAS ESTRICTAS:**

1.  **Genera un Objeto con una Clave 'page':** Tu salida DEBE ser un único objeto JSON.
2.  **El valor de 'page' debe ser un Array:** Dentro de ese objeto, la clave "page" debe contener un array de secciones.
3.  **Crea CUATRO Secciones:** El array 'page' debe contener exactamente CUATRO secciones, en este orden: 'Hero', 'Text', 'Features' y 'Button'.
4.  **Para cada sección, define su 'type' y su objeto 'props'.**
5.  **Completa las 'props' de la Sección Hero (type: 'Hero'):**
    *   **title:** Un titular magnético que enganche, basado en el producto.
    *   **subtitle:** Un subtítulo que genere curiosidad y apoye al titular.
    *   **buttonText:** Texto para el botón de la sección Hero (ej. "Empezar Prueba Gratis").
    *   **bgColor:** Clase de color de fondo. Usa 'bg-gray-900' para tonos oscuros, 'bg-white' para claros.
    *   **textColor:** Clase de color de texto que contraste. Usa 'text-white' o 'text-gray-800'.
    *   **textAlign:** 'left', 'center' o 'right'.
6.  **Completa las 'props' de la Sección Text (type: 'Text'):**
    *   **text:** Un párrafo corto (2-3 frases) que introduzca las características o refuerce el mensaje principal.
    *   **as:** Usa 'p' para un párrafo normal.
    *   **textAlign:** 'center'.
    *   **bgColor:** 'bg-background'.
    *   **textColor:** 'text-foreground'.
7.  **Completa las 'props' de la Sección Features (type: 'Features'):**
    *   **title:** Un titular que resuma el valor (ej. "Todo lo que necesitas para triunfar").
    *   **subtitle:** Un subtítulo que dé más contexto a las características.
    *   **features:** Un array de EXACTAMENTE 3 objetos de características. Cada objeto con:
        *   **icon:** Nombre de un icono válido de 'lucide-react' (ej. 'ShieldCheck', 'Rocket', 'Zap').
        *   **title:** Título de la característica.
        *   **description:** Descripción breve del beneficio.
    *   **bgColor:** 'bg-muted'.
    *   **textColor:** 'text-foreground'.
8.  **Completa las 'props' de la Sección Button (type: 'Button'):**
    *   **text:** Una llamada a la acción final y clara (ej. "¡Lo Quiero! Empiezo Hoy").
    *   **variant:** 'default'.
    *   **textAlign:** 'center'.
    *   **bgColor:** 'bg-background'.

Tu salida debe ser directamente un objeto JSON que se valide contra el esquema proporcionado. No incluyas nada más.
`,
});

// This is the main flow that orchestrates the process.
const generateLandingPageFlow = ai.defineFlow(
  {
    name: 'generateLandingPageFlow',
    inputSchema: GenerateLandingPageInputSchema,
    // The flow now expects an object: { page: [...] }
    outputSchema: GenerateLandingPageOutputFlowSchema,
  },
  async (input) => {
    let analysisData: Partial<GenerateLandingPageInput> = {};

    // Step 1: If URL is provided, analyze it to get structured data
    if (input.url) {
        console.log(`Step 1: Analyzing URL for text content: ${input.url}`);
        const analysis = await analyzeUrlForCampaign({ url: input.url });
        console.log('Step 1: URL text analysis complete.');
        
        analysisData = {
            productDescription: analysis.productDescription,
            targetAudience: analysis.targetAudience,
            // You can add more fields from analysis if needed
        };
    }

    // Step 2: Combine inputs, giving precedence to analysis data
    const finalInput = {
        ...input,
        ...analysisData,
    };
    
    // Step 3: Validate that we have the necessary data to proceed
    if (!finalInput.productDescription || !finalInput.targetAudience) {
        throw new Error('La descripción del producto y la audiencia objetivo son obligatorios. Asegúrate de que la URL proporcionada contenga esta información o rellena los campos manualmente.');
    }

    console.log('Step 4: Generating content from AI with combined data...');
    const contentResponse = await prompt(finalInput);
    const pageData = contentResponse.output;

    if (!pageData || !pageData.page || !Array.isArray(pageData.page) || pageData.page.length === 0) {
      throw new Error('La IA no pudo generar contenido o devolvió una estructura de página inválida.');
    }
    console.log(`Step 4: Successfully generated content.`);
    
    // The AI now returns the object { page: [...] }.
    return pageData;
  }
);
