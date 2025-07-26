
'use server';

/**
 * @fileOverview A reusable flow for generating an image from a text prompt.
 */
import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';
import {
  GenerateImageInputSchema,
  GenerateImageOutputSchema,
  type GenerateImageInput,
  type GenerateImageOutput
} from '@/ai/schemas/image-generation';


export async function generateImage(
  input: GenerateImageInput
): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}


const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async ({ prompt }) => {
    try {
      console.log(`Generating image for prompt: "${prompt}"`);
      const { media } = await ai.generate({
        model: googleAI.model('gemini-2.0-flash-preview-image-generation'),
        prompt: prompt,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      });

      if (media && media.url) {
        console.log(`Successfully generated image for prompt: "${prompt}"`);
        return { imageUrl: media.url };
      } else {
        throw new Error('Image generation failed to return an image.');
      }
    } catch (err) {
      console.error(`Failed to generate image for prompt: "${prompt}"`, err);
      // Return a valid placeholder on error to prevent schema validation failure.
      return { imageUrl: 'https://placehold.co/512x288.png' };
    }
  }
);
