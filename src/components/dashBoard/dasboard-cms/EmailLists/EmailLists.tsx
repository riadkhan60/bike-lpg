'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, Trash2, Copy, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

// Mock data for demonstration
type Email = {
  id: string;
  email: string;
};

export default function Component() {
  const [emails, setEmails] = useState([] as Email[]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const itemsPerPage = 12;
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/subscribers');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setEmails(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  },[toast])

  const filteredEmails = emails.filter((email) =>
    email.email.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredEmails.length / itemsPerPage);
  const currentEmails = filteredEmails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDeleteAll = async () => {
    try {
      const response = await fetch('/api/subscribers', {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete all emails');
      }
      setEmails([]);
      setCurrentPage(1);
      toast({
        title: 'All emails deleted',
        description: 'Your subscriber list has been cleared.',
      });
    } catch (error) {
      console.error('Error deleting all emails:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete all emails',
        variant: 'destructive',
      });
    }
  };

  const handleCopyAll = () => {
    navigator.clipboard
      .writeText(emails.map((email) => email.email).join('\n'))
      .then(() => {
        toast({
          title: 'Emails copied',
          description:
            'All email addresses have been copied to your clipboard.',
        });
      })
      .catch(() => {
        toast({
          title: 'Copy failed',
          description: 'Unable to copy emails. Please try again.',
          variant: 'destructive',
        });
      });
  };

  if (isLoading) {
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
      <Card className="w-full max-w-4xl p-6 space-y-6">
        <h2 className="text-2xl font-bold  mb-6">Newsletter Subscribers</h2>

        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Total Subscribers:{' '}
            <span className="font-semibold">{emails.length}</span>
          </p>
          <div className="space-x-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    all subscriber emails from your database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAll}>
                    Delete All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button variant="outline" size="sm" onClick={handleCopyAll}>
              <Copy className="mr-2 h-4 w-4" />
              Copy All
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search subscribers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentEmails.map((email, index) => (
            <motion.div
              key={email.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-card text-card-foreground p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-sm font-medium truncate">{email.email}</p>
            </motion.div>
          ))}
        </div>

        {emails.length > 0 ? (
          <div className="flex justify-between items-center mt-6">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              variant="outline"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No subscribers found.
          </p>
        )}
      </Card>
    );
}
