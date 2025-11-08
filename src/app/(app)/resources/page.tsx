'use client';

import { useState } from 'react';
import { ResourcesAgent } from './resources-agent';
import { resources as initialResources } from '@/lib/mock-data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FileText, Presentation, Book, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UploadResourceDialog } from './upload-resource-dialog';
import type { ResourceCategory } from '@/lib/mock-data';

const categoryIcons: { [key: string]: React.ReactNode } = {
  'Course Notes': <FileText className="w-5 h-5 mr-2" />,
  'Presentations': <Presentation className="w-5 h-5 mr-2" />,
  'Recommended Books': <Book className="w-5 h-5 mr-2" />,
};

export default function ResourcesPage() {
  const [resources, setResources] = useState<ResourceCategory[]>(initialResources);

  const handleAddResource = (newResource: { title: string, category: string }) => {
    setResources(prevResources => {
      const newResources = [...prevResources];
      const categoryIndex = newResources.findIndex(cat => cat.category === newResource.category);

      if (categoryIndex !== -1) {
        newResources[categoryIndex].items.push({
          title: newResource.title,
          type: 'PDF', // Mock data
          size: `${(Math.random() * 5 + 1).toFixed(1)}MB`, // Mock data
        });
      }
      return newResources;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      <div className="md:col-span-2 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Resources Hub
          </h1>
          <p className="text-muted-foreground">
            Your digital library for course materials, managed by faculty.
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Available Resources</CardTitle>
              <CardDescription>
                Here's a list of all the materials available for your courses.
              </CardDescription>
            </div>
            <UploadResourceDialog onAddResource={handleAddResource} resources={resources}>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Resource
              </Button>
            </UploadResourceDialog>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full" defaultValue="Course Notes">
              {resources.map((category) => (
                <AccordionItem
                  key={category.category}
                  value={category.category}
                >
                  <AccordionTrigger className="font-semibold">
                    <div className="flex items-center">
                      {categoryIcons[category.category]}
                      {category.category}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 pl-4">
                      {category.items.map((item, index) => (
                        <li key={`${item.title}-${index}`} className="flex justify-between items-center text-sm">
                          <span>{item.title}</span>
                          <span className="text-muted-foreground text-xs">
                            {item.type} &middot; {item.size}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-1 sticky top-20">
        <Card>
          <CardHeader>
            <CardTitle>AI Tutor</CardTitle>
            <CardDescription>
              The AI Tutor is currently offline. Please check back later.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
