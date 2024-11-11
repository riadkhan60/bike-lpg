import BikeLPGProducts from '@/components/BikeLPG/BikeLPGProducts';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
  description:
    "Discover Bike LPG's top-rated bike conversion kits for LPG in Bangladesh. Reliable, efficient, and eco-friendly - with nationwide dealer support.",
};

export default function page() {
  return (
    <div>
      <BikeLPGProducts />
    </div>
  );
}
