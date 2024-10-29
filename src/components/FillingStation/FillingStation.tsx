'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Phone } from 'lucide-react';
import Container from '../LocalUi/container/Container';
import { Skeleton } from '../ui/skeleton';
import { useSectionImages } from '@/sectionImageConext/sectionImageConext';

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
const InfoCard = ({
  icon: Icon,
  title,
  content,
}: {
  icon: React.ElementType;
  title?: string;
  content?: string;
}) => (
  <Card className="border-none shadow-sm">
    <CardContent className="flex items-center space-x-4 p-4">
      <div className="bg-primary/10 rounded-full p-3">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-sm">{title}</h3>
        {content ? (
          <p className="text-muted-foreground">{content}</p>
        ) : (
          <Skeleton className="h-4 w-[100px]"></Skeleton>
        )}
      </div>
    </CardContent>
  </Card>
);

export default function FillingStation() {
  const [contacts, setContacts] = useState({} as ContactData);
  const { fillingStationSection, isLoading } = useSectionImages();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/contacts');
        const data = await response.json();

        setContacts(data[1]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Container>
        <main className="py-16 space-y-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl max-md:text-3xl font-bold leading-[1.2] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#7a462a] to-[#FF9900]">
              MS Jannat Filling Station
            </h1>
            <p className="text-xl text-muted-foreground">
              Your trusted destination for quality fuel and exceptional service
            </p>
          </motion.div>

          {/* Station Image and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg"
            >
              {fillingStationSection?.imageUrl && (
                <Image
                  src={fillingStationSection?.imageUrl}
                  alt="MS Jannat Filling Station"
                  fill
                  className="object-cover"
                />
              )}
              {
                isLoading && (
                  <Skeleton className="h-full w-full"></Skeleton>
                )
              }
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-primary">
                  About Our Station
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our filling station provides high-quality fuel services with
                  state-of-the-art equipment and professional staff. We take
                  pride in maintaining the highest standards of safety and
                  customer service.
                </p>
              </div>

              <div className="grid gap-4">
                <InfoCard
                  icon={MapPin}
                  title="Location"
                  content={contacts?.location}
                />
                <InfoCard
                  icon={Clock}
                  title="Operating Hours"
                  content="24/7, Every Day"
                />
                <InfoCard
                  icon={Phone}
                  title="Contact"
                  content={contacts?.phone}
                />
              </div>
            </motion.div>
          </div>

          {/* Services Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-primary/5 rounded-2xl p-8 text-center"
          >
            <h3 className="text-xl font-semibold mb-4">Available Services</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['Petrol', 'Diesel', 'CNG', 'Car Wash'].map((service) => (
                <span
                  key={service}
                  className="bg-white px-4 py-2 rounded-full text-sm shadow-sm"
                >
                  {service}
                </span>
              ))}
            </div>
          </motion.div>
        </main>
      </Container>
    </div>
  );
}
