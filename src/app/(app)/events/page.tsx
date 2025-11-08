import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { events } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Calendar, Tag, Hand, PenSquare } from 'lucide-react';
import { format } from 'date-fns';

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Events & Exams</h1>
        <p className="text-muted-foreground">
          Discover upcoming events, register, and get involved in campus life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.title} className="flex flex-col">
            <CardHeader className="p-0">
              {event.image && (
                <Image
                  src={event.image.imageUrl}
                  alt={event.image.description}
                  width={600}
                  height={400}
                  data-ai-hint={event.image.imageHint}
                  className="object-cover w-full h-48 rounded-t-lg"
                />
              )}
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="mb-2 font-headline">{event.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  <span>{event.club}</span>
                </div>
              </div>
              <CardDescription>{event.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex gap-2">
              <Button className="flex-1">
                <PenSquare className="mr-2 h-4 w-4" /> Register
              </Button>
              <Button variant="secondary" className="flex-1">
                <Hand className="mr-2 h-4 w-4" /> Volunteer
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
