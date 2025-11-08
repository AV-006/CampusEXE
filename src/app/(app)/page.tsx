import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookCopy,
  Users,
  MessageSquareQuote,
  ConciergeBell,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';

const featureCards = [
  {
    title: 'Resources Hub',
    description: 'Access notes, presentations, and books.',
    href: '/resources',
    icon: BookCopy,
    imageId: 'dashboard-resources',
  },
  {
    title: 'Interaction',
    description: 'Engage with faculty and view leaderboards.',
    href: '/interaction',
    icon: Users,
    imageId: 'dashboard-interaction',
  },
  {
    title: 'Faculty Feedback',
    description: 'Provide anonymous feedback to improve teaching.',
    href: '/feedback',
    icon: MessageSquareQuote,
    imageId: 'dashboard-feedback',
  },
  {
    title: 'Campus Services',
    description: 'Library, canteen, gym info and more.',
    href: '/services',
    icon: ConciergeBell,
    imageId: 'dashboard-services',
  },
  {
    title: 'Events & Exams',
    description: 'Stay updated on all campus happenings.',
    href: '/events',
    icon: Calendar,
    imageId: 'dashboard-events',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Welcome to CampusConnect
        </h1>
        <p className="text-muted-foreground">Your friendly campus assistant.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featureCards.map((card) => {
          const image = PlaceHolderImages.find((img) => img.id === card.imageId);
          return (
            <Card
              key={card.href}
              className="overflow-hidden transition-all duration-300 ease-in-out group hover:shadow-lg hover:-translate-y-1"
            >
              <Link href={card.href} className="block">
                <CardHeader className="p-0">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      width={600}
                      height={400}
                      className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <card.icon className="w-8 h-8 mb-4 text-primary" />
                      <CardTitle className="mb-1 text-xl font-headline">
                        {card.title}
                      </CardTitle>
                      <CardDescription>{card.description}</CardDescription>
                    </div>
                    <ArrowRight className="w-5 h-5 mt-1 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
