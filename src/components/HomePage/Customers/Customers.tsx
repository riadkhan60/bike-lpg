'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Container from '@/components/LocalUi/container/Container';
import { Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    quote:
      "This product has completely transformed the way we work. It's intuitive, powerful, and a game-changer for our team.",
    author: 'Sarah Johnson',
    title: 'CEO of TechInnovate',
  },
  {
    quote:
      "I can't imagine running my business without this tool. It's streamlined our processes and boosted our productivity.",
    author: 'Michael Chen',
    title: 'Founder of StartUp Solutions',
  },
  {
    quote:
      "The customer support is outstanding. They're always there to help and have gone above and beyond our expectations.",
    author: 'Emily Rodriguez',
    title: 'CTO of DataDrive',
  },
];

export default function Customers() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true }); // Trigger animation once when in view

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <section ref={sectionRef} className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex max-lg:flex-col justify-between items-center gap-20">
          <div className="grid grid-cols-2 gap-5">
            {/* Left side (Orange and Teal from the pattern) */}
            <motion.div
              className="flex flex-col gap-5"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="translate-y-[30px]">
                <Image
                  alt="image"
                  className="w-full rounded-xl"
                  src={'/sat3.jpg'}
                  width={300}
                  height={300}
                />
              </div>
              <div className="translate-y-[30px]">
                <Image
                  alt="image"
                  className="w-full rounded-xl"
                  src={'/sat4.jpg'}
                  width={300}
                  height={300}
                />
              </div>
            </motion.div>

            {/* Right side (Red and Purple from the pattern) */}
            <motion.div
              className="flex flex-col gap-5"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div>
                <Image
                  alt="image"
                  className="w-full rounded-xl"
                  src={'/sat1.jpg'}
                  width={300}
                  height={300}
                />
              </div>
              <div>
                <Image
                  alt="image"
                  className="w-full rounded-xl"
                  src={'/sat3.jpg'}
                  width={300}
                  height={300}
                />
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-primary mb-8">
                  Hear from Our Satisfied Customers
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {"Don't"} just take our word for it. See what our customers
                  have to say about their experiences.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row relative h-[120px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-2 absolute top-0 left-0 w-full"
                  >
                    <div className="flex gap-0.5 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-sm font-medium">
                      {`"${testimonials[currentTestimonial].quote}"`}
                    </blockquote>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      - {testimonials[currentTestimonial].author},{' '}
                      {testimonials[currentTestimonial].title}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <motion.button
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read More Testimonials
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Container>
  );
}
