'use client';

import { ServicesAgent } from './services-agent';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { libraryData, canteenMenu, gymInfo } from '@/lib/mock-data';
import { Library, UtensilsCrossed, Dumbbell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ServicesPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      <div className="md:col-span-2 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Campus Services
          </h1>
          <p className="text-muted-foreground">
            Your portal for library, food, and fitness on campus. Ask the agent
            for more details!
          </p>
        </div>

        <Tabs defaultValue="library" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="library">
              <Library className="mr-2 h-4 w-4" /> Library
            </TabsTrigger>
            <TabsTrigger value="canteen">
              <UtensilsCrossed className="mr-2 h-4 w-4" /> Canteen & Mess
            </TabsTrigger>
            <TabsTrigger value="gym">
              <Dumbbell className="mr-2 h-4 w-4" /> Gym
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="library">
            <Card>
              <CardHeader>
                <CardTitle>Library Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">New Arrivals</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {libraryData.newArrivals.map((book) => (
                       <div key={book.title} className="p-3 bg-secondary rounded-lg">
                         <p className="font-medium">{book.title}</p>
                         <p className="text-sm text-muted-foreground">{book.author}</p>
                       </div>
                    ))}
                  </div>
                </div>
                 <div>
                  <h3 className="font-semibold mb-2">Book Availability</h3>
                   <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {libraryData.availableBooks.map((book) => (
                        <TableRow key={book.title}>
                          <TableCell className="font-medium">{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell className="text-right">
                             <Badge variant={book.status === 'Available' ? 'secondary' : 'destructive'}
                               className={book.status === 'Available' ? 'bg-green-100 text-green-800' : ''}
                            >
                              {book.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="canteen">
            <Card>
              <CardHeader>
                <CardTitle>Daily Menu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Breakfast</h3>
                  <p className="text-sm text-muted-foreground">{canteenMenu.breakfast.join(', ')}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Lunch</h3>
                  <p className="text-sm text-muted-foreground">{canteenMenu.lunch.join(', ')}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Dinner</h3>
                  <p className="text-sm text-muted-foreground">{canteenMenu.dinner.join(', ')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gym">
            <Card>
              <CardHeader>
                <CardTitle>Gym Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Timings</h3>
                  <p className="text-sm text-muted-foreground">{gymInfo.timings}</p>
                </div>
                 <div>
                  <h3 className="font-semibold mb-2">Available Equipment</h3>
                  <div className="flex flex-wrap gap-2">
                    {gymInfo.equipment.map((item) => (
                      <Badge key={item} variant="secondary">{item}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="md:col-span-1 sticky top-20">
        <ServicesAgent />
      </div>
    </div>
  );
}