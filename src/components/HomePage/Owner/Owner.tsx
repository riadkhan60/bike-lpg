'use client';

import { Card, CardContent } from '@/components/ui/card';
import { MessageSquareQuote } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Container from '@/components/LocalUi/container/Container';

export default function Owner() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      ref={ref}
      className="w-full py-16 md:py-24 lg:py-32 lg:mt-20 mt-5  bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="container px-4 md:px-6"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#7a462a] to-[#FF9900]"
          >
            Meet Our Visionary Leader
          </motion.h2>
          <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-16 xl:grid-cols-[1fr_600px] items-center">
            <motion.div variants={itemVariants} className="relative group">
              <Card className="overflow-hidden shadow-2xl transition-shadow duration-300 group-hover:shadow-primary/50">
                <CardContent className="p-0">
                  <Image
                    alt="Mr. Jannat - Owner of MS Jannat Traders"
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    height="600"
                    src="/owner.jpg"
                    width="600"
                  />
                </CardContent>
              </Card>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-6 py-2 rounded-full shadow-lg"
              >
                Founder & CEO
              </motion.div>
            </motion.div>
            <div className="flex flex-col justify-center space-y-6">
              <motion.h3 variants={itemVariants} className="text-3xl font-bold">
                Shafik Islam
              </motion.h3>
              <motion.p
                variants={itemVariants}
                className="text-xl text-muted-foreground"
              >
                Visionary Leader of MS Jannat Traders
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                For over two decades, Mr. Jannat has been pioneering innovation
                in the automotive and home decor industries. His visionary
                leadership has propelled MS Jannat Traders from a modest local
                enterprise into a diversified powerhouse with multiple thriving
                ventures.
              </motion.p>
              <motion.div variants={itemVariants}>
                <Card className="bg-primary/5 dark:bg-primary/20 border-none shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <MessageSquareQuote className="w-8 h-8 mt-1 text-primary" />
                    <blockquote className="italic text-gray-700 dark:text-gray-200 font-medium">
                      {`"Our mission is to deliver sustainable solutions that
                    enhance lives while honoring our environment. From our
                    innovative LPG conversion kits to our state-of-the-art fuel
                    stations and exquisite furniture, we're committed to making
                    a positive impact in every aspect of our business."`}
                    </blockquote>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-4">
                <h4 className="font-semibold text-lg text-primary">
                  Key Milestones:
                </h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  {[
                    'Pioneered Bike LPG conversion technology in the region',
                    'Expanded MS Jannat Traders into multiple successful business verticals',
                    "Received the prestigious 'Entrepreneur of the Year' award in 2022",
                    'Spearheaded initiatives for sustainable business practices across all company operations',
                  ].map((achievement, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                      }
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <span className="text-primary">•</span>
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
