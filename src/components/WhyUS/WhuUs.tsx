'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Award,
  Zap,
  Users,
  Rocket,
  Shield,
  Leaf,
} from 'lucide-react';
import Container from '../LocalUi/container/Container';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export default function WhyUs() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: 'Innovative Solutions',
      description:
        "We're at the forefront of LPG technology, constantly innovating to provide the best solutions for our customers.",
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: 'Customer-Centric Approach',
      description:
        'Our customers are at the heart of everything we do. We strive to exceed expectations in service and support.',
    },
    {
      icon: <Award className="w-6 h-6 text-purple-500" />,
      title: 'Industry Recognition',
      description:
        'Our commitment to excellence has earned us multiple recognition in the industry.',
    },
    {
      icon: <Rocket className="w-6 h-6 text-red-500" />,
      title: 'Rapid Growth',
      description:
        "We've experienced consistent growth, expanding our services and reach to better serve our customers.",
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: 'Quality Assurance',
      description:
        'We maintain the highest standards of quality in all our products and services, ensuring safety and reliability.',
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-500" />,
      title: 'Eco-Friendly Practices',
      description:
        'Our commitment to sustainability drives us to implement eco-friendly practices across all our operations.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Container>
        <main className=" mx-auto py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl max-md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#7a462a] to-[#FF9900]">
              Why Choose MS Jannat Traders?
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover why we’re the preferred choice for doing business with
              us.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-8">
              Ready to Experience the Difference?
            </h2>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Contact Us Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </main>
      </Container>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="bg-primary text-primary-foreground py-16"
      >
        <Container>
          <div className=" mx-auto ">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Impact in Numbers</h2>
              <p className="text-xl opacity-80">
                See the difference {"we've"} made over the years
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: '2K+', label: 'Satisfied Customers' },
                { number: '500+', label: 'LPG Conversions' },
                { number: '1', label: 'Fuel Stations' },
                { number: '1000+', label: 'Furniture Pieces Sold' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-lg opacity-80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </motion.section>
    </div>
  );
}
