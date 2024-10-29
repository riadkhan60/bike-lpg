'use client';

import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Milestone {
  id: number;
  year: string;
  text: string;
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

const TimelineItem = ({ year, event }: { year: string; event: string }) => (
  <motion.div
    variants={fadeInUp}
    className="flex items-center mb-8 group"
    layout
  >
    <div className="bg-primary/10 text-primary rounded-full p-3 mr-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
      <Clock className="w-6 h-6" />
    </div>
    <div>
      <h3 className="text-lg font-semibold">{year}</h3>
      <p className="text-muted-foreground">{event}</p>
    </div>
  </motion.div>
);

const SkeletonItem = () => (
  <motion.div variants={fadeInUp} className="flex items-center mb-8" layout>
    <div className="bg-primary/10 rounded-full p-3 mr-4">
      <div className="w-6 h-6 bg-primary/20 rounded-full animate-pulse" />
    </div>
    <div className="flex-1">
      <div className="h-5 w-16 bg-primary/20 rounded animate-pulse mb-2" />
      <div className="h-4 w-full bg-primary/10 rounded animate-pulse" />
    </div>
  </motion.div>
);

export default function Milestone() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMilestones();
  }, []);

  const fetchMilestones = async () => {
    try {
      const response = await fetch('/api/milestones');
      const data = await response.json();
      setMilestones(data);
    } catch (error) {
      console.error('Failed to fetch milestones:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-12"
    >
      <h2 className="text-3xl max-md:text-2xl font-bold text-center text-primary">
        Our Journey
      </h2>
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0 }}
            >
              {[...Array(5)].map((_, index) => (
                <SkeletonItem key={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0 }}
            >
              {milestones.sort((a, b) => parseInt(a.year) - parseInt(b.year)).map((item) => (
                <TimelineItem
                  key={item.id}
                  year={item.year}
                  event={item.text}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
