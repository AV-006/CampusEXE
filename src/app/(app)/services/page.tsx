import { ServicesAgent } from './services-agent';

export default function ServicesPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Campus Services
          </h1>
          <p className="text-muted-foreground">
            Your portal for library, food, and fitness on campus.
          </p>
        </div>
        <p className="text-muted-foreground">
          This page is managed by the Services Agent. Ask it anything about the
          library, canteen, or gym!
        </p>
      </div>
      <div className="md:col-span-1">
        <ServicesAgent />
      </div>
    </div>
  );
}
