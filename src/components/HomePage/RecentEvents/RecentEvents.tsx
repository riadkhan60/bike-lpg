'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Award, Zap, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const events = [
  {
    title: 'LPG Technology Expo 2024',
    date: 'March 15, 2024',
    description:
      'MS Jannat Traders showcased its latest Bike LPG conversion technology at the annual LPG Tech Expo.',
    icon: <Zap className="h-6 w-6" />,
    category: 'Technology',
  },
  {
    title: 'Community Outreach Program',
    date: 'April 2, 2024',
    description:
      'Our team conducted a free vehicle maintenance workshop for local bike owners, promoting safe and efficient LPG use.',
    icon: <Users className="h-6 w-6" />,
    category: 'Community',
  },
  {
    title: 'Sustainable Business Award',
    date: 'May 10, 2024',
    description:
      "MS Jannat Traders received the 'Green Business of the Year' award for our commitment to eco-friendly practices.",
    icon: <Award className="h-6 w-6" />,
    category: 'Achievement',
  },
  {
    title: 'New Furniture Collection Launch',
    date: 'June 1, 2024',
    description:
      'MS Furniture & Interior unveiled its latest collection of sustainable, locally-sourced wooden furniture.',
    icon: <Calendar className="h-6 w-6" />,
    category: 'Product Launch',
  },
];

export default function RecentEventsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="container px-4 md:px-6"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12"
        >
          Recent Events
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {events.map((event, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    {event.icon}
                  </div>
                  <div className="grid gap-1">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription>{event.date}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {event.description}
                  </p>
                  <Badge variant="secondary" className="mt-4">
                    {event.category}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
