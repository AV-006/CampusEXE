'use server';
/**
 * @fileOverview An AI agent for the Resources Hub.
 *
 * - askResourcesAgent - A function that handles queries about resources.
 * - AskResourcesAgentInput - The input type for the askResourcesAgent function.
 * - AskResourcesAgentOutput - The return type for the askResourcesAgent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { resources } from '@/lib/mock-data';

const AskResourcesAgentInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().describe('The conversation history.'),
  query: z.string().describe('The user query about resources.'),
});
export type AskResourcesAgentInput = z.infer<typeof AskResourcesAgentInputSchema>;

const AskResourcesAgentOutputSchema = z.object({
  answer: z.string().describe('The response from the agent.'),
});
export type AskResourcesAgentOutput = z.infer<typeof AskResourcesAgentOutputSchema>;

export async function askResourcesAgent(
  input: AskResourcesAgentInput
): Promise<AskResourcesAgentOutput> {
  return askResourcesAgentFlow(input);
}

const resourcesJson = JSON.stringify(resources, null, 2);

const prompt = ai.definePrompt({
  name: 'askResourcesAgentPrompt',
  input: { schema: AskResourcesAgentInputSchema },
  output: { schema: AskResourcesAgentOutputSchema },
  prompt: `You are an AI assistant for the CampusConnect Resources Hub. Your goal is to help students and faculty find and understand the available course materials.

You have access to the following list of available resources in JSON format:
\`\`\`json
{{{resourcesJson}}}
\`\`\`

Based on the user's query and the conversation history, provide a helpful and concise answer. If the user asks a general question, you can introduce yourself and explain what you can do. If a resource is not available, say so politely.

Conversation History:
{{#each history}}
{{role}}: {{{content}}}
{{/each}}

User Query: {{{query}}}

Answer:`,
});

const askResourcesAgentFlow = ai.defineFlow(
  {
    name: 'askResourcesAgentFlow',
    inputSchema: AskResourcesAgentInputSchema,
    outputSchema: AskResourcesAgentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      ...input,
      // @ts-ignore
      resourcesJson,
    });
    return output!;
  }
);
