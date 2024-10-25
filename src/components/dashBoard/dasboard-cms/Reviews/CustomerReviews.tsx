'use client';

import { useState } from 'react';
import { Edit, Loader2, Star, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDashboardContext } from '../DashboardContext/DasboardContext';

interface Review {
  id: string;
  name: string;
  occupation: string;
  review: string;
}

export default function CustomerReviewsSection() {
  const { reviews, setReviews } = useDashboardContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<Review | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const occupation = (
      form.elements.namedItem('occupation') as HTMLInputElement
    ).value;
    const review = (form.elements.namedItem('review') as HTMLTextAreaElement)
      .value;

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'review',
          data: { name, occupation, review },
        }),
      });
      if (!response.ok) throw new Error('Failed to add review');
      const newReview = await response.json();
      setReviews([...reviews, newReview]);
      form.reset();
      toast({
        title: 'Success',
        description: 'Review added successfully',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to add review',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditReview = async (review: Review) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'review', id: review.id, data: review }),
      });
      if (!response.ok) throw new Error('Failed to update review');
      const updatedReview = await response.json();
      setReviews(
        reviews.map((item) => (item.id === review.id ? updatedReview : item)),
      );
      setEditingItem(null);
      setIsEditModalOpen(false);
      toast({
        title: 'Success',
        description: 'Review updated successfully',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update review',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (id: string) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/cms', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'review', id }),
      });
      if (!response.ok) throw new Error('Failed to delete review');
      setReviews(reviews.filter((review) => review.id !== id));
      toast({
        title: 'Success',
        description: 'Review deleted successfully',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete review',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader className="border-b rounded-t-xl  bg-white/50 backdrop-blur-sm">
          <CardTitle className="flex items-center  gap-2">
            <Star className="h-5 w-5" />
            Add New Review
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddReview}>
            <div className="grid w-full items-center mt-6 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Customer Name</Label>
                <Input id="name" placeholder="Enter customer name" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  placeholder="Enter customer occupation"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="review">Review</Label>
                <Textarea
                  id="review"
                  placeholder="Enter customer review"
                  required
                  className="min-h-[100px]"
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
                'Add Review'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No reviews added yet
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="mb-4 p-4 border rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {review.occupation}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingItem(review);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="mt-2">{review.review}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditReview(editingItem);
              }}
            >
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="editName">Customer Name</Label>
                  <Input
                    id="editName"
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
                  <Label htmlFor="editOccupation">Occupation</Label>
                  <Input
                    id="editOccupation"
                    value={editingItem.occupation}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        occupation: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="editReview">Review</Label>
                  <Textarea
                    id="editReview"
                    value={editingItem.review}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        review: e.target.value,
                      })
                    }
                    required
                    className="min-h-[100px]"
                  />
                </div>
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
