'use client';

import { useState } from 'react';
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
import { Calendar, Tag, Hand, PenSquare, AlertOctagon } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function EventsPage() {
  const { toast } = useToast();
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [volunteeredEvents, setVolunteeredEvents] = useState<string[]>([]);
  const [concern, setConcern] = useState('');

  const handleRegister = (eventTitle: string) => {
    setRegisteredEvents([...registeredEvents, eventTitle]);
    toast({
      title: 'Registration Confirmed!',
      description: `You have successfully registered for "${eventTitle}".`,
    });
  };

  const handleVolunteer = (eventTitle: string) => {
    setVolunteeredEvents([...volunteeredEvents, eventTitle]);
    toast({
      title: 'Thank you for volunteering!',
      description: `You are now a volunteer for "${eventTitle}".`,
    });
  };

  const handleRaiseConcern = (eventTitle: string) => {
    if (concern.length < 10) {
       toast({
        variant: 'destructive',
        title: 'Concern too short',
        description: 'Please describe your concern in at least 10 characters.',
      });
      return;
    }
    console.log(`Concern for "${eventTitle}": ${concern}`);
    toast({
      title: 'Concern Submitted',
      description: `Your concern regarding "${eventTitle}" has been noted.`,
    });
    setConcern('');
  };

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
            <CardFooter className="p-6 pt-0 flex flex-col gap-2">
              <div className="flex gap-2 w-full">
                <Button
                  className="flex-1"
                  onClick={() => handleRegister(event.title)}
                  disabled={registeredEvents.includes(event.title)}
                >
                  <PenSquare className="mr-2 h-4 w-4" />
                  {registeredEvents.includes(event.title) ? 'Registered' : 'Register'}
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => handleVolunteer(event.title)}
                  disabled={volunteeredEvents.includes(event.title)}
                >
                  <Hand className="mr-2 h-4 w-4" />
                  {volunteeredEvents.includes(event.title) ? 'Volunteering' : 'Volunteer'}
                </Button>
              </div>
               <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <AlertOctagon className="mr-2 h-4 w-4" /> Raise a Concern
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Raise a Concern about "{event.title}"</AlertDialogTitle>
                    <AlertDialogDescription>
                      Please describe your concern below. This will be sent to the event organizers for review.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="grid gap-2">
                    <Label htmlFor="concern" className="sr-only">Concern</Label>
                    <Textarea
                      id="concern"
                      placeholder="Type your concern here..."
                      value={concern}
                      onChange={(e) => setConcern(e.target.value)}
                    />
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setConcern('')}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleRaiseConcern(event.title)}>
                      Submit Concern
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
