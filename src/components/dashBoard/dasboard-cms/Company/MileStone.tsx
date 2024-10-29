import { useEffect, useState } from 'react';
import { Edit, Loader2, History, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

interface Milestone {
  id: number;
  year: string;
  text: string;
}

export default function MilestoneCMSSection() {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<Milestone | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    fetchMilestones();
  }, []);

  const fetchMilestones = async () => {
    const response = await fetch('/api/milestones');
    const data = await response.json();
    setMilestones(data);
  };

  const handleAddMilestone = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const year = (form.elements.namedItem('year') as HTMLInputElement).value;
    const text = (form.elements.namedItem('text') as HTMLInputElement).value;

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/milestones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          year,
          text,
        }),
      });
      if (!response.ok) throw new Error('Failed to add milestone');
      const newMilestone = await response.json();
      setMilestones([...milestones, newMilestone]);
      form.reset();
      toast({
        title: 'Success',
        description: 'Milestone added successfully',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to add milestone',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditMilestone = async (milestone: Milestone) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/milestones/${milestone.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          year: milestone.year,
          text: milestone.text,
        }),
      });
      if (!response.ok) throw new Error('Failed to update milestone');
      const updatedMilestone = await response.json();
      setMilestones(
        milestones.map((item) =>
          item.id === milestone.id ? updatedMilestone : item,
        ),
      );
      setEditingItem(null);
      setIsEditModalOpen(false);
      toast({
        title: 'Success',
        description: 'Milestone updated successfully',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update milestone',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
const handleDeleteMilestone = async (id: number) => {
  try {
    const response = await fetch(`/api/milestones/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete member');

    await fetchMilestones();
    toast({
      title: 'Success',
      description: 'Team member deleted successfully',
    });
  } catch {
    toast({
      title: 'Error',
      description: 'Failed to delete team member',
      variant: 'destructive',
    });
  }
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader className="border-b rounded-t-xl bg-white/50 backdrop-blur-sm">
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Add New Milestone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddMilestone}>
            <div className="grid w-full items-center mt-6 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  placeholder="Enter year (e.g., 2024)"
                  required
                  type="number"
                  min="1900"
                  max="2100"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="text">Milestone Description</Label>
                <Input
                  id="text"
                  placeholder="Enter milestone description"
                  required
                />
              </div>
            </div>
            <Button disabled={isSubmitting} type="submit" className="mt-4">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Milestone'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Timeline Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          {milestones.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No milestones added yet
            </div>
          ) : (
            <div className="space-y-4">
              {milestones
                .sort((a, b) => parseInt(a.year) - parseInt(b.year))
                .map((milestone) => (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border rounded flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-lg font-semibold">
                        {milestone.year}
                      </div>
                      <div>{milestone.text}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingItem(milestone);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteMilestone(milestone.id)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Milestone</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditMilestone(editingItem);
              }}
            >
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="editYear">Year</Label>
                  <Input
                    id="editYear"
                    value={editingItem.year}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        year: e.target.value,
                      })
                    }
                    required
                    type="number"
                    min="1900"
                    max="2100"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="editText">Milestone Description</Label>
                  <Input
                    id="editText"
                    value={editingItem.text}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        text: e.target.value,
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
