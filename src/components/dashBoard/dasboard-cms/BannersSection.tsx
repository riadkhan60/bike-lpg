'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Loader2, Trash, Upload, ImagePlus } from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Banner | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dragActiveLarge, setDragActiveLarge] = useState(false);
  const [dragActiveSmall, setDragActiveSmall] = useState(false);
  const [largeScreenFile, setLargeScreenFile] = useState<File | null>(null);
  const [smallScreenFile, setSmallScreenFile] = useState<File | null>(null);
  const largeScreenFileInputRef = useRef<HTMLInputElement>(null);
  const smallScreenFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Simulating loading of banners
    setTimeout(() => setIsLoading(false), 200);
  }, []);

  const handleDrag = (e: React.DragEvent, type: 'large' | 'small') => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
     if (type === 'large') {
       setDragActiveLarge(true);
     } else {
       setDragActiveSmall(true);
     }
    } else if (e.type === 'dragleave') {
      if (type === 'large') {
        setDragActiveLarge(false);
      } else {
        setDragActiveSmall(false);
      }
    }
  };

  const handleDrop = async (e: React.DragEvent, type: 'large' | 'small') => {
    e.preventDefault();
    e.stopPropagation();
    if(type === 'large') {
      setDragActiveLarge(false);
    } else {
      setDragActiveSmall(false);
    }
    

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await handleFileSelection(file, type);
    }
  };

  const handleFileSelection = async (file: File, type: 'large' | 'small') => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select a valid image file',
        variant: 'destructive',
      });
      return;
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: 'Error',
        description: 'Image size must be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    if (type === 'large') {
      setLargeScreenFile(file);
    } else {
      setSmallScreenFile(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('image', file);

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

    if (!largeScreenFile) {
      toast({
        title: 'Error',
        description: 'Please select a large screen banner image',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const largeScreenUrl = await handleFileUpload(largeScreenFile);
      const smallScreenUrl = smallScreenFile
        ? await handleFileUpload(smallScreenFile)
        : undefined;

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
      setLargeScreenFile(null);
      setSmallScreenFile(null);
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

      if (largeScreenFile) {
        largeScreenUrl = await handleFileUpload(largeScreenFile);
      }
      if (smallScreenFile) {
        smallScreenUrl = await handleFileUpload(smallScreenFile);
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
    } catch {
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
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete banner',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="h-12 w-12 text-primary" />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="border-b bg-white/50 backdrop-blur-sm">
          <CardTitle className="flex items-center gap-2">
            <ImagePlus className="h-5 w-5" />
            Add New Banner
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleAddBanner} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div
                className={`relative rounded-lg border-2 border-dashed p-8 transition-colors ${
                  dragActiveLarge
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200'
                }`}
                onDragEnter={(e) => handleDrag(e, 'large')}
                onDragLeave={(e) => handleDrag(e, 'large')}
                onDragOver={(e) => handleDrag(e, 'large')}
                onDrop={(e) => handleDrop(e, 'large')}
              >
                <Input
                  id="largeScreenBanner"
                  name="largeScreenBanner"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={largeScreenFileInputRef}
                  onChange={(e) =>
                    handleFileSelection(e.target.files?.[0] as File, 'large')
                  }
                />
                <div className="flex flex-col items-center justify-center text-center">
                  <Upload className="mb-4 h-12 w-12 text-gray-400" />
                  <p className="mb-2 text-lg font-medium">
                    Large Screen Banner
                  </p>
                  <p className="mb-4 text-sm text-gray-500">
                    Drag & drop or click to select
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => largeScreenFileInputRef.current?.click()}
                  >
                    {largeScreenFile ? 'Change File' : 'Select File'}
                  </Button>
                  {largeScreenFile && (
                    <p className="mt-2 text-sm text-gray-500">
                      {largeScreenFile.name}
                    </p>
                  )}
                </div>
              </div>
              <div
                className={`relative rounded-lg border-2 border-dashed p-8 transition-colors ${
                  dragActiveSmall
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200'
                }`}
                onDragEnter={(e) => handleDrag(e, 'small')}
                onDragLeave={(e) => handleDrag(e, 'small')}
                onDragOver={(e) => handleDrag(e, 'small')}
                onDrop={(e) => handleDrop(e, 'small')}
              >
                <Input
                  id="smallScreenBanner"
                  name="smallScreenBanner"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={smallScreenFileInputRef}
                  onChange={(e) =>
                    handleFileSelection(e.target.files?.[0] as File, 'small')
                  }
                />
                <div className="flex flex-col items-center justify-center text-center">
                  <Upload className="mb-4 h-12 w-12 text-gray-400" />
                  <p className="mb-2 text-lg font-medium">
                    Small Screen Banner
                  </p>
                  <p className="mb-4 text-sm text-gray-500">
                    Drag & drop or click to select
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => smallScreenFileInputRef.current?.click()}
                  >
                    {smallScreenFile ? 'Change File' : 'Select File'}
                  </Button>
                  {smallScreenFile && (
                    <p className="mt-2 text-sm text-gray-500">
                      {smallScreenFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button disabled={isSubmitting || !largeScreenFile} type="submit">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Add Banner'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle>Existing Banners</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {banners.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-gray-500"
            >
              <ImagePlus className="mb-4 h-16 w-16" />
              <p className="text-lg font-medium">No banners uploaded yet</p>
              <p className="text-sm">Upload your first banner to get started</p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence>
                {banners.map((banner) => (
                  <motion.div
                    key={banner.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={banner.largeScreenUrl}
                        alt="Large Screen Banner"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity  group-hover:opacity-100" />
                      <div className="absolute right-2 top-2 flex space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setEditingItem(banner);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteBanner(banner.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
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
                    onChange={(e) =>
                      setLargeScreenFile(e.target.files?.[0] || null)
                    }
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
                    onChange={(e) =>
                      setSmallScreenFile(e.target.files?.[0] || null)
                    }
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
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Save changes'
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
