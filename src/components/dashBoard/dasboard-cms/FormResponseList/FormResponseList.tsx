'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Copy,
  X,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

// Mock data for demonstration
const initialResponses = Array.from({ length: 20 }, (_, i) => ({
  id: `response-${i + 1}`,
  firstName: `John${i + 1}`,
  lastName: `Doe${i + 1}`,
  email: `johndoe${i + 1}@example.com`,
  phone: `+1 (555) 000-${1000 + i}`,
  message: `This is a sample message from John Doe ${
    i + 1
  }. It's a placeholder for the actual message content.`,
}));

export default function FormResponseList() {
  const [responses, setResponses] = useState(initialResponses);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const { toast } = useToast();

  const filteredResponses = responses.filter(
    (response) =>
      `${response.firstName} ${response.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      response.email.toLowerCase().includes(search.toLowerCase()) ||
      response.phone.includes(search) ||
      response.message.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredResponses.length / itemsPerPage);
  const currentResponses = filteredResponses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDeleteAll = () => {
    setResponses([]);
    setCurrentPage(1);
    toast({
      title: 'All responses deleted',
      description: 'Your response list has been cleared.',
    });
  };

  const handleDelete = (id: string) => {
    setResponses(responses.filter((response) => response.id !== id));
    toast({
      title: 'Response deleted',
      description: 'The selected response has been removed.',
    });
  };

  const handleCopy = (response: (typeof responses)[0]) => {
    const text = `Full Name: ${response.firstName} ${response.lastName}
Email: ${response.email}
Phone: ${response.phone}
Message: ${response.message}`;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: 'Response copied',
          description:
            'The response details have been copied to your clipboard.',
        });
      })
      .catch(() => {
        toast({
          title: 'Copy failed',
          description: 'Unable to copy response. Please try again.',
          variant: 'destructive',
        });
      });
  };

  const handleCopyAll = () => {
    const allResponsesText = responses
      .map(
        (response) =>
          `Full Name: ${response.firstName} ${response.lastName}
Email: ${response.email}
Phone: ${response.phone}
Message: ${response.message}
-------------------`,
      )
      .join('\n');

    navigator.clipboard
      .writeText(allResponsesText)
      .then(() => {
        toast({
          title: 'All responses copied',
          description:
            'All response details have been copied to your clipboard.',
        });
      })
      .catch(() => {
        toast({
          title: 'Copy failed',
          description: 'Unable to copy all responses. Please try again.',
          variant: 'destructive',
        });
      });
  };
  return (
    <div className="w-full max-w-4xl space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold  mb-8">Form Responses</h2>
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Total Responses:{' '}
            <span className="font-semibold">{responses.length}</span>
          </p>

          <AlertDialog>
            <div className="flex space-x-2">
              <AlertDialogTrigger className="mb-4" asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete All
                </Button>
              </AlertDialogTrigger>
              <Button variant="outline" size="sm" onClick={handleCopyAll}>
                <Copy className="mr-2 h-4 w-4" />
                Copy All
              </Button>
            </div>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all
                  form responses from your database.
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
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search responses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </Card>

      <div className="space-y-4">
        {currentResponses.map((response, index) => (
          <motion.div
            key={response.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{`${response.firstName} ${response.lastName}`}</h3>
                    <p className="text-sm text-muted-foreground">
                      {response.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {response.phone}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopy(response)}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy response</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(response.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Delete response</span>
                    </Button>
                  </div>
                </div>
                <p className="text-sm">{response.message}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <Card className='p-6'>
        {responses.length > 0 ? (
          <div className="flex justify-between items-center ">
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
            No responses found.
          </p>
        )}
      </Card>
    </div>
  );
}
