import { ServicesAgent } from './services-agent';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { libraryData, canteenMenu, gymInfo } from '@/lib/mock-data';
import { Library, UtensilsCrossed, Dumbbell } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      <div className="md:col-span-2 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Campus Services
          </h1>
          <p className="text-muted-foreground">
            Your portal for library, food, and fitness on campus. Ask the agent for more details!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Library className="w-6 h-6 text-primary" />
                Library
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>New Arrivals:</strong> {libraryData.newArrivals.map(b => b.title).join(', ')}.</p>
              <p className="text-muted-foreground">Ask the agent about book availability!</p>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UtensilsCrossed className="w-6 h-6 text-primary" />
                  Canteen & Mess
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Lunch Menu:</strong> {canteenMenu.lunch.join(', ')}.</p>
                <p className="text-muted-foreground">Ask the agent for today's full menu!</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="w-6 h-6 text-primary" />
                  Gym
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Timings:</strong> {gymInfo.timings}.</p>
                <p className="text-muted-foreground">Ask the agent about available equipment!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="md:col-span-1 sticky top-20">
        <ServicesAgent />
      </div>
    </div>
  );
}
