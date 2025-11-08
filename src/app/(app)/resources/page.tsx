import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { resources } from '@/lib/mock-data';
import { File, Download, Book, Presentation } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categoryIcons = {
  'Course Notes': <File className="w-6 h-6 text-primary" />,
  'Presentations': <Presentation className="w-6 h-6 text-primary" />,
  'Recommended Books': <Book className="w-6 h-6 text-primary" />,
};

const fileTypeIcons = {
  'PDF': <File className="w-4 h-4 text-muted-foreground" />,
  'PPTX': <Presentation className="w-4 h-4 text-muted-foreground" />,
  'EPUB': <Book className="w-4 h-4 text-muted-foreground" />,
};

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Resources Hub</h1>
        <p className="text-muted-foreground">
          Your digital library for course materials, managed by faculty.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {resources.map((category) => (
          <Card key={category.category}>
            <CardHeader className="flex flex-row items-center gap-4">
                {categoryIcons[category.category as keyof typeof categoryIcons]}
              <div>
                <CardTitle className="font-headline">{category.category}</CardTitle>
                <CardDescription>
                  {category.items.length} items available
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li
                    key={item.title}
                    className="flex items-center justify-between p-2 -mx-2 rounded-md hover:bg-secondary"
                  >
                    <div className="flex items-center gap-3">
                      {fileTypeIcons[item.type as keyof typeof fileTypeIcons]}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground">{item.size}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <a href="#" download>
                        <Download className="w-4 h-4" />
                        <span className="sr-only">Download</span>
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
