'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MessageCircle } from 'lucide-react';
import Container from '../LocalUi/container/Container';

type FAQ = {
  question: string;
  answer: string;
};


const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => (
  <AccordionItem value={question}>
    <AccordionTrigger className="text-left">{question}</AccordionTrigger>
    <AccordionContent>{answer}</AccordionContent>
  </AccordionItem>
);

export default function FAQSection({number}: {number: string | number | undefined}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [faqs, setFaqs] = useState([] as FAQ[]);
  // Sample FAQ data - in real implementation, this would come from your database
  useEffect(() => { 
    async function fetchFaqs() {
      try {
        const response = await fetch('/api/cms');
        const data = await response.json();
        setFaqs(data.qas);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    }

    fetchFaqs();
  },[])


  // Function to get FAQs to display based on search term
  const getDisplayedFaqs = () => {
    if (searchTerm) {
      // If there's a search term, filter all FAQs
      return faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    // If no search term, return only first 6 FAQs
    return faqs.slice(0, 6);
  };

  const displayedFaqs = getDisplayedFaqs();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-primary">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our products and services.
              {!searchTerm && faqs.length > 6 && (
                <span className="block mt-2 text-sm text-gray-500">
                  Showing top {Math.min(6, faqs.length)} FAQs. Use search to
                  find more answers.
                </span>
              )}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Search className="w-6 h-6 mr-2 text-primary" />
                  Search All FAQs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Type your question here..."
                    className="flex-grow"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button className='bg-brand hover:bg-brand/80' type="submit">Search</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {displayedFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {displayedFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <FAQItem question={faq.question} answer={faq.answer} />
                    </motion.div>
                  ))}
                </Accordion>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-gray-600 mt-8"
                >
                  <p>
                    No matching questions found. Please try a different search
                    term.
                  </p>
                  <Button
                    variant="ghost"
                    className="mt-4"
                    onClick={() => setSearchTerm('')}
                  >
                    Show all FAQs
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <MessageCircle className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">
                  Still have questions?
                </h3>
                <p className="mb-4">
                  Our team is here to help. Contact us for personalized
                  assistance.
                </p>
                <Button variant="secondary">
                  <a href={`tel:${number}`}>
                    Contact Support
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
