'use client';
import React from 'react';
import SectionImages from './SectionImages';
import GallerySection from './GalleyImages';
import { motion} from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import UploadSection from './UploadSection';
export default function Gallery() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Tabs defaultValue="Image Manager">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-8 text-gray-800  pb-4">
            Manage images
          </h2>
          <TabsList className="grid bg-black max-w-[600px] grid-cols-3">
            <TabsTrigger className="text-white" value="Gallery">
              Gallery
            </TabsTrigger>
            <TabsTrigger className="text-white" value="Image Manager">
              Image Manager
            </TabsTrigger>
            <TabsTrigger className="text-white" value="Upload New Section">
              Upload New Section
            </TabsTrigger>
          </TabsList>
        </Card>

        <TabsContent value="Gallery">
          <GallerySection />
        </TabsContent>
        <TabsContent value="Image Manager">
          <SectionImages />
        </TabsContent>
        <TabsContent value="Upload New Section">
          <UploadSection />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
