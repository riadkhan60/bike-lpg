'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Sofa,
  PenTool,
  Home,
  Phone,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import Container from '../LocalUi/container/Container';
import Link from 'next/link';

interface ContactData {
  id?: string;
  companyId: string;
  phone?: string;
  email?: string;
  location?: string;
  facebook?: string;
  whatsapp?: string;
  tiktok?: string;
  youtube?: string;
  instagram?: string;
  linkedin?: string;
}

const ServiceCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
    <Card className="border-none shadow-lg hover:shadow-xl transition-all">
      <CardContent className="p-6 space-y-4">
        <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const ProjectShowcase = ({
  image,
  title,
  category,
}: {
  image: string;
  title: string;
  category: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="group relative overflow-hidden rounded-xl"
  >
    <div className="relative h-[300px] w-full">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform group-hover:scale-105"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-sm opacity-80">{category}</p>
    </div>
  </motion.div>
);

export default function FurnitureHouse(  ) {
  const [contacts, setContacts] = useState( {} as ContactData );
  const features = [
    'Custom Furniture Design',
    'Professional Interior Planning',
    'Premium Materials',
    'Expert Craftsmanship',
    '3D Visualization',
    'Project Management',
  ];


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/contacts');
        const data = await response.json();
        setContacts(data[0]);
        
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  },[])

  return (
    <div className="min-h-screen bg-background">
      <Container>
        <main className="py-16 space-y-24">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto space-y-6"
          >
            <h1 className="text-5xl max-md:text-3xl font-bold leading-[1.2] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#7a462a] to-[#FF9900]">
              SR Design House
            </h1>
            <p className="text-xl text-muted-foreground">
              Transforming spaces into extraordinary experiences through
              innovative furniture design and exceptional interior solutions
            </p>
            <div className="flex max-md:flex-col justify-center gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground">
                <a href={contacts?.facebook}>View Portfolio</a>
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">
                <Link href={'/site/contact-us'}>Book Consultation</Link>
              </Button>
            </div>
          </motion.div>

          {/* Featured Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-12"
          >
            <h2 className="text-3xl font-bold text-center text-primary">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectShowcase
                image="/living.webp"
                title="Modern Living Room"
                category="Interior Design"
              />
              <ProjectShowcase
                image="/dinning.jpg"
                title="Custom Dining Set"
                category="Furniture Design"
              />
              <ProjectShowcase
                image="/officein.jpg"
                title="Executive Office"
                category="Commercial Space"
              />
            </div>
          </motion.div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-12"
          >
            <h2 className="text-3xl font-bold text-center text-primary">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ServiceCard
                icon={Sofa}
                title="Furniture Design"
                description="Custom-made furniture pieces tailored to your style and space requirements."
              />
              <ServiceCard
                icon={PenTool}
                title="Interior Design"
                description="Complete interior design solutions from concept to execution."
              />
              <ServiceCard
                icon={Home}
                title="Space Planning"
                description="Optimal space utilization with 3D visualization and planning."
              />
            </div>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-primary/5 rounded-3xl p-12"
          >
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl font-bold text-center text-primary">
                Why Choose SR Design House
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl font-bold text-primary">Get in Touch</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8 items-center">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                <span>{contacts?.phone }</span>
              </div>
              <Button className="bg-primary text-primary-foreground">
                <a className='flex' href={`tel:${contacts?.phone}`}>
                  Schedule a Visit
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </main>
      </Container>
    </div>
  );
}
