'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  Pencil,
  Trash2,
  Upload,
  PhoneCall,
  Mail,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

type TeamMember = {
  id: number;
  image: string;
  name: string;
  position: string;
  phone: string;
  email: string;
};

export default function TeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingMembers, setFetchingMembers] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('/api/team-members');
        if (!response.ok) throw new Error('Failed to fetch members');
        const data = await response.json();
        setMembers(data);
      } catch {
        toast({
          title: 'Error',
          description: 'Failed to fetch team members',
          variant: 'destructive',
        });
      } finally {
        setFetchingMembers(false);
      }
    }

    getData();
  }, [toast]);

  const fetchMembers = useCallback(async () => {
    try {
      const response = await fetch('/api/team-members');
      if (!response.ok) throw new Error('Failed to fetch members');
      const data = await response.json();
      setMembers(data);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to fetch team members',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const resetForm = () => {
    setEditingMember(null);
    setPreviewImage(null);
    setIsDialogOpen(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingImage(true);
      try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Failed to upload image');

        const data = await response.json();
        setPreviewImage(data.url);
      } catch {
        toast({
          title: 'Error',
          description: 'Failed to upload image',
          variant: 'destructive',
        });
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const addOrUpdateMember = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const memberData = {
        name: formData.get('name'),
        position: formData.get('position'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        image: previewImage || editingMember?.image || '',
      };

      const url = editingMember
        ? `/api/team-members/${editingMember.id}`
        : '/api/team-members';

      const response = await fetch(url, {
        method: editingMember ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      });

      if (!response.ok) throw new Error('Failed to save member');

      await fetchMembers();
      resetForm();
      toast({
        title: 'Success',
        description: `Team member ${
          editingMember ? 'updated' : 'added'
        } successfully`,
      });
    } catch {
      toast({
        title: 'Error',
        description: `Failed to ${
          editingMember ? 'update' : 'add'
        } team member`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMember = async (id: number) => {
    try {
      const response = await fetch(`/api/team-members/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete member');

      await fetchMembers();
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

  const MemberForm = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        addOrUpdateMember(formData);
      }}
    >
      <div className="grid gap-4 py-4">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24 ">
            <AvatarImage
              src={previewImage || editingMember?.image}
              alt="Preview"
              className="rounded-full object-cover"
            />
            <AvatarFallback>Upload</AvatarFallback>
          </Avatar>
          <Button
            type="button"
            disabled={uploadingImage}
            variant={uploadingImage ? 'outline' : 'secondary'}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploadingImage ? (
              <span className="flex items-center">
                {' '}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
              </span>
            ) : (
              <span className="flex items-center">
                <Upload className="mr-2 h-4 w-4" /> Upload Image{' '}
              </span>
            )}
          </Button>
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-left">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter member name"
            defaultValue={editingMember?.name || ''}
            className="col-span-3"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="position" className="text-left">
            Position
          </Label>
          <Input
            id="position"
            name="position"
            defaultValue={editingMember?.position || ''}
            className="col-span-3"
            placeholder="Enter member position"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone" className="text-left">
            Phone
          </Label>
          <Input
            id="phone"
            name="phone"
            defaultValue={editingMember?.phone || ''}
            className="col-span-3"
            placeholder="Enter member phone"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-left">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={editingMember?.email || ''}
            className="col-span-3"
            placeholder="Enter member email"
            required
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={isLoading || uploadingImage}
      >
        {isLoading ? 'Saving...' : editingMember ? 'Update' : 'Add'} Member
      </Button>
    </form>
  );

  if (fetchingMembers) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="h-12 w-12 " />
        </motion.div>
      </div>
    );
  }
  return (
    <Card className="container p-6">
      <h1 className="text-2xl font-bold mb-6">Team Members</h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="mb-4"
            onClick={() => {
              resetForm();
              setIsDialogOpen(true);
            }}
          >
            <PlusIcon className="mr-2 h-4 w-4" /> Add Team Member
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingMember ? 'Edit' : 'Add'} Team Member
            </DialogTitle>
          </DialogHeader>
          <MemberForm />
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={member.image}
                      className="object-cover"
                      alt={member.name}
                    />
                    <AvatarFallback>
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-semibold">{member.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {member.position}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm flex items-center text-muted-foreground font-medium gap-1">
                    <PhoneCall className="mr-2 h-4 w-4" /> {member.phone}
                  </p>
                  <p className="text-sm flex items-center text-muted-foreground font-medium gap-1">
                    <Mail className="mr-2 h-4 w-4" /> {member.email}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 p-4">
                <div className="flex justify-end space-x-2 w-full">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingMember(member);
                      setPreviewImage(member.image);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteMember(member.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
