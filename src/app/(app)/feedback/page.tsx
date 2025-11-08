import { FeedbackForm } from './feedback-form';

export default function FeedbackPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Anonymous Faculty Feedback</h1>
        <p className="text-muted-foreground">
          Help your teachers improve by providing constructive, anonymous feedback.
          An AI assistant will summarize the responses into a helpful report for the faculty.
        </p>
      </div>

      <FeedbackForm />
    </div>
  );
}
