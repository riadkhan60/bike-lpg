// const initialTestimonials = [
//   {
//     quote:
//       "This product has completely transformed the way we work. It's intuitive, powerful, and a game-changer for our team.",
//     author: 'Sarah Johnson',
//     title: 'CEO of TechInnovate',
//   },
//   {
//     quote:
//       "I can't imagine running my business without this tool. It's streamlined our processes and boosted our productivity.",
//     author: 'Michael Chen',
//     title: 'Founder of StartUp Solutions',
//   },
//   {
//     quote:
//       "The customer support is outstanding. They're always there to help and have gone above and beyond our expectations.",
//     author: 'Emily Rodriguez',
//     title: 'CTO of DataDrive',
//   },
// ];

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Container from '@/components/LocalUi/container/Container';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { useSectionImages } from '@/sectionImageConext/sectionImageConext';

interface Review {
  id: string;
  name: string;
  occupation: string;
  review: string;
}

export default function Customers() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    clientImageOne,
    clientImageTwo,
    clientImageThree,
    clientImageFour,
    isLoading: imageLoading,
  } = useSectionImages();

  useEffect(() => {
    async function fetchTestimonials() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/cms');
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        setTestimonials(data.reviews);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  useEffect(() => {
    // Only start the interval if we have testimonials
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Render loading state or error state if no testimonials
  const renderTestimonialContent = () => {
    if (isLoading) {
      return (
        <div className="w-full space-y-2">
          <Skeleton className="text-sm w-[20%] h-5"></Skeleton>
          <Skeleton className="text-sm w-[100%] h-5"></Skeleton>
          <Skeleton className="text-sm w-[50%] h-5"></Skeleton>
        </div>
      );
    }

    if (testimonials.length === 0) {
      return <div className="text-sm">No testimonials available.</div>;
    }

    return (
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
            {`"${testimonials[currentTestimonial].review.slice(0, 150)}..."`}
          </blockquote>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            - {testimonials[currentTestimonial].name},{' '}
            {testimonials[currentTestimonial].occupation}
          </p>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <Container>
      <section ref={sectionRef} className="py-12">
        <div className="flex max-lg:flex-col justify-center items-center gap-20">
          <div className="grid grid-cols-2 gap-5">
            <motion.div
              className="flex flex-col gap-5"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="translate-y-[30px]">
                {imageLoading ? (
                  <Skeleton className="w-full h-full rounded-xl" />
                ) : (
                  <Image
                    alt="image"
                    className="w-full rounded-xl"
                    src={clientImageOne?.imageUrl ?? '/sat1.jpg'}
                    width={300}
                    height={300}
                  />
                )}
              </div>
              <div className="translate-y-[30px]">
                {imageLoading ? (
                  <Skeleton className="w-full h-full rounded-xl" />
                ) : (
                  <Image
                    alt="image"
                    className="w-full rounded-xl"
                    src={clientImageTwo?.imageUrl ?? '/sat2.jpg'}
                    width={300}
                    height={300}
                  />
                )}
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col gap-5"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div>
                {imageLoading ? (
                  <Skeleton className="w-full h-full rounded-xl" />
                ) : (
                  <Image
                    alt="image"
                    className="w-full rounded-xl"
                    src={clientImageThree?.imageUrl ?? '/sat3.jpg'}
                    width={300}
                    height={300}
                  />
                )}
              </div>
              <div>
                {imageLoading ? (
                  <Skeleton className="w-full h-full rounded-xl" />
                ) : (
                  <Image
                    alt="image"
                    className="w-full rounded-xl"
                    src={clientImageFour?.imageUrl ?? '/sat3.jpg'}
                    width={300}
                    height={300}
                  />
                )}
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
              <div className="flex flex-col gap-4 min-[400px]:flex-row relative h-[130px]">
                {renderTestimonialContent()}
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href={'/site/about-us'}>
                  <motion.button
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read More About us
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Container>
  );
}
