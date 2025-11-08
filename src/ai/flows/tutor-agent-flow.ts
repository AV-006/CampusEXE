'use server';
/**
 * @fileOverview An AI agent for the Resources Hub that acts as an AI Tutor.
 *
 * - askTutorAgent - A function that handles queries for the AI tutor.
 * - AskTutorAgentInput - The input type for the askTutorAgent function.
 * - AskTutorAgentOutput - The return type for the askTutorAgent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { resources, leaderboard } from '@/lib/mock-data';

const AskTutorAgentInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().describe('The conversation history.'),
  query: z.string().describe('The user query for the tutor.'),
});
export type AskTutorAgentInput = z.infer<typeof AskTutorAgentInputSchema>;

const AskTutorAgentOutputSchema = z.object({
  answer: z.string().describe('The response from the agent.'),
});
export type AskTutorAgentOutput = z.infer<typeof AskTutorAgentOutputSchema>;

export async function askTutorAgent(
  input: AskTutorAgentInput
): Promise<AskTutorAgentOutput> {
  return askTutorAgentFlow(input);
}

const resourcesJson = JSON.stringify(resources, null, 2);
const forumActivityJson = JSON.stringify(leaderboard.slice(-3), null, 2); // Simulate getting data for bottom students

const prompt = ai.definePrompt({
  name: 'askTutorAgentPrompt',
  input: { schema: AskTutorAgentInputSchema },
  output: { schema: AskTutorAgentOutputSchema },
  prompt: `You are an AI Tutor for CampusExe. Your goal is to help students by creating personalized learning plans based on their needs.

You have access to the following information:
1.  A list of available resources in JSON format:
    \`\`\`json
    {{{resourcesJson}}}
    \`\`\`
2.  Recent forum activity for students who might be struggling (simulated):
    \`\`\`json
    {{{forumActivityJson}}}
    \`\`\`

Here's your task:
-   If the user asks for help on a specific topic, create a simple, step-by-step learning plan for them.
-   Your learning plan should recommend 2-3 resources from the provided list.
-   You can also look at the forum activity to see if the current user (or users like them) are struggling with a topic and proactively suggest a learning plan if their query is vague (e.g., "help me study").
-   Keep your responses friendly, encouraging, and concise.

Conversation History:
{{#each history}}
{{role}}: {{{content}}}
{{/each}}

User Query: {{{query}}}

Answer:`,
});

const askTutorAgentFlow = ai.defineFlow(
  {
    name: 'askTutorAgentFlow',
    inputSchema: AskTutorAgentInputSchema,
    outputSchema: AskTutorAgentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      ...input,
      // @ts-ignore
      resourcesJson,
      // @ts-ignore
      forumActivityJson,
    });
    return output!;
  }
);
