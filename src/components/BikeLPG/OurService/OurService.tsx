'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Truck, Activity, Clock } from 'lucide-react';
import Container from '@/components/LocalUi/container/Container';

interface ServiceStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  illustration: React.ReactNode;
}

const ServiceStep: React.FC<ServiceStepProps> = ({
  icon,
  title,
  description,
  illustration,
}) => (
  <motion.div
    whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <Card className="h-full overflow-hidden bg-gradient-to-br from-white to-gray-50">
      <CardContent className="p-6">
        <div className="mb-4 relative">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            {icon}
          </div>
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 opacity-10"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          >
            {illustration}
          </motion.div>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-primary">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  illustration: React.ReactNode;
}

export default function OurService() {
  const services: Service[] = [
    {
      icon: <ShoppingCart className="w-8 h-8 text-primary" />,
      title: 'Purchase LPG Kit',
      description:
        'Choose from our range of high-quality LPG conversion kits tailored for various bike models.',
      illustration: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full"
          aria-hidden="true"
        >
          <path d="M17 18C17 19.1046 16.1046 20 15 20C13.8954 20 13 19.1046 13 18C13 16.8954 13.8954 16 15 16C16.1046 16 17 16.8954 17 18ZM5 18C5 19.1046 4.10457 20 3 20C1.89543 20 1 19.1046 1 18C1 16.8954 1.89543 16 3 16C4.10457 16 5 16.8954 5 18ZM10.0001 14L11 6H22L21.0001 14H10.0001ZM22 4H10V2H0V4H8L9 12H19L20 4Z" />
        </svg>
      ),
    },
    {
      icon: <Truck className="w-8 h-8 text-primary" />,
      title: 'Expert Installation',
      description:
        'Our certified technicians will install the LPG kit on your bike, ensuring optimal performance and safety.',
      illustration: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full"
          aria-hidden="true"
        >
          <path d="M13.8284 2.17157C13.4379 1.78105 12.8047 1.78105 12.4142 2.17157L10.5858 4L7.75736 1.17157C7.36684 0.781048 6.73367 0.781048 6.34315 1.17157L1.17157 6.34315C0.781048 6.73367 0.781048 7.36684 1.17157 7.75736L4 10.5858L2.17157 12.4142C1.78105 12.8047 1.78105 13.4379 2.17157 13.8284L10.1716 21.8284C10.5621 22.219 11.1953 22.219 11.5858 21.8284L13.4142 20L16.2426 22.8284C16.6332 23.219 17.2663 23.219 17.6569 22.8284L22.8284 17.6569C23.219 17.2663 23.219 16.6332 22.8284 16.2426L20 13.4142L21.8284 11.5858C22.219 11.1953 22.219 10.5621 21.8284 10.1716L13.8284 2.17157Z" />
        </svg>
      ),
    },
    {
      icon: <Activity className="w-8 h-8 text-primary" />,
      title: 'Test & Calibration',
      description:
        'Experience the smooth transition to LPG with a supervised test drive and fine-tune the system for your bike.',
      illustration: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full"
          aria-hidden="true"
        >
          <path d="M5 19H19V5H5V19ZM21 21H3V3H21V21ZM15 7V9H9V7H15ZM15 11V13H9V11H15ZM15 15V17H9V15H15ZM7 17H6V16H7V17ZM7 13H6V12H7V13ZM7 9H6V8H7V9ZM18 17H17V16H18V17ZM18 13H17V12H18V13ZM18 9H17V8H18V9Z" />
        </svg>
      ),
    },
    {
      icon: <Truck className="w-8 h-8 text-primary" />,
      title: 'Regular Maintenance',
      description:
        'Benefit from our scheduled maintenance services to keep your LPG system running efficiently.',
      illustration: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full"
          aria-hidden="true"
        >
          <path d="M8.00009 19C8.00009 20.1046 7.10466 21 6.00009 21C4.89552 21 4.00009 20.1046 4.00009 19C4.00009 17.8954 4.89552 17 6.00009 17C7.10466 17 8.00009 17.8954 8.00009 19ZM20.0001 19C20.0001 20.1046 19.1047 21 18.0001 21C16.8955 21 16.0001 20.1046 16.0001 19C16.0001 17.8954 16.8955 17 18.0001 17C19.1047 17 20.0001 17.8954 20.0001 19ZM22.0001 7L21.0001 15H3.00009L2.00009 7H22.0001ZM22.0001 5H2.00009V3H22.0001V5Z" />
        </svg>
      ),
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: 'Long-Term Support',
      description:
        'Enjoy ongoing technical support, upgrades, and assistance for the lifetime of your LPG system.',
      illustration: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full"
          aria-hidden="true"
        >
          <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z" />
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <Container>
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-primary">
              Our LPG Conversion Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Embark on a seamless transition to eco-friendly LPG for your bike
              with our comprehensive service process.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className="w-full lg:w-1/2 ">
                  <ServiceStep
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    illustration={service.illustration}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
