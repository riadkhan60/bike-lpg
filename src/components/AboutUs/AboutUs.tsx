'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Target, Users, Shield } from 'lucide-react';
import Container from '../LocalUi/container/Container';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const TeamMember = ({ name, role, image } :{ name:string, role:string, image:string }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
  >
    <Image
      src={image}
      alt={name}
      width={200}
      height={200}
      className="rounded-full mx-auto mb-4 border-4 border-primary/10"
    />
    <h3 className="text-xl font-semibold mb-1">{name}</h3>
    <p className="text-muted-foreground">{role}</p>
  </motion.div>
);

const TimelineItem = ({ year, event } : { year:string, event:string }) => (
  <motion.div variants={fadeInUp} className="flex items-center mb-8 group">
    <div className="bg-primary/10 text-primary rounded-full p-3 mr-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
      <Clock className="w-6 h-6" />
    </div>
    <div>
      <h3 className="text-lg font-semibold">{year}</h3>
      <p className="text-muted-foreground">{event}</p>
    </div>
  </motion.div>
);

const ValueCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title:string, description:string }) => (
  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
    <Card className="relative overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
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
  const teamMembers = [
    {
      name: 'Mr. Jannat',
      role: 'Founder & CEO',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      name: 'Sarah Johnson',
      role: 'COO',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      name: 'Aisha Patel',
      role: 'Head of Design',
      image: '/placeholder.svg?height=200&width=200',
    },
  ];

  const timeline = [
    { year: '2000', event: 'MS Jannat Traders founded' },
    { year: '2005', event: 'Launched our first LPG conversion kit' },
    { year: '2010', event: 'Opened our 10th fuel station' },
    { year: '2015', event: 'Expanded into furniture and interior design' },
    { year: '2020', event: 'Reached 100,000 satisfied customers' },
    { year: '2024', event: 'Celebrating 25 years of innovation and growth' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description:
        'Constantly pushing boundaries to provide cutting-edge solutions that transform industries and improve lives.',
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description:
        'Putting our customers at the heart of everything we do, ensuring their success is our primary mission.',
    },
    {
      icon: Shield,
      title: 'Sustainability',
      description:
        'Committed to eco-friendly practices and products that protect our environment for future generations.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Container>
        <main className="mx-auto  py-16 space-y-24">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
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
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-primary">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2000, MS Jannat Traders has grown from a small
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
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/office.png"
                alt="MS Jannat Traders Office"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </motion.div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-12"
          >
            <h2 className="text-4xl font-bold text-center text-primary">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <ValueCard key={index} {...value} />
              ))}
            </div>
          </motion.div>

          {/* Journey Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-12"
          >
            <h2 className="text-4xl font-bold text-center text-primary">
              Our Journey
            </h2>
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial="initial"
                animate="animate"
                variants={{
                  animate: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {timeline.map((item, index) => (
                  <TimelineItem
                    key={index}
                    year={item.year}
                    event={item.event}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-12"
          >
            <h2 className="text-4xl font-bold text-center text-primary">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-4xl font-bold text-primary">
              Join Our Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              Be a part of our mission to create a sustainable future.
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Explore Opportunities
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </main>
      </Container>
    </div>
  );
}
