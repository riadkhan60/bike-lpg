'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Container from '../LocalUi/container/Container';
import {  currencyFormatter } from '@/lib/currencyFormater';

interface Product {
  id: number;
  name: string;
  price: number;
  offerPrice: number;
  image: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const discount = Math.round(
    ((product.price - product.offerPrice) / product.price) * 100,
  );

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative h-56 w-full">
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
            />
            <Badge className="absolute top-2 right-2 bg-[#FF9900] text-primary-foreground">
              {discount}% OFF
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-[20px] text-[#525252] font-bold ">
              { currencyFormatter(product.offerPrice)}
            </span>
            <span className="text-sm text-gray-500 line-through">
              { currencyFormatter(product.price)}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full ">
            <ShoppingCart className="mr-2 h-4 w-4" /> Order now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default function BikeLPGProducts() {
  const products: Product[] = [
    {
      id: 1,
      name: 'EcoRide LPG Conversion Kit',
      price: 15000,
      offerPrice: 12999,
      image: '/product.webp',
    },
    {
      id: 2,
      name: 'GreenFuel Pro Converter',
      price: 18000,
      offerPrice: 15499,
      image: '/product2.jpg',
    },
    {
      id: 3,
      name: 'BikeGas Eco-Saver Kit',
      price: 13500,
      offerPrice: 11999,
      image: '/product3.jpg',
    },
    {
      id: 4,
      name: 'CleanRide LPG System',
      price: 16500,
      offerPrice: 14299,
      image: '/product3.jpg',
    },
    {
      id: 5,
      name: 'EcoMoto Conversion Package',
      price: 17000,
      offerPrice: 14799,
      image: '/product.webp',
    },
    {
      id: 6,
      name: 'GreenWheel LPG Adapter',
      price: 14500,
      offerPrice: 12599,
      image: '/product2.jpg',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-primary">
              Our Bike LPG Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our range of eco-friendly LPG conversion kits for your
              bike. Save money and reduce emissions with our innovative
              products.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
