
'use server';
/**
 * @fileoverview Defines an HTTP GET tool for Genkit flows.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {parse} from 'node-html-parser';

// New output schema for the tool
const HttpGetOutputSchema = z.object({
  title: z.string().describe('The title of the webpage.'),
  h1: z.string().optional().describe('The main H1 heading of the page.'),
  h2s: z.array(z.string()).optional().describe('An array of all H2 headings.'),
  paragraphs: z.array(z.string()).describe('An array of the most relevant paragraphs from the page body.'),
  links: z.array(z.string()).describe('An array of descriptive link texts found on the page.'),
});

export const httpGet = ai.defineTool(
  {
    name: 'httpGet',
    description: 'Fetches the content of a given URL, parses it, and returns a structured summary of its TEXT content. It does NOT return raw HTML or a screenshot. Use this to analyze the text of a page.',
    inputSchema: z.object({
      url: z
        .string()
        .url()
        .describe('The fully qualified URL to fetch, including protocol. This can be a direct link or a redirect/affiliate link.'),
    }),
    outputSchema: HttpGetOutputSchema,
  },
  async ({url}) => {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const html = await response.text();
      const root = parse(html);
      
      // Remove script, style, and other non-content tags
      root.querySelectorAll('script, style, noscript, svg, header, footer, nav').forEach(node => node.remove());

      const body = root.querySelector('body');
      if (!body) {
        throw new Error('Could not find the body of the page.');
      }
      
      const title = root.querySelector('title')?.text.trim() || 'No title found';
      const h1 = root.querySelector('h1')?.text.trim();
      const h2s = root.querySelectorAll('h2').map(h => h.text.trim()).filter(Boolean);
      
      // Get paragraphs, filter out short/irrelevant ones
      const paragraphs = root.querySelectorAll('p')
        .map(p => p.text.trim())
        .filter(p => p.length > 50); // Only keep paragraphs with some substance

      // Get descriptive links, filter out vague ones
      const links = root.querySelectorAll('a')
        .map(a => a.text.trim())
        .filter(a => a.length > 3 && !['click here', 'learn more', 'read more'].includes(a.toLowerCase()));

      return {
        title,
        h1,
        h2s,
        paragraphs,
        links
      };

    } catch (error) {
      console.error('Error in httpGet tool:', error);
      if (error instanceof Error) {
        // Return a valid empty structure on error to prevent flow failure
        return { title: `Failed to fetch URL: ${error.message}`, paragraphs: [], links: [] };
      }
      return { title: 'An unknown error occurred while fetching the URL.', paragraphs: [], links: [] };
    }
  }
);
