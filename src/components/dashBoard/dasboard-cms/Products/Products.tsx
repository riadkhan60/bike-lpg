'use client';
import React from 'react';

import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import FeaturedProductEditor from './FeaturedProduct';
import ProductGallery from './ProductsSection';

export default function Products() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Tabs defaultValue="Products List">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-8 text-gray-800  pb-4">
            Manage products
          </h2>
          <TabsList className="grid bg-black max-w-[400px] grid-cols-2">
            <TabsTrigger className="text-white" value="Products List">
              Products List
            </TabsTrigger>
            <TabsTrigger className="text-white" value="Featured Product">
              Featured Product
            </TabsTrigger>
          </TabsList>
        </Card>

        <TabsContent value="Products List">
          <ProductGallery/>
        </TabsContent>
        <TabsContent value="Featured Product">
          <FeaturedProductEditor />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
