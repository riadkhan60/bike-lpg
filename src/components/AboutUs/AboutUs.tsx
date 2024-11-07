'use client';


import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight,   } from 'lucide-react';
import Container from '../LocalUi/container/Container';
import {  values } from '@/constants/AboutConstant';
import TeamSection from './TeamSection';
import MileStone from './MileStone';
import { useSectionImages } from '@/sectionImageConext/sectionImageConext';
import { Skeleton } from '../ui/skeleton';

// Smoother animation configs


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




const ValueCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    layout
  >
    <Card className="relative overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow h-full">
      <div className="absolute top-0 left-0 w-full h-1 bg-[#FF9900]"></div>
      <CardHeader className="text-center pt-8">
        <div className="bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-center">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export default function AboutUsPage() {
  const { officePicture, isLoading } = useSectionImages();
  return (
    <div className="min-h-screen bg-background">
      <Container>
        <main className="mx-auto py-16 space-y-24">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl max-md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#7a462a] to-[#FF9900]">
              About MS Jannat Traders
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From humble beginnings to industry leaders, discover the journey
              that has made MS Jannat Traders a pioneer in LPG solutions, fuel
              stations, and innovative furniture design.
            </p>
          </motion.div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-6">
              <h2 className="text-3xl max-md:text-2xl font-bold text-primary">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2022, MS Jannat Traders has grown from a small
                  local business to a diversified company with multiple
                  successful ventures. Our journey has been marked by
                  innovation, customer-centric approaches, and a commitment to
                  sustainability.
                </p>
                <p>
                  Today, {"we're"} proud to be at the forefront of LPG
                  technology, providing eco-friendly solutions that improve
                  lives while respecting our environment.
                </p>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="relative w-full aspect-[3/2]"
            >
              {isLoading || !officePicture ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <Image
                  src={officePicture?.imageUrl}
                  alt="MS Jannat Traders Office"
                  fill
                  className="rounded-2xl shadow-lg object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              )}
            </motion.div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="space-y-12"
          >
            <h2 className="text-3xl max-md:text-2xl font-bold text-center text-primary">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <ValueCard key={index} {...value} />
              ))}
            </div>
          </motion.div>

          {/* Journey Section */}
          <MileStone />

          {/* Team Section */}
          <TeamSection />

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-3xl max-md:text-2xl font-bold text-primary">
              Join Our Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              Be a part of our mission to create a sustainable future.
            </p>

            <Button
              size="lg"
              className="bg-primary text-primary-foreground bg-brand hover:bg-brand/80"
            >
              <a
                className="flex items-center"
                href="https://www.facebook.com/@bikelpg0"
                target="_blank"
              >
                Explore Opportunities
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </main>
      </Container>
    </div>
  );
}
