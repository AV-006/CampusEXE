import { ResourcesAgent } from './resources-agent';

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Resources Hub</h1>
        <p className="text-muted-foreground">
          Your digital library for course materials, managed by faculty.
        </p>
      </div>

      <ResourcesAgent />
    </div>
  );
}
