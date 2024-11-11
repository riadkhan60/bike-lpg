'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Loader2, Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

type FormData = {
  sectionId: string;
  name: string;
  description: string;
  imageUrl: string;
  active: boolean;
};

export default function CreateSectionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/sections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          active: Boolean(data.active), // Ensure active is a boolean
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create section');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex   gap-2">
        <Card className="w-full max-w-lg ">
          <CardHeader>
            <CardTitle>Create New Section</CardTitle>
            <CardDescription>Add a new section to your project</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sectionId">Section ID</Label>
                <Input
                  id="sectionId"
                  {...register('sectionId', {
                    required: 'Section ID is required',
                  })}
                  placeholder="Enter section ID"
                />
                {errors.sectionId && (
                  <p className="text-sm text-red-500">
                    {errors.sectionId.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  placeholder="Enter section name"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Enter section description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  {...register('imageUrl')}
                  placeholder="Enter image URL (optional)"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="active" {...register('active')} defaultChecked />
                <Label htmlFor="active">Active</Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || true}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                Create Section
              </Button>
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            </CardFooter>
          </form>
        </Card>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg"
          >
            Section created successfully!
            <button
              onClick={() => setIsSuccess(false)}
              className="ml-2 text-white hover:text-gray-200"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
        <Card className="flex flex-col gap-4 p-6">
          <h2 className=" text-2xl font-bold">
            This section is for the developer only
          </h2>
          <p className="max-w-[500px] text-red-500 font-medium">
            This section is developed for developing purpose. {"Don't"} use it
            under any circumstances until you know what you are doing.
          </p>
          <Image
            src={'https://i.imgur.com/NPxlrPJ.png'}
            alt="dev"
            width={500}
            height={500}
            priority
          />
        </Card>
      </div>
    </motion.div>
  );
}
