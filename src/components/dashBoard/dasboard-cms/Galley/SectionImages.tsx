'use client';

import React, { useState, ChangeEvent, useEffect } from 'react';
import { Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ImageSection {
  sectionId: string;
  name: string;
  image: File | null;
  preview: string | null;
  description: string;
  imageUrl: string | null;
}

interface SectionsState {
  [key: string]: ImageSection;
}

interface ApiResponse {
  sectionId: string;
  imageUrl: string | null;
}

interface UploadResponse {
  url: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const SectionImages: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState<SectionsState>({
    fillingStationSection: {
      sectionId: 'fillingStationSection',
      name: 'Filling Station Section',
      image: null,
      preview: null,
      imageUrl: null,
      description: 'Main image for the filling station section',
    },
    fillingStationCard: {
      sectionId: 'fillingStationCard',
      name: 'Filling Station Card',
      image: null,
      preview: null,
      imageUrl: null,
      description: 'Image for the filling station card',
    },
    designHouseCard: {
      sectionId: 'designHouseCard',
      name: 'Design House Card',
      image: null,
      preview: null,
      imageUrl: null,
      description: 'Image for the design house card',
    },
    bikeLpgCard: {
      sectionId: 'bikeLpgCard',
      name: 'Bike LPG Card',
      image: null,
      preview: null,
      imageUrl: null,
      description: 'Image for the bike LPG card',
    },
    clientImageOne: {
      sectionId: 'clientImageOne',
      name: 'Client Image One',
      image: null,
      preview: null,
      imageUrl: null,
      description: 'First client testimonial image',
    },
    clientImageTwo: {
      sectionId: 'clientImageTwo',
      name: 'Client Image Two',
      image: null,
      preview: null,
      imageUrl: null,
      description: 'Second client testimonial image',
    },
    clientImageThree: {
      sectionId: 'clientImageThree',
      name: 'Client Image Three',
      image: null,
      preview: null,
      imageUrl: null,
      description: 'Third client testimonial image',
    },
    clientImageFour: {
      sectionId: 'clientImageFour',
      name: 'Client Image Four',
      image: null,
      preview: null,
      imageUrl: null,
      description: 'Fourth client testimonial image',
    },
    ownerImage: {
      sectionId: 'ownerImage',
      name: 'Owner Image',
      image: null,
      preview: null,
      imageUrl: null,
      description: 'Image of the business owner',
    },
    officePicture: {
      sectionId: 'officePicture',
      name: 'Office Picture',
      image: null,
      preview: null,
      imageUrl: null,
      description: 'Image of the office premises',
    },
    featureProductPicture: {
      sectionId: 'featureProductPicture',
      name: 'Feature Product Picture',
      image: null,
      preview: null,
      imageUrl: null,
      description: 'Image highlighting featured products',
    },
    dealerSectionPicture: {
      sectionId: 'dealerSectionPicture',
      name: 'Dealer Section Picture',
      image: null,
      preview: null,
      imageUrl: null,
      description: 'Image for the dealer section',
    },
    furnitureOne: {
      sectionId: 'furnitureOne',
      name: 'Modern Living Room',
      image: null,
      preview: null,
      imageUrl: null,
      description: 'Interior Design',
    },
    furnitureTwo: {
      sectionId: 'furnitureTwo',
      name: 'Custom Dining Set',
      image: null,
      preview: null,
      imageUrl: null,
      description: 'Furniture Design',
    },
    furnitureThree: {
      sectionId: 'furnitureThree',
      name: 'Executive Office',
      image: null,
      preview: null,
      imageUrl: null,
      description: 'Commercial Space',
    },
    bannerBackgroudOne: {
      sectionId: 'bannerBackgroudOne',
      name: 'Ms Jannat Banner backgroud',
      image: null,
      preview: null,
      imageUrl: null,
      description: 'Image for the banner backgroud',
    },
    bannerBackgroudTwo: {
      sectionId: 'bannerBackgroudTwo',
      name: 'Bike Lpg Banner backgroud',
      image: null,
      preview: null,
      imageUrl: null,
      description: 'Image for the banner backgroud',
    },
  });

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch('/api/sections');
        if (!response.ok) throw new Error('Failed to fetch sections');

        const data = (await response.json()) as ApiResponse[];

        setSections((prevSections) => {
          const updatedSections = { ...prevSections };
          data.forEach((section) => {
            if (updatedSections[section.sectionId]) {
              updatedSections[section.sectionId] = {
                ...updatedSections[section.sectionId],
                imageUrl: section.imageUrl,
                preview: section.imageUrl,
              };
            }
          });
          return updatedSections;
        });
      } catch (error) {
        console.error('Error fetching sections:', error);
        toast({
          title: 'Error',
          description: 'Failed to load sections',
          variant: 'destructive',
        });
      }
    };

    fetchSections();
  }, [toast]);

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = (await response.json()) as UploadResponse;
    return data.url;
  };

  const handleImageChange = async (
    sectionId: string,
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const files = e.target.files;
    if (!files || !files[0]) return;

    const file = files[0];

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: 'Error',
        description: 'File size should be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please upload only image files',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);

      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);

      // Show preview immediately
      setSections((prev) => ({
        ...prev,
        [sectionId]: {
          ...prev[sectionId],
          image: file,
          preview: objectUrl,
        },
      }));

      // Upload image
      const imageUrl = await handleImageUpload(file);

      // Update section with new image URL
      const response = await fetch(`/api/sections/${sectionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (!response.ok) throw new Error('Failed to update section');

      const updatedSection = (await response.json()) as ApiResponse;

      setSections((prev) => ({
        ...prev,
        [sectionId]: {
          ...prev[sectionId],
          imageUrl: updatedSection.imageUrl,
          preview: updatedSection.imageUrl,
          image: null,
        },
      }));

      // Clean up the object URL
      URL.revokeObjectURL(objectUrl);

      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
    } catch (error) {
      console.error('Error updating image:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive',
      });

      // Revert preview on error
      setSections((prev) => ({
        ...prev,
        [sectionId]: {
          ...prev[sectionId],
          image: null,
          preview: prev[sectionId].imageUrl,
        },
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = async (sectionId: string): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/sections/${sectionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete image');

      setSections((prev) => ({
        ...prev,
        [sectionId]: {
          ...prev[sectionId],
          image: null,
          preview: null,
          imageUrl: null,
        },
      }));

      toast({
        title: 'Success',
        description: 'Image removed successfully',
      });
    } catch (error) {
      console.error('Error removing image:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove image',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (size: number): string => {
    return (size / 1024 / 1024).toFixed(2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <Card className="p-6 w-full mx-auto">
        <h1 className="text-2xl font-bold mb-6">Website Image Manager</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {Object.entries(sections).map(([sectionId, section]) => (
            <Card key={sectionId} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg">{section.name}</CardTitle>
                <p className="text-sm text-gray-500">{section.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {section.preview || section.imageUrl ? (
                    <div className="relative group">
                      <Image
                        width={510}
                        height={425}
                        src={section.preview || section.imageUrl || ''}
                        alt={`Preview for ${section.name}`}
                        className="w-full h-[300px] object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(sectionId)}
                        disabled={isLoading}
                        className="absolute top-2 right-2 p-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                        type="button"
                        aria-label="Remove image"
                      >
                        <Trash2 className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        No image selected
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-center">
                    <label
                      className={`flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-700 transition-colors ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <Upload className="h-5 w-5" />
                      {section.image ? 'Change Image' : 'Upload Image'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(sectionId, e)}
                        disabled={isLoading}
                      />
                    </label>
                  </div>

                  {section.image && (
                    <Alert>
                      <AlertDescription className="text-sm">
                        File: {section.image.name} (
                        {formatFileSize(section.image.size)}MB)
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default SectionImages;
