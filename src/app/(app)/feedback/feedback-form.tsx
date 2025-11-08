'use client';

import { useActionState, useFormStatus } from 'react-dom';
import { submitFeedback, type FormState } from './actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { feedbackQuestions } from '@/lib/mock-data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, Terminal } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating Report...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Submit & Generate Report
        </>
      )}
    </Button>
  );
}

export function FeedbackForm() {
  const initialState: FormState = { message: '' };
  const [state, formAction] = useActionState(submitFeedback, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.report) {
      toast({
        title: 'Success!',
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.message && (state.issues || state.message.startsWith('An error'))) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);


  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <form ref={formRef} action={formAction}>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Feedback Form</CardTitle>
            <CardDescription>All submissions are anonymous.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {feedbackQuestions.map((q) => (
              <div key={q.id} className="space-y-2">
                <Label htmlFor={q.id}>{q.label}</Label>
                <Textarea
                  id={q.id}
                  name={q.id}
                  placeholder={q.placeholder}
                  rows={3}
                  required
                />
              </div>
            ))}
             {state.issues && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>There was a problem with your submission.</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc list-inside">
                    {state.issues.map((issue, i) => <li key={i}>{issue}</li>)}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>
      
      <div className="sticky top-20">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Faculty Report</CardTitle>
            <CardDescription>
              This is the AI-generated report that will be shared with the faculty.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {state.report ? (
              <blockquote className="prose prose-sm max-w-none p-4 bg-secondary rounded-lg border-l-4 border-primary">
                {state.report}
              </blockquote>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center bg-secondary rounded-lg">
                <Sparkles className="w-10 h-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">The generated report will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
