'use client';

import { useState } from 'react';
import { Edit, Trash } from 'lucide-react';
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

interface QA {
  id: string;
  question: string;
  answer: string;
}

interface QASectionProps {
  qas: QA[];
  fetchData: () => Promise<void>;
}

export default function QASection({ qas, fetchData }: QASectionProps) {
  
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
      if (!response.ok) throw new Error('Failed to add Q&A');
      await fetchData();
      form.reset();
      toast({
        title: 'Success',
        description: 'Q&A added successfully',
      });
    } catch  {
      toast({
        title: 'Error',
        description: 'Failed to add Q&A',
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
      if (!response.ok) throw new Error('Failed to update Q&A');
      await fetchData();
      setEditingItem(null);
      setIsEditModalOpen(false);
      toast({
        title: 'Success',
        description: 'Q&A updated successfully',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update Q&A',
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
      if (!response.ok) throw new Error('Failed to delete Q&A');
      await fetchData();
      toast({
        title: 'Success',
        description: 'Q&A deleted successfully',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete Q&A',
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
              Add Q&A
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Q&As</CardTitle>
        </CardHeader>
        <CardContent>
          {qas.map((qa) => (
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
          ))}
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
