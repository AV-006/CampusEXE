import { ResourcesAgent } from './resources-agent';

export default function ResourcesPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Resources Hub
          </h1>
          <p className="text-muted-foreground">
            Your digital library for course materials, managed by faculty.
          </p>
        </div>
        <p className="text-muted-foreground">
          This page is managed by the AI Tutor Agent. It can see your recent
          forum activity to understand what topics you might be struggling with.
          Ask it for a personalized learning plan!
        </p>
      </div>
      <div className="md:col-span-1">
        <ResourcesAgent />
      </div>
    </div>
  );
}
