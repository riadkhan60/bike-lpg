'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Package } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  features: Feature[];
}

export default function FeaturedProductEditor() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [product, setProduct] = useState<Product>({
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    features: Array(4).fill({ title: '', description: '' }),
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/api/feature-product', { cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: 'Error',
          description: 'Failed to load product data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (
    index: number,
    field: 'title' | 'description',
    value: string,
  ) => {
    setProduct((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) =>
        i === index ? { ...feature, [field]: value } : feature,
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/feature-product', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Failed to update product');
      const updatedProduct = await response.json();
      setProduct(updatedProduct);
      toast({
        title: 'Success',
        description: 'Product updated successfully',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to update product',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full "
    >
      <Card className="w-full">
        <CardHeader className="border-b rounded-t-xl bg-muted">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Edit Featured Product
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Product Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={product.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Product Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                  required
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Features</h3>
              {product.features.map((feature, index) => (
                <Card key={index} className="bg-muted">
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`feature-title-${index}`}>
                        Feature {index + 1} Title
                      </Label>
                      <Input
                        id={`feature-title-${index}`}
                        value={feature.title}
                        onChange={(e) =>
                          handleFeatureChange(index, 'title', e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`feature-description-${index}`}>
                        Feature {index + 1} Description
                      </Label>
                      <Textarea
                        id={`feature-description-${index}`}
                        value={feature.description}
                        onChange={(e) =>
                          handleFeatureChange(
                            index,
                            'description',
                            e.target.value,
                          )
                        }
                        required
                        className="min-h-[100px]"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button disabled={isSubmitting} type="submit" className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Product...
                </>
              ) : (
                'Update Product'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
