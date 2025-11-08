'use server';

import { askResourcesAgent } from '@/ai/flows/resources-agent-flow';
import { z } from 'zod';

export type AgentState = {
  messages: {
    role: 'user' | 'assistant';
    content: string;
  }[];
};

const AskAgentSchema = z.object({
  query: z.string().min(1),
});

export async function askAgent(prevState: AgentState, data: FormData): Promise<AgentState> {
  const formData = Object.fromEntries(data);
  const parsed = AskAgentSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      messages: [
        ...prevState.messages,
        {
          role: 'assistant',
          content: "I'm sorry, I didn't receive a valid query. Please try again.",
        },
      ],
    };
  }

  const userQuery = parsed.data.query;
  const newMessages = [...prevState.messages, { role: 'user' as const, content: userQuery }];

  try {
    const result = await askResourcesAgent({
      history: prevState.messages,
      query: userQuery,
    });
    return {
      messages: [...newMessages, { role: 'assistant' as const, content: result.answer }],
    };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'An unknown error occurred.';
    console.error(e);
    return {
      messages: [
        ...newMessages,
        {
          role: 'assistant' as const,
          content: `Sorry, something went wrong: ${error}`,
        },
      ],
    };
  }
}
