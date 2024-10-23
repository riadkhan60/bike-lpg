'use client';

import { useState } from 'react';
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

interface QA {
  id: string;
  question: string;
  answer: string;
}

export default function QASection() {
  const { qas, setQAs } = useDashboardContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<QA | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddQA = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const question = (form.elements.namedItem('question') as HTMLInputElement)
      .value;
    const answer = (form.elements.namedItem('answer') as HTMLTextAreaElement)
      .value;
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'qa', data: { question, answer } }),
      });
      if (!response.ok) throw new Error('Failed to add FAQ');
      const newQA = await response.json();
      setQAs([...qas, newQA]);
      form.reset();
      toast({
        title: 'Success',
        description: 'FAQ added successfully',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to add FAQ',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditQA = async (qa: QA) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'qa', id: qa.id, data: qa }),
      });
      if (!response.ok) throw new Error('Failed to update FAQ');
      const updatedQA = await response.json();
      setQAs(qas.map((item) => (item.id === qa.id ? updatedQA : item)));
      setEditingItem(null);
      setIsEditModalOpen(false);
      toast({
        title: 'Success',
        description: 'FAQ updated successfully',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update FAQ',
        variant: 'destructive',
      });
    } finally {
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
      if (!response.ok) throw new Error('Failed to delete FAQ');
      setQAs(qas.filter((qa) => qa.id !== id));
      toast({
        title: 'Success',
        description: 'FAQ deleted successfully',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete FAQ',
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
          <CardTitle>Add New Q&A</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddQA}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="question">Question</Label>
                <Input
                  id="question"
                  placeholder="Enter the question"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="answer">Answer</Label>
                <Textarea id="answer" placeholder="Enter the answer" required />
              </div>
            </div>
            <Button disabled={isSubmitting} type="submit" className="mt-4">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Add FAQ'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing FAQs</CardTitle>
        </CardHeader>
        <CardContent>
          {qas.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No FAQ uploaded yet.
            </div>
          ) : (
            qas.map((qa) => (
              <div key={qa.id} className="mb-4 p-4 border rounded">
                <h3 className="font-semibold">{qa.question}</h3>
                <p className="mt-2">{qa.answer}</p>
                <div className="mt-2 flex space-x-2">
                  <Button
                    size="sm"
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
                    onClick={() => handleDeleteQA(qa.id)}
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
            <DialogTitle>Edit Q&A</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditQA(editingItem);
              }}
            >
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
                    required
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
                    required
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
                  )
                  }
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
