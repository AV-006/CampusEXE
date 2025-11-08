'use server';

/**
 * @fileOverview Generates a summarized report of faculty feedback from student responses.
 *
 * - generateFacultyFeedbackReport - A function that generates the feedback report.
 * - GenerateFacultyFeedbackReportInput - The input type for the generateFacultyFeedbackReport function.
 * - GenerateFacultyFeedbackReportOutput - The return type for the generateFacultyFeedbackReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFacultyFeedbackReportInputSchema = z.object({
  feedbackResponses: z.array(
    z.object({
      question: z.string().describe('The feedback question asked to the student.'),
      response: z.string().describe('The student response to the feedback question.'),
    })
  ).describe('An array of feedback responses from students.'),
});
export type GenerateFacultyFeedbackReportInput = z.infer<typeof GenerateFacultyFeedbackReportInputSchema>;

const GenerateFacultyFeedbackReportOutputSchema = z.object({
  report: z.string().describe('A summarized report of the faculty feedback.'),
});
export type GenerateFacultyFeedbackReportOutput = z.infer<typeof GenerateFacultyFeedbackReportOutputSchema>;

export async function generateFacultyFeedbackReport(input: GenerateFacultyFeedbackReportInput): Promise<GenerateFacultyFeedbackReportOutput> {
  return generateFacultyFeedbackReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFacultyFeedbackReportPrompt',
  input: {schema: GenerateFacultyFeedbackReportInputSchema},
  output: {schema: GenerateFacultyFeedbackReportOutputSchema},
  prompt: `You are an AI assistant tasked with generating a summarized report of faculty feedback based on student responses to predefined questions.

  Analyze the student feedback responses provided below and generate a concise and constructive report that highlights key areas of improvement and strengths for the faculty member.

  Feedback Responses:
  {{#each feedbackResponses}}
  Question: {{{question}}}
  Response: {{{response}}}
  {{/each}}

  Report:`,
});

const generateFacultyFeedbackReportFlow = ai.defineFlow(
  {
    name: 'generateFacultyFeedbackReportFlow',
    inputSchema: GenerateFacultyFeedbackReportInputSchema,
    outputSchema: GenerateFacultyFeedbackReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
