'use server';
/**
 * @fileOverview A campus services AI agent.
 *
 * - askServicesAgent - A function that handles queries about campus services.
 * - AskServicesAgentInput - The input type for the askServicesAgent function.
 * - AskServicesAgentOutput - The return type for the askServicesAgent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { libraryData, canteenMenu, gymInfo } from '@/lib/mock-data';

// Define Tools to get information
const getLibraryInfo = ai.defineTool(
  {
    name: 'getLibraryInfo',
    description: 'Get information about library resources, like new arrivals or book availability.',
    inputSchema: z.object({}),
    outputSchema: z.any(),
  },
  async () => libraryData
);

const getCanteenInfo = ai.defineTool(
  {
    name: 'getCanteenInfo',
    description: "Get the current menu for the canteen and mess.",
    inputSchema: z.object({}),
    outputSchema: z.any(),
  },
  async () => canteenMenu
);

const getGymInfo = ai.defineTool(
  {
    name: 'getGymInfo',
    description: 'Get information about the gym, like timings and equipment.',
    inputSchema: z.object({}),
    outputSchema: z.any(),
  },
  async () => gymInfo
);

const AskServicesAgentInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().describe('The conversation history.'),
  query: z.string().describe('The user query about campus services.'),
});
export type AskServicesAgentInput = z.infer<typeof AskServicesAgentInputSchema>;

const AskServicesAgentOutputSchema = z.object({
  answer: z.string().describe('The response from the agent.'),
});
export type AskServicesAgentOutput = z.infer<typeof AskServicesAgentOutputSchema>;

export async function askServicesAgent(
  input: AskServicesAgentInput
): Promise<AskServicesAgentOutput> {
  return askServicesAgentFlow(input);
}


const prompt = ai.definePrompt({
  name: 'askServicesAgentPrompt',
  input: { schema: AskServicesAgentInputSchema },
  output: { schema: AskServicesAgentOutputSchema },
  tools: [getLibraryInfo, getCanteenInfo, getGymInfo],
  prompt: `You are a Campus Services AI assistant. Your goal is to answer student and faculty questions about the library, canteen, and gym.

Use the available tools to get the information needed to answer the user's query. Be concise and helpful.

Conversation History:
{{#each history}}
{{role}}: {{{content}}}
{{/each}}

User Query: {{{query}}}

Answer:`,
});

const askServicesAgentFlow = ai.defineFlow(
  {
    name: 'askServicesAgentFlow',
    inputSchema: AskServicesAgentInputSchema,
    outputSchema: AskServicesAgentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
