'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Trash, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface GalleryImage {
  id: string;
  image: string;
  createdAt?: string;
}

interface UploadResponse {
  url: string;
}

interface APIError {
  error: string;
  details?: Array<{ message: string }>;
}

export default function GallerySection() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imageFileInputRef = useRef<HTMLInputElement>(null);

  // Fetch gallery images when the component loads
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch('/api/gallery');
        if (!response.ok) {
          const errorData: APIError = await response.json();
          throw new Error(errorData.error || 'Failed to fetch images');
        }

        const data: GalleryImage[] = await response.json();
        setGalleryImages(data);
      } catch (error) {
        console.error('Fetch error:', error);
        toast({
          title: 'Error',
          description:
            error instanceof Error
              ? error.message
              : 'Failed to load gallery images',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData: APIError = await response
        .json()
        .catch(() => ({ error: 'Upload failed' }));
      throw new Error(errorData.error || `Upload failed (${response.status})`);
    }

    const data: UploadResponse = await response.json();
    return data.url;
  };

  const handleAddImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const file = imageFileInputRef.current?.files?.[0];

    // File validation
    if (!file) {
      toast({
        title: 'Error',
        description: 'Please select an image to upload',
        variant: 'destructive',
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select a valid image file',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (e.g., 5MB limit)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: 'Error',
        description: 'Image size must be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Upload image first
      const imageUrl = await handleImageUpload(file);

      // Save image to database
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        const errorData: APIError = await response
          .json()
          .catch(() => ({ error: 'Failed to save image' }));
        throw new Error(
          errorData.error || `Failed to save image (${response.status})`,
        );
      }

      const newImage: GalleryImage = await response.json();

      // Update local state with the new image
      setGalleryImages((prevImages) => [...prevImages, newImage]);

      // Show success message
      toast({
        title: 'Success',
        description: 'Image added successfully',
      });

      // Reset form and file input
      form.reset();
      if (imageFileInputRef.current) {
        imageFileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Add image error:', error);
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to add image',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/gallery', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData: APIError = await response
          .json()
          .catch(() => ({ error: 'Failed to delete image' }));
        throw new Error(errorData.error || 'Failed to delete image');
      }

      setGalleryImages(galleryImages.filter((image) => image.id !== id));

      toast({
        title: 'Success',
        description: 'Image deleted successfully',
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to delete image',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Image</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddImage}>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="galleryImage">Gallery Image</Label>
              <Input
                id="galleryImage"
                type="file"
                accept="image/*"
                ref={imageFileInputRef}
                disabled={isSubmitting}
              />
            </div>
            <Button disabled={isSubmitting} type="submit" className="mt-4">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Add Image'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          {galleryImages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No images uploaded yet.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image, index) => (
                <div key={image.id} className="p-4 border rounded">
                  <h3 className="font-semibold">Image {index + 1}</h3>
                  <div className="relative aspect-video mt-2">
                    <Image
                      src={image.image}
                      alt={`Gallery Image ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isSubmitting}
                      onClick={() => handleDeleteImage(image.id)}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
