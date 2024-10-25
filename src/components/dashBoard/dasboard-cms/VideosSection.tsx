'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Edit, Trash, MoveUp, MoveDown, Loader2, Video } from 'lucide-react';
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
import { useDashboardContext } from './DashboardContext/DasboardContext';

interface VideoLink {
  id: string;
  title: string;
  url: string;
  order: number;
}

export default function VideosSection() {
  const { videoLinks, setVideoLinks } = useDashboardContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<VideoLink | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to add video link',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditVideoLink = async (videoLink: VideoLink) => {
    try {
      setIsSubmitting(true);
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
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update video link',
        variant: 'destructive',
      });
    } finally {
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
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete video link',
        variant: 'destructive',
      });
    } finally {
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

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <Card>
        <CardHeader className="border-b rounded-t-xl  bg-white/50 backdrop-blur-sm">
          <CardTitle className="flex items-center  gap-2">
            <Video className="h-5 w-5" />
            Add New Video Link
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddVideoLink} className=" mt-6">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="videoTitle">Video Title</Label>
                <Input
                  id="videoTitle"
                  placeholder="Enter video title"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input id="videoUrl" placeholder="Enter video URL" required />
              </div>
            </div>
            <Button disabled={isSubmitting} type="submit" className="mt-4">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Add Video Link'
              )}
            </Button>
          </form>
        </CardContent>

        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Video Link</DialogTitle>
            </DialogHeader>
            {editingItem && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditVideoLink(editingItem);
                }}
              >
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
                      required
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
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Video Links</CardTitle>
        </CardHeader>
        <CardContent>
          {videoLinks.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">
              No video links found. Add one above.
            </p>
          )}
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
                          <Card className='shadow-none rounded-md '>
                            <CardContent className="flex justify-between items-center p-4">
                              <div>
                                <h3 className="font-semibold">{link.title}</h3>
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
                                  onClick={() => handleDeleteVideoLink(link.id)}
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
    </motion.div>
  );
}
