'use client';

import React, { useState } from 'react';
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

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => (
  <AccordionItem value={question}>
    <AccordionTrigger className='text-left'>{question}</AccordionTrigger>
    <AccordionContent>{answer}</AccordionContent>
  </AccordionItem>
);

export default function FAQSection() {
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      question: 'What is LPG conversion for bikes?',
      answer:
        'LPG conversion for bikes is a process where we modify your motorcycle to run on Liquefied Petroleum Gas (LPG) in addition to petrol. This conversion can lead to reduced fuel costs and lower emissions, making your bike more eco-friendly.',
    },
    {
      question: 'How long does the LPG conversion process take?',
      answer:
        'The LPG conversion process typically takes about 4-6 hours, depending on the make and model of your bike. We strive to complete the conversion as quickly as possible while ensuring the highest quality and safety standards.',
    },
    {
      question: 'Is LPG conversion safe for my bike?',
      answer:
        'Yes, LPG conversion is safe when done by certified professionals like our team at MS Jannat Traders. We use high-quality components and follow strict safety protocols to ensure that your bike operates safely with the LPG system.',
    },
    {
      question: 'What types of furniture do you offer?',
      answer:
        'We offer a wide range of furniture including living room sets, bedroom furniture, dining sets, office furniture, and custom-made pieces. Our designs range from modern to traditional, catering to various tastes and preferences.',
    },
    {
      question: 'Do you offer installation services for your furniture?',
      answer:
        'Yes, we provide professional installation services for all our furniture. Our skilled team ensures that your furniture is set up correctly and safely in your space.',
    },
    {
      question: 'What are the benefits of using your fuel stations?',
      answer:
        'Our fuel stations offer high-quality fuel at competitive prices. We also provide loyalty programs, convenient locations, and clean, well-maintained facilities to enhance your refueling experience.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already done in real-time, so we don't need to do anything here
  };

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="container mx-auto ">
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
                  Search FAQs
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
                  <Button type="submit">Search</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatePresence>
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
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
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-gray-600 mt-8"
                >
                  No matching questions found. Please try a different search
                  term.
                </motion.p>
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
                <Button variant="secondary">Contact Support</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
