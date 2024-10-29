'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { InfiniteMovingCards } from './InfinityGallery/InfinityGallery';

interface Image {
  id: string;
  image: string;
}

const LoadingSkeleton = () => (
  <div className="w-full overflow-hidden relative">
    <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-900 to-transparent z-10" />
    <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-900 to-transparent z-10" />

    <div className="flex gap-4 animate-scroll">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="relative flex-shrink-0 rounded-lg overflow-hidden"
        >
          <div className="w-72 h-48 bg-gray-800 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent animate-shimmer" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function ScrollGallery() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getImages() {
      try {
        setLoading(true);
        const response = await fetch('/api/gallery');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const responseData = await response.json();
        if (Array.isArray(responseData) && responseData.length > 0) {
          setImages(responseData);
        } else {
          throw new Error('No images available');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load images');
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
            className="text-3xl font-bold mb-8 text-white text-center"
          >
            Explore Our Gallery
          </motion.h2>
          <LoadingSkeleton />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-36">
            <div className="text-white bg-red-500/10 p-4 rounded-lg">
              {error}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-36">
            <div className="text-white bg-gray-800 p-4 rounded-lg">
              No images available
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#171717] overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          className="text-3xl font-bold mb-8 text-white text-center"
        >
          Explore Our Gallery
        </motion.h2>
      </div>
      <div className="flex justify-center w-full">
        <InfiniteMovingCards items={images} direction="left" speed="slow" />
      </div>
    </section>
  );
}
