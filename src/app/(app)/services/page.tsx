import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { libraryData, canteenMenu, gymInfo } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { List, Search, BookCheck, BookX, Utensils, Dumbbell, Clock } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Campus Services</h1>
        <p className="text-muted-foreground">
          Your portal for library, food, and fitness on campus.
        </p>
      </div>

      <Tabs defaultValue="library" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="library">Library</TabsTrigger>
          <TabsTrigger value="canteen">Canteen & Mess</TabsTrigger>
          <TabsTrigger value="gym">Gym</TabsTrigger>
        </TabsList>
        <TabsContent value="library" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Library Resources</CardTitle>
              <CardDescription>Search for books and see new arrivals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input placeholder="Search for books..." className="pl-10" />
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">New Arrivals</h3>
                <ul className="space-y-2">
                  {libraryData.newArrivals.map((book) => (
                    <li key={book.title} className="flex justify-between items-center p-2 rounded-md hover:bg-secondary">
                      <span>{book.title} - <span className="text-muted-foreground">{book.author}</span></span>
                      <Button variant="outline" size="sm">Request</Button>
                    </li>
                  ))}
                </ul>
              </div>
               <div className="space-y-4">
                <h3 className="font-semibold text-lg">Book Status</h3>
                <ul className="space-y-2">
                  {libraryData.availableBooks.map((book) => (
                    <li key={book.title} className="flex justify-between items-center p-2 rounded-md hover:bg-secondary">
                       <span>{book.title} - <span className="text-muted-foreground">{book.author}</span></span>
                      <Badge variant={book.status === 'Available' ? 'default' : 'destructive'} className={book.status === 'Available' ? 'bg-green-100 text-green-800' : ''}>
                        {book.status === 'Available' ? <BookCheck className="w-4 h-4 mr-1" /> : <BookX className="w-4 h-4 mr-1" />}
                        {book.status}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="canteen" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Canteen & Mess Menu</CardTitle>
              <CardDescription>Today's menu. Something missing? Let us know!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Breakfast</h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {canteenMenu.breakfast.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Lunch</h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {canteenMenu.lunch.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                 <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Dinner</h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {canteenMenu.dinner.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
              <Button>
                <Utensils className="mr-2 h-4 w-4" /> Propose a Menu Change
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="gym" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Gym Information</CardTitle>
              <CardDescription>Timings and available equipment.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> Timings</h3>
                <p className="text-muted-foreground mt-2">{gymInfo.timings}</p>
              </div>
               <div>
                <h3 className="font-semibold text-lg flex items-center gap-2"><Dumbbell className="w-5 h-5 text-primary" /> Equipment</h3>
                 <div className="flex flex-wrap gap-2 mt-2">
                    {gymInfo.equipment.map(item => (
                      <Badge key={item} variant="secondary">{item}</Badge>
                    ))}
                  </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
