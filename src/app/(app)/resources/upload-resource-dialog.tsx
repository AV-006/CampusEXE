'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { ResourceCategory } from '@/lib/mock-data';

interface UploadResourceDialogProps {
  children: React.ReactNode;
  onAddResource: (newResource: { title: string, category: string }) => void;
  resources: ResourceCategory[];
}

export function UploadResourceDialog({ children, onAddResource, resources }: UploadResourceDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !file) {
      toast({
        variant: 'destructive',
        title: 'Incomplete form',
        description: 'Please fill out all fields and select a file.',
      });
      return;
    }

    const categoryData = resources.find(cat => cat.category === category);
    const isDuplicate = categoryData?.items.some(
      item => item.title.toLowerCase() === title.toLowerCase()
    );

    if (isDuplicate) {
      toast({
        variant: 'destructive',
        title: 'Duplicate Resource',
        description: `A resource with the title "${title}" already exists in the "${category}" category.`,
      });
      return;
    }

    // Simulate adding the resource
    onAddResource({ title, category });

    toast({
      title: 'Resource Uploaded!',
      description: `"${title}" has been successfully added to ${category}.`,
    });

    // Reset form and close dialog
    setTitle('');
    setCategory('');
    setFile(null);
    setOpen(false);
  };
  
  const availableCategories = resources.map((cat) => cat.category);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Upload Resource</DialogTitle>
            <DialogDescription>
              Add a new resource for students. The file will be available in the resources hub.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select onValueChange={setCategory} value={category} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                File
              </Label>
              <Input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Upload</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
