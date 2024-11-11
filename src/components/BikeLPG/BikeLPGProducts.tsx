'use client';

import React, { useEffect, useState } from 'react';
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
import { ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import Container from '../LocalUi/container/Container';
import { currencyFormatter } from '@/lib/currencyFormater';
import { Skeleton } from '@/components/ui/skeleton';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  offerPrice: number | null;
  imageUrl: string;
}

interface ContactData {
  id?: string;
  companyId: string;
  phone?: string;
  email?: string;
  location?: string;
  facebook?: string;
  whatsapp?: string;
  tiktok?: string;
  youtube?: string;
  instagram?: string;
  linkedin?: string;
}

const ProductCardSkeleton = () => (
  <Card className="overflow-hidden h-[600px]">
    <CardHeader className="p-0">
      <div className="relative h-56 w-full">
        <Skeleton className="h-full w-full" />
      </div>
    </CardHeader>
    <CardContent className="p-4">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <div className="flex items-center space-x-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    </CardContent>
    <CardFooter className="p-4 pt-0">
      <Skeleton className="h-10 w-full" />
    </CardFooter>
  </Card>
);

const truncateWords = (text: string, wordCount: number) => {
  const words = text.split(' ');
  if (words.length <= wordCount) return text;
  return words.slice(0, wordCount).join(' ') + '...';
};

const ProductDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const truncatedText = truncateWords(description, 20);
  const needsExpansion = description.length > truncatedText.length;

  if (!description || description.trim() === '') return null;

  return (
    <motion.div
      className="mt-2"
      initial={false}
      animate={{ height: isExpanded ? 'auto' : '120px' }}
      transition={{ duration: 0.3 }}
    >
      <motion.p
        className="text-sm text-gray-600"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isExpanded ? description : truncatedText}
      </motion.p>
      {needsExpansion && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-1 h-6 p-0 text-primary hover:bg-transparent"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <motion.span
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? (
              <>
                Read Less <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Read More <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </motion.span>
        </Button>
      )}
    </motion.div>
  );
};

const ProductCard: React.FC<{ product: Product; contacts: string }> = ({
  product,
  contacts,
}) => {
  const hasOffer =
    product.offerPrice !== null && product.offerPrice < product.price;
  const discount = hasOffer
    ? Math.round(((product.price - product.offerPrice!) / product.price) * 100)
    : 0;

  const shouldShowDescription = product.name !== product.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="relative h-56 w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
            {hasOffer && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="absolute top-2 right-2 bg-[#FF9900] text-primary-foreground">
                  {discount}% OFF
                </Badge>
              </motion.div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
          {shouldShowDescription && (
            <ProductDescription description={product.description} />
          )}
          <motion.div
            className="flex items-center space-x-2 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-[20px] text-[#525252] font-bold">
              {currencyFormatter(
                hasOffer ? product.offerPrice! : product.price,
              )}
            </span>
            {hasOffer && (
              <span className="text-sm text-gray-500 line-through">
                {currencyFormatter(product.price)}
              </span>
            )}
          </motion.div>
        </CardContent>
        <CardFooter className="p-4">
          <motion.div
            className="w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <a
              href={`https://wa.me/${contacts}?text=Hello,%20I'm%20interested%20in%20your%20services.%20Please%20tell%20me%20more%20about%20${product.name}`}
            >
              <Button className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" /> Order now
              </Button>
            </a>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default function BikeLPGProducts() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [contacts, setContacts] = useState({} as ContactData);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/contacts');
        const data = await response.json();
        setContacts(data[2]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/cms');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <motion.h2
              className="text-5xl max-md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#7a462a] to-[#FF9900]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Our Bike LPG Products
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Discover our range of eco-friendly LPG conversion kits for your
              bike. Save money and reduce emissions with our innovative
              products.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div key={`skeleton-${index}`}>
                      <ProductCardSkeleton />
                    </div>
                  ))
              : products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard
                      contacts={contacts?.whatsapp || '8801632102050'}
                      product={product}
                    />
                  </motion.div>
                ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
