'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Loader2, Trash, Plus, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDashboardContext } from '../DashboardContext/DasboardContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  offerPrice: number | null;
  imageUrl: string;
}

export default function ProductGallery() {
  const { products, setProducts } = useDashboardContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Simulating loading of products
    setTimeout(() => setIsLoading(false), 200);
  }, []);

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleAddProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = (form.elements.namedItem('productName') as HTMLInputElement)
      .value;
    const description = (
      form.elements.namedItem('productDescription') as HTMLTextAreaElement
    ).value;
    const price = parseFloat(
      (form.elements.namedItem('productPrice') as HTMLInputElement).value,
    );
    const offerPrice =
      parseFloat(
        (form.elements.namedItem('productOfferPrice') as HTMLInputElement)
          .value,
      ) || null;
    const imageFile = (
      form.elements.namedItem('productImage') as HTMLInputElement
    ).files?.[0];

    try {
      setIsSubmitting(true);
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile);
      }

      const response = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'product',
          data: { name, description, price, offerPrice, imageUrl },
        }),
      });
      if (!response.ok) throw new Error('Failed to add product');
      const newProduct = await response.json();
      setProducts([...products, newProduct]);
      form.reset();
      toast({
        title: 'Success',
        description: 'Product added successfully',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to add product',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProduct = async (product: Product) => {
    try {
      setIsSubmitting(true);
      let imageUrl = product.imageUrl;
      if (fileInputRef.current?.files?.[0]) {
        imageUrl = await handleImageUpload(fileInputRef.current.files[0]);
      }

      const response = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'product',
          id: product.id,
          data: { ...product, imageUrl },
        }),
      });
      if (!response.ok) throw new Error('Failed to update product');
      const updatedProduct = await response.json();
      setProducts(
        products.map((item) =>
          item.id === product.id ? updatedProduct : item,
        ),
      );
      setEditingItem(null);
      setIsEditModalOpen(false);
      toast({
        title: 'Success',
        description: 'Product updated successfully',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update product',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/cms', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'product', id }),
      });
      if (!response.ok) throw new Error('Failed to delete product');
      setProducts(products.filter((product) => product.id !== id));
      toast({
        title: 'Success',
        description: 'Product deleted successfully',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete product',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="h-12 w-12 text-primary" />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 "
    >
      <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="border-b bg-white/50 backdrop-blur-sm">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Add New Product
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="productDescription">Product Description</Label>
                <Textarea
                  id="productDescription"
                  placeholder="Enter product description"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="flex-1">
                  <Label htmlFor="productPrice">Product Price</Label>
                  <Input
                    id="productPrice"
                    type="number"
                    step="0.01"
                    placeholder="Enter product price"
                    required
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="productOfferPrice">
                    Offer Price (optional)
                  </Label>
                  <Input
                    id="productOfferPrice"
                    type="number"
                    step="0.01"
                    placeholder="Enter offer price (if applicable)"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="productImage">Product Image</Label>
                <Input
                  id="productImage"
                  type="file"
                  accept="image/*"
                  required
                />
              </div>
            </div>
            <Button disabled={isSubmitting} type="submit" className="">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Product...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle>Existing Products</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-gray-500"
            >
              <Package className="mb-4 h-16 w-16" />
              <p className="text-lg font-medium">No products added yet</p>
              <p className="text-sm">Add your first product to get started</p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence>
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative aspect-video">
                          <Image
                            src={product.imageUrl || '/placeholder.svg'}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold truncate">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                            {product.description}
                          </p>
                          <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-lg font-bold">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.offerPrice && (
                              <span className="text-sm text-green-600 line-through">
                                ${product.offerPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() => {
                                setEditingItem(product);
                                setIsEditModalOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditProduct(editingItem);
              }}
            >
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="editProductName">Product Name</Label>
                  <Input
                    id="editProductName"
                    value={editingItem.name}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="editProductDescription">
                    Product Description
                  </Label>
                  <Textarea
                    id="editProductDescription"
                    value={editingItem.description}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="editProductPrice">Product Price</Label>
                    <Input
                      id="editProductPrice"
                      type="number"
                      step="0.01"
                      value={editingItem.price}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          price: parseFloat(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="editProductOfferPrice">
                      Offer Price (optional)
                    </Label>
                    <Input
                      id="editProductOfferPrice"
                      type="number"
                      step="0.01"
                      value={editingItem.offerPrice || ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          offerPrice: e.target.value
                            ? parseFloat(e.target.value)
                            : null,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="editProductImage">Product Image</Label>
                  <Input
                    id="editProductImage"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                  />
                </div>

                {editingItem.imageUrl && (
                  <div className="relative aspect-video w-full">
                    <Image
                      src={editingItem.imageUrl}
                      alt={editingItem.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              <DialogFooter className="mt-4">
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Save changes'
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
