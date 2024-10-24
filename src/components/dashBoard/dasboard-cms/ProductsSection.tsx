'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Edit, Loader2, Trash } from 'lucide-react';
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
import { useDashboardContext } from './DashboardContext/DasboardContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  offerPrice: number | null;
  imageUrl: string;
}

export default function Component() {
  const { products, setProducts } = useDashboardContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      ) || 0;
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

      const offerPrice = product.offerPrice || 0;

      const response = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'product',
          id: product.id,
          data: { ...product, offerPrice, imageUrl },
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddProduct}>
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="productPrice">Product Price</Label>
                <Input
                  id="productPrice"
                  type="number"
                  step="0.01"
                  placeholder="Enter product price"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
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
            <Button disabled={isSubmitting} type="submit" className="mt-4">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Add Product'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Products</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No products uploaded yet.
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="mb-4 p-4 border rounded">
                <h3 className="font-semibold">{product.name}</h3>
                <p>{product.description}</p>
                <p className="font-bold mt-2">
                  ${product.price.toFixed(2)}
                  {product.offerPrice && (
                    <span className="ml-2 text-green-600">
                      Offer: ${product.offerPrice.toFixed(2)}
                    </span>
                  )}
                </p>
                {product.imageUrl && (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="mt-2 max-w-xs"
                  />
                )}
                <div className="mt-2 flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
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
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))
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
                <div className='flex gap-2 justify-between my-2'>
                  <div className="flex flex-col space-y-1.5">
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
                  <div className="flex flex-col space-y-1.5">
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
                  <Image
                    src={editingItem.imageUrl}
                    alt={editingItem.name}
                    width={400}
                    height={400}
                    className="mt-2 max-h-[200px] object-cover max-w-xs"
                  />
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
    </div>
  );
}
