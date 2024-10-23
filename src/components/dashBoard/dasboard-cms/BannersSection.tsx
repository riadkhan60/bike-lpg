'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDashboardContext } from './DashboardContext/DasboardContext';

interface Banner {
  id: string;
  largeScreenUrl: string;
  smallScreenUrl?: string;
}



export default function BannersSection() {
  const { banners, setBanners } = useDashboardContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<Banner | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const largeScreenFileInputRef = useRef<HTMLInputElement>(null);
  const smallScreenFileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleAddBanner = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const largeScreenFile = (
      form.elements.namedItem('largeScreenBanner') as HTMLInputElement
    ).files?.[0];
    const smallScreenFile = (
      form.elements.namedItem('smallScreenBanner') as HTMLInputElement
    ).files?.[0];

    try {
      setIsSubmitting(true);
      let largeScreenUrl = '';
      let smallScreenUrl = '';

      if (largeScreenFile) {
        largeScreenUrl = await handleImageUpload(largeScreenFile);
      }
      if (smallScreenFile) {
        smallScreenUrl = await handleImageUpload(smallScreenFile);
      }

      const response = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'banner',
          data: { largeScreenUrl, smallScreenUrl },
        }),
      });

      if (!response.ok) throw new Error('Failed to add banner');
      const newBanner = await response.json();
      setBanners([...banners, newBanner]);
      form.reset();
      toast({
        title: 'Success',
        description: 'Banner added successfully',
      });
    } catch  {
      toast({
        title: 'Error',
        description: 'Failed to add banner',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditBanner = async (banner: Banner) => {
    try {
      setIsSubmitting(true);
      let largeScreenUrl = banner.largeScreenUrl;
      let smallScreenUrl = banner.smallScreenUrl;

      if (largeScreenFileInputRef.current?.files?.[0]) {
        largeScreenUrl = await handleImageUpload(
          largeScreenFileInputRef.current.files[0],
        );
      }
      if (smallScreenFileInputRef.current?.files?.[0]) {
        smallScreenUrl = await handleImageUpload(
          smallScreenFileInputRef.current.files[0],
        );
      }

      const response = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'banner',
          id: banner.id,
          data: { largeScreenUrl, smallScreenUrl },
        }),
      });
      if (!response.ok) throw new Error('Failed to update banner');
     const updatedBanner = await response.json();
     setBanners(
       banners.map((item) => (item.id === banner.id ? updatedBanner : item)),
     );
      setEditingItem(null);
      setIsEditModalOpen(false);
      toast({
        title: 'Success',
        description: 'Banner updated successfully',
      });
    } catch  {
      toast({
        title: 'Error',
        description: 'Failed to update banner',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBanner = async (id: string) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/cms', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'banner', id }),
      });
      if (!response.ok) throw new Error('Failed to delete banner');
      setBanners(banners.filter((banner) => banner.id !== id));
      toast({
        title: 'Success',
        description: 'Banner deleted successfully',
      });
    } catch  {
      toast({
        title: 'Error',
        description: 'Failed to delete banner',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Banner</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddBanner}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="largeScreenBanner">Large Screen Banner</Label>
                <Input
                  id="largeScreenBanner"
                  type="file"
                  accept="image/*"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="smallScreenBanner">Small Screen Banner</Label>
                <Input
                  id="smallScreenBanner"
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
            <Button disabled={isSubmitting} type="submit" className="mt-4">
              Add Banner
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Banners</CardTitle>
        </CardHeader>
        <CardContent>
          {banners.map((banner, index) => (
            <div key={banner.id} className="mb-4 p-4 border rounded">
              <h3 className="font-semibold">Banner {index + 1}</h3>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-bold">Large Screen:</p>
                  <Image
                    src={banner.largeScreenUrl}
                    alt="Large Screen Banner"
                    width={400}
                    height={200}
                    className="mt-2 max-w-full h-auto rounded-lg"
                  />
                </div>
                <div>
                  <p className="font-bold">Small Screen:</p>
                 {banner.smallScreenUrl ? <Image
                    src={banner.smallScreenUrl}
                    alt="Small Screen Banner"
                    width={200}
                    height={200}
                    className="mt-2 max-w-full h-auto rounded-lg"
                  /> : <p>No small screen banner</p>}
                </div>
              </div>
              <div className="mt-2 flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingItem(banner);
                    setIsEditModalOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteBanner(banner.id)}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Banner</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditBanner(editingItem);
              }}
            >
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="editLargeScreenBanner">
                    Large Screen Banner
                  </Label>
                  <Input
                    id="editLargeScreenBanner"
                    type="file"
                    accept="image/*"
                    ref={largeScreenFileInputRef}
                  />
                  {editingItem.largeScreenUrl && (
                    <Image
                      src={editingItem.largeScreenUrl}
                      alt="Large Screen Banner"
                      width={400}
                      height={200}
                      className="mt-2 max-w-full h-auto rounded-lg"
                    />
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="editSmallScreenBanner">
                    Small Screen Banner
                  </Label>
                  <Input
                    id="editSmallScreenBanner"
                    type="file"
                    accept="image/*"
                    ref={smallScreenFileInputRef}
                  />
                  {editingItem.smallScreenUrl && (
                    <Image
                      src={editingItem.smallScreenUrl}
                      alt="Small Screen Banner"
                      width={200}
                      height={200}
                      className="mt-2 max-w-full h-auto rounded-lg"
                    />
                  )}
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button disabled={isSubmitting} type="submit">
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
