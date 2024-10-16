'use client';

import { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  FileQuestion,
  Video,
  Package,
  // Plus,
  Edit,
  Trash,
  MoveUp,
  MoveDown,
  // Upload,
  Loader2,
  Image as ImageIcon,
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from '@/components/ui/dialog';
import { SignedIn, UserButton } from '@clerk/nextjs';
import Image from 'next/image';

interface QA {
  id: string;
  question: string;
  answer: string;
}

interface VideoLink {
  id: string;
  title: string;
  url: string;
  order: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface Banner {
  id: string;
  largeScreenUrl: string;
  smallScreenUrl: string;
}

export default function CMSAdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [qas, setQAs] = useState<QA[]>([]);
  const [videoLinks, setVideoLinks] = useState<VideoLink[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<
    QA | Product | VideoLink | Banner | null
  >(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const largeScreenFileInputRef = useRef<HTMLInputElement>(null);
  const smallScreenFileInputRef = useRef<HTMLInputElement>(null);

  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/cms');
      const data = await response.json();
      setQAs(data.qas);
      setVideoLinks(data.videoLinks);
      setProducts(data.products);
      setBanners(data.banners || []);
    } catch {
      toast({
        title: 'Error',
        description: `Failed to fetch data`,
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  // Bannnnerrrrrrrrrrrrrrrrrrrrrrrrrr
  const handleAddBanner = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const largeScreenFile = (
      form.elements.namedItem('largeScreenBanner') as HTMLInputElement
    ).files?.[0];
    const smallScreenFile = (
      form.elements.namedItem('smallScreenBanner') as HTMLInputElement
    ).files?.[0];

    try {
      setIsSubmitting(true);
      let largeScreenUrl = '';
      let smallScreenUrl = '';

      if (largeScreenFile) {
        largeScreenUrl = await handleImageUpload(largeScreenFile);
      }
      if (smallScreenFile) {
        smallScreenUrl = await handleImageUpload(smallScreenFile);
      }

      const response = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'banner',
          data: { largeScreenUrl, smallScreenUrl },
        }),
      });

      if (!response.ok) throw new Error('Failed to add banner');
      const newBanner = await response.json();
      setBanners([...banners, newBanner]);
      form.reset();
      toast({
        title: 'Success',
        description: 'Banner added successfully',
      });
      setIsSubmitting(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to add banner',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  const handleEditBanner = async (banner: Banner) => {
    try {
      setIsSubmitting(true);
      let largeScreenUrl = banner.largeScreenUrl;
      let smallScreenUrl = banner.smallScreenUrl;

      if (largeScreenFileInputRef.current?.files?.[0]) {
        largeScreenUrl = await handleImageUpload(
          largeScreenFileInputRef.current.files[0],
        );
      }
      if (smallScreenFileInputRef.current?.files?.[0]) {
        smallScreenUrl = await handleImageUpload(
          smallScreenFileInputRef.current.files[0],
        );
      }

      const response = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'banner',
          id: banner.id,
          data: { largeScreenUrl, smallScreenUrl },
        }),
      });
      if (!response.ok) throw new Error('Failed to update banner');
      const updatedBanner = await response.json();
      setBanners(
        banners.map((item) => (item.id === banner.id ? updatedBanner : item)),
      );
      setEditingItem(null);
      setIsEditModalOpen(false);
      toast({
        title: 'Success',
        description: 'Banner updated successfully',
      });
      setIsSubmitting(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update banner',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  const handleDeleteBanner = async (id: string) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/cms', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'banner', id }),
      });
      if (!response.ok) throw new Error('Failed to delete banner');
      setBanners(banners.filter((banner) => banner.id !== id));
      toast({
        title: 'Success',
        description: 'Banner deleted successfully',
      });
      setIsSubmitting(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete banner',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };
  // Bannnnnnerrrrrrrrrrrrrrrrrrrr

  const handleAddQA = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const question = (form.elements.namedItem('question') as HTMLInputElement)
      .value;
    const answer = (form.elements.namedItem('answer') as HTMLInputElement)
      .value;
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'qa', data: { question, answer } }),
      });
      
      if (!response.ok) throw new Error('Failed to add Q&A');
      const newQA = await response.json();
      setQAs([...qas, newQA]);
      form.reset();
      toast({
        title: 'Success',
        description: 'Q&A added successfully',
      });
      setIsSubmitting(false);
    } catch {
      toast({
        title: 'Error',
        description: `Failed to add Q&A `,
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  const handleEditQA = async (qa: QA) => {
    try {
      setIsEditModalOpen(true);
      const response = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'qa', id: qa.id, data: qa }),
      });
      if (!response.ok) throw new Error('Failed to update Q&A');
      const updatedQA = await response.json();
      setQAs(qas.map((item) => (item.id === qa.id ? updatedQA : item)));
      setEditingItem(null);
      setIsEditModalOpen(false);
      toast({
        title: 'Success',
        description: 'Q&A updated successfully',
      });
      setIsSubmitting(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update Q&A',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  const handleDeleteQA = async (id: string) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/cms', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'qa', id }),
      });
      if (!response.ok) throw new Error('Failed to delete Q&A');
      setQAs(qas.filter((qa) => qa.id !== id));
      toast({
        title: 'Success',
        description: 'Q&A deleted successfully',
      });
      setIsSubmitting(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete Q&A',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  const handleAddVideoLink = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const title = (form.elements.namedItem('videoTitle') as HTMLInputElement)
      .value;
    const url = (form.elements.namedItem('videoUrl') as HTMLInputElement).value;
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'videoLink', data: { title, url } }),
      });
      if (!response.ok) throw new Error('Failed to add video link');
      const newVideoLink = await response.json();
      setVideoLinks([...videoLinks, newVideoLink]);
      form.reset();
      toast({
        title: 'Success',
        description: 'Video link added successfully',
      });
      setIsSubmitting(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to add video link',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  const handleEditVideoLink = async (videoLink: VideoLink) => {
    try {
      setIsEditModalOpen(true);
      const response = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'videoLink',
          id: videoLink.id,
          data: { title: videoLink.title, url: videoLink.url },
        }),
      });
      if (!response.ok) throw new Error('Failed to update video link');
      const updatedVideoLink = await response.json();
      setVideoLinks(
        videoLinks.map((link) =>
          link.id === videoLink.id ? updatedVideoLink : link,
        ),
      );
      setEditingItem(null);
      setIsEditModalOpen(false);
      toast({
        title: 'Success',
        description: 'Video link updated successfully',
      });
      setIsSubmitting(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update video link',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  const handleDeleteVideoLink = async (id: string) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/cms', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'videoLink', id }),
      });
      if (!response.ok) throw new Error('Failed to delete video link');
      setVideoLinks(videoLinks.filter((link) => link.id !== id));
      toast({
        title: 'Success',
        description: 'Video link deleted successfully',
      });
      setIsSubmitting(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete video link',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  const handleMoveVideoLink = async (id: string, direction: 'up' | 'down') => {
    const index = videoLinks.findIndex((link) => link.id === id);
    if (
      (direction === 'up' && index > 0) ||
      (direction === 'down' && index < videoLinks.length - 1)
    ) {
      const newLinks = [...videoLinks];
      const temp = newLinks[index];
      newLinks[index] = newLinks[index + (direction === 'up' ? -1 : 1)];
      newLinks[index + (direction === 'up' ? -1 : 1)] = temp;

      try {
        await Promise.all(
          newLinks.map((link, i) =>
            fetch('/api/cms', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'videoLink',
                id: link.id,
                data: { order: i },
              }),
            }),
          ),
        );
        setVideoLinks(newLinks);
      } catch {
        toast({
          title: 'Error',
          description: 'Failed to reorder video links',
          variant: 'destructive',
        });
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = async (result: any) => {
    if (!result.destination) return;
    const items = Array.from(videoLinks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    try {
      await Promise.all(
        items.map((link, i) =>
          fetch('/api/cms', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'videoLink',
              id: link.id,
              data: { order: i },
            }),
          }),
        ),
      );
      setVideoLinks(items);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to reorder video links',
        variant: 'destructive',
      });
    }
  };

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
          data: { name, description, price, imageUrl },
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
      setIsSubmitting(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to add product',
        variant: 'destructive',
      });
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
      setIsSubmitting(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update product',
        variant: 'destructive',
      });
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
      setIsSubmitting(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete product',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'qa', label: 'Q&A', icon: FileQuestion },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'banners', label: 'Banners', icon: ImageIcon },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="mr-2 h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white p-4">
        <h1 className="text-2xl font-bold mb-6">Hello, Admin 👋</h1>
        <div className=" bg-gray-200 mb-5 flex items-center justify-center rounded-full w-10 h-10">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <nav>
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-start mb-2 ${
                activeTab === item.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            {sidebarItems.map((item) => (
              <TabsTrigger key={item.id} value={item.id}>
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="dashboard">
            <Card>
              <CardHeader>
                <CardTitle>Welcome to your CMS Dashboard</CardTitle>
                <CardDescription>
                  Manage your content from here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Select a tab to manage Q&A, Videos, or Products.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="qa">
            <Card>
              <CardHeader>
                <CardTitle>Add New Q&A</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddQA}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="question">Question</Label>
                      <Input id="question" placeholder="Enter the question" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="answer">Answer</Label>
                      <Textarea id="answer" placeholder="Enter the answer" />
                    </div>
                  </div>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="mt-4"
                  >
                    Add Q&A
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Existing Q&As</CardTitle>
              </CardHeader>
              <CardContent>
                {qas.map((qa) => (
                  <div key={qa.id} className="mb-4 p-4 border rounded">
                    <h3 className="font-semibold">{qa.question}</h3>
                    <p>{qa.answer}</p>
                    <div className="mt-2 flex space-x-2">
                      <Button
                        size="sm"
                        disabled={isSubmitting}
                        variant="outline"
                        onClick={() => {
                          setEditingItem(qa);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={isSubmitting}
                        onClick={() => handleDeleteQA(qa.id)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="videos">
            <Card>
              <CardHeader>
                <CardTitle>Manage Video Links</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddVideoLink} className="mb-6">
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="videoTitle">Video Title</Label>
                      <Input id="videoTitle" placeholder="Enter video title" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="videoUrl">Video URL</Label>
                      <Input id="videoUrl" placeholder="Enter video URL" />
                    </div>
                  </div>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="mt-4"
                  >
                    Add Video Link
                  </Button>
                </form>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="videoLinks">
                    {(provided) => (
                      <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {videoLinks.map((link, index) => (
                          <Draggable
                            key={link.id}
                            draggableId={link.id}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-4"
                              >
                                <Card>
                                  <CardContent className="flex justify-between items-center p-4">
                                    <div>
                                      <h3 className="font-semibold">
                                        {link.title}
                                      </h3>
                                      <p className="text-sm text-gray-500">
                                        {link.url}
                                      </p>
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                          handleMoveVideoLink(link.id, 'up')
                                        }
                                      >
                                        <MoveUp className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                          handleMoveVideoLink(link.id, 'down')
                                        }
                                      >
                                        <MoveDown className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        disabled={isSubmitting}
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                          setEditingItem(link);
                                          setIsEditModalOpen(true);
                                        }}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        disabled={isSubmitting}
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                          handleDeleteVideoLink(link.id)
                                        }
                                      >
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="products">
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
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="productDescription">
                        Product Description
                      </Label>
                      <Textarea
                        id="productDescription"
                        placeholder="Enter product description"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="productPrice">Product Price</Label>
                      <Input
                        id="productPrice"
                        type="number"
                        step="0.01"
                        placeholder="Enter product price"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="productImage">Product Image</Label>
                      <Input id="productImage" type="file" accept="image/*" />
                    </div>
                  </div>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="mt-4"
                  >
                    Add Product
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Existing Products</CardTitle>
              </CardHeader>
              <CardContent>
                {products.map((product) => (
                  <div key={product.id} className="mb-4 p-4 border rounded">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="font-bold mt-2">
                      ${product.price.toFixed(2)}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="banners">
            <Card>
              <CardHeader>
                <CardTitle>Add New Banner</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddBanner}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="largeScreenBanner">
                        Large Screen Banner
                      </Label>
                      <Input
                        id="largeScreenBanner"
                        type="file"
                        accept="image/*"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="smallScreenBanner">
                        Small Screen Banner
                      </Label>
                      <Input
                        id="smallScreenBanner"
                        type="file"
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="mt-4"
                  >
                    Add Banner
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Existing Banners</CardTitle>
              </CardHeader>
              <CardContent>
                {banners.map((banner, index) => (
                  <div key={banner.id} className="mb-4 p-4 border rounded">
                    <h3 className="font-semibold">Banner {index +1}</h3>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-bold">Large Screen:</p>
                        <Image
                          src={banner.largeScreenUrl}
                          alt="Large Screen Banner"
                          width={400}
                          height={200}
                          className="mt-2 max-w-xs"
                        />
                      </div>
                      <div>
                        <p className="font-bold">Small Screen:</p>
                        <Image
                          src={banner.smallScreenUrl}
                          alt="Small Screen Banner"
                          width={200}
                          height={200}
                          className="mt-2 max-w-xs"
                        />
                      </div>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingItem(banner);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        disabled={isSubmitting}
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteBanner(banner.id)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit{' '}
              {editingItem
                ? 'name' in editingItem
                  ? 'Product'
                  : 'question' in editingItem
                  ? 'Q&A'
                  : 'title' in editingItem
                  ? 'Video Link'
                  : 'Banner'
                : ''}
            </DialogTitle>
          </DialogHeader>
          {editingItem && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if ('name' in editingItem) {
                  handleEditProduct(editingItem as Product);
                } else if ('question' in editingItem) {
                  handleEditQA(editingItem as QA);
                } else if ('title' in editingItem) {
                  handleEditVideoLink(editingItem as VideoLink);
                } else {
                  handleEditBanner(editingItem as Banner);
                }
              }}
            >
              {'name' in editingItem ? (
                <>
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
                      />
                    </div>
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
                      />
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
                        className="mt-2 max-w-xs"
                        width={400}
                        height={400}
                      />
                    )}
                  </div>
                </>
              ) : 'question' in editingItem ? (
                <>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="editQuestion">Question</Label>
                      <Input
                        id="editQuestion"
                        value={editingItem.question}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            question: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="editAnswer">Answer</Label>
                      <Textarea
                        id="editAnswer"
                        value={editingItem.answer}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            answer: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </>
              ) : 'title' in editingItem ? (
                <>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="editVideoTitle">Video Title</Label>
                      <Input
                        id="editVideoTitle"
                        value={editingItem.title}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="editVideoUrl">Video URL</Label>
                      <Input
                        id="editVideoUrl"
                        value={editingItem.url}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            url: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="editLargeScreenBanner">
                        Large Screen Banner
                      </Label>
                      <Input
                        id="editLargeScreenBanner"
                        type="file"
                        accept="image/*"
                        ref={largeScreenFileInputRef}
                      />
                      {editingItem.largeScreenUrl && (
                        <Image
                          src={editingItem.largeScreenUrl}
                          alt="Large Screen Banner"
                          width={400}
                          height={200}
                          className="mt-2 max-w-xs"
                        />
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="editSmallScreenBanner">
                        Small Screen Banner
                      </Label>
                      <Input
                        id="editSmallScreenBanner"
                        type="file"
                        accept="image/*"
                        ref={smallScreenFileInputRef}
                      />
                      {editingItem.smallScreenUrl && (
                        <Image
                          src={editingItem.smallScreenUrl}
                          alt="Small Screen Banner"
                          width={200}
                          height={200}
                          className="mt-2 max-w-xs"
                        />
                      )}
                    </div>
                  </div>
                </>
              )}
              <DialogFooter className="mt-4">
                <Button disabled={isSubmitting} type="submit">
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
