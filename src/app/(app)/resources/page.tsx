import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { resources } from '@/lib/mock-data';
import { Download, FileText, Presentation, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const categoryIcons: { [key: string]: React.ElementType } = {
  'Course Notes': FileText,
  Presentations: Presentation,
  'Recommended Books': Book,
};

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Resources Hub
        </h1>
        <p className="text-muted-foreground">
          Your digital library for course materials, managed by faculty.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Available Materials</CardTitle>
          <CardDescription>
            Browse and download course notes, presentations, and recommended
            books.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion
            type="multiple"
            defaultValue={resources.map((r) => r.category)}
            className="w-full"
          >
            {resources.map((category) => {
              const Icon = categoryIcons[category.category] || FileText;
              return (
                <AccordionItem
                  key={category.category}
                  value={category.category}
                >
                  <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-primary" />
                      {category.category}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3 pt-2">
                      {category.items.map((item) => (
                        <li
                          key={item.title}
                          className="flex items-center justify-between p-3 rounded-md transition-colors hover:bg-secondary"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1">
                            <span className="font-medium">{item.title}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{item.type}</Badge>
                              <span className="text-xs text-muted-foreground">
                                {item.size}
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="w-5 h-5" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
