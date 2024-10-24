'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {  Bike, Fuel, Home } from 'lucide-react';
import Container from '@/components/LocalUi/container/Container';
 const businesses = [
   {
     name: 'M/S Jannat Petroleum',
     description:
       'Providing fuel solutions with our filling station for convenient access.',
     icon: Fuel, // Update with an appropriate icon
     color: 'text-blue-500',
     link: '/jannat-petroleum',
     images: '/filling.jpg', // Update with an appropriate image path
   },
   {
     name: 'Bike LPG',
     description:
       'Innovative kits to convert bikes to LPG for eco-friendly fuel efficiency.',
     icon: Bike, // Update with an appropriate icon
     color: 'text-red-500',
     link: '/bike-lpg',
     images: '/bike.jpg', // Update with an appropriate image path
   },
   {
     name: 'SR Design House',
     description:
       'Expert interior design and furniture solutions for every space.',
     icon: Home, // Update with an appropriate icon
     color: 'text-green-500',
     link: '/sr-design-house',
     images: '/fur.jpg', // Update with an appropriate image path
   },
 ];


const AnimatedCard = ({ business, index } :{ business: typeof businesses[number], index: number}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
    >
      <Card className="flex flex-col h-full">
        <CardHeader>
          <motion.div
            className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 ${business.color}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <business.icon className="w-6 h-6" />
          </motion.div>
          <div className="mb-2">
            <Image
              src={business.images}
              className="w-full rounded-xl mb-2"
              alt="logo"
              width={400}
              height={100}
            />
          </div>
          <CardTitle className="mt-5">{business.name}</CardTitle>
          <CardDescription>{business.description}</CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto">
          <Button asChild className="w-full">
            <Link href={business.link}>Learn More</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default function AllBusinessCards() {


  return (
    <Container>
      <section className="bg-background py-12 ">
        <div className="mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center text-primary mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Featured Businesses
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businesses.map((business, index) => (
              <AnimatedCard key={index} business={business} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
