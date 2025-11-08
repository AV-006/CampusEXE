'use server';

import { z } from 'zod';
import { generateFacultyFeedbackReport } from '@/ai/flows/generate-faculty-feedback-report';
import { feedbackQuestions } from '@/lib/mock-data';

const schema = z.object({
  strengths: z.string().min(10, 'Please provide a bit more detail.'),
  improvements: z.string().min(10, 'Please provide a bit more detail.'),
  material: z.string().min(10, 'Please provide a bit more detail.'),
  pace: z.string().min(3, 'Please provide a bit more detail.'),
  additional: z.string().optional(),
});

export type FormState = {
  message: string;
  report?: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function submitFeedback(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = schema.safeParse(formData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key in formData) {
      fields[key] = formData[key].toString();
    }
    return {
      message: "Invalid form data.",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  try {
    const feedbackResponses = Object.entries(parsed.data)
      .filter(([, response]) => response)
      .map(([key, response]) => {
        const question = feedbackQuestions.find(q => q.id === key)?.label || key;
        return {
          question: question,
          response: response as string,
        };
      });

    const result = await generateFacultyFeedbackReport({ feedbackResponses });

    if (result.report) {
      return { message: 'Report generated successfully.', report: result.report };
    } else {
      return { message: 'Failed to generate report. The AI model did not return a report.' };
    }

  } catch (e) {
    const error = e instanceof Error ? e.message : 'An unknown error occurred.';
    console.error(error);
    return { message: `An error occurred: ${error}` };
  }
}
