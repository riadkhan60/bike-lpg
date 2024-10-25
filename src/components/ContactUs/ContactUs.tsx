'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  LinkedinIcon,
  Clock,
} from 'lucide-react';
import Container from '../LocalUi/container/Container';
import FAQSection from './FAQ';
import ContactUsForm from './ContactUsForm';

const ContactInfo = ({
  icon: Icon,
  title,
  content,
  link = '',
  className = '',
}: {
  icon: React.ElementType;
  title: string;
  content: string;
  link?: string;
  className?: string;
}) => (
  <motion.div whileHover={{ y: -2 }} className="flex items-center space-x-4">
    <div className="bg-primary/10 p-3 rounded-full">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <div>
      <h3 className="font-medium text-base">{title}</h3>
      {link ? (
        <a
          href={link}
          className={`text-muted-foreground hover:text-primary transition-colors ${className}`}
        >
          {content}
        </a>
      ) : (
        <p className="text-muted-foreground">{content}</p>
      )}
    </div>
  </motion.div>
);

const SocialLink = ({
  icon: Icon,
  href,
  label,
}: {
  icon: React.ElementType;
  href: string;
  label: string;
}) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="bg-primary/10 p-4 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
    aria-label={label}
  >
    <Icon className="w-6 h-6" />
  </motion.a>
);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function ContactUS() {
  

  return (
    <>
      <div className="min-h-screen bg-background">
        <Container>
          <main className=" mx-auto py-16 space-y-24">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl max-md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#7a462a] to-[#FF9900]">
                Contact Us
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {" We'd"} love to hear from you. Whether you have a question
                about our services, pricing, or anything else, our team is ready
                to answer all your questions.
              </p>
            </motion.div>

            {/* Main Contact Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="space-y-8"
              >
                <Card className="p-6">
                  <CardContent className="p-0">
                    <ContactUsForm />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="space-y-12"
              >
                {/* Map */}
                <Card className="overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d227.35795708366723!2d89.91902310374823!3d24.25131434176706!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1729610630047!5m2!1sen!2sbd"
                    width="100%"
                    height="300"
                    className="border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Card>

                {/* Contact Details */}
                <div className="space-y-6">
                  <ContactInfo
                    icon={MapPin}
                    title="Visit Us"
                    content="123 Business Avenue, Tech District, City, 12345"
                  />
                  <ContactInfo
                    icon={Mail}
                    title="Email Us"
                    content="contact@msjannattraders.com"
                    link="mailto:contact@msjannattraders.com"
                  />
                  <ContactInfo
                    icon={Phone}
                    title="Call Us"
                    content="+1 (555) 123-4567"
                    link="tel:+15551234567"
                  />
                  <ContactInfo
                    icon={Clock}
                    title="Business Hours"
                    content="Monday - Friday: 9:00 AM - 6:00 PM"
                  />
                </div>

                {/* Social Media Links */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <SocialLink
                      icon={Facebook}
                      href="https://facebook.com"
                      label="Facebook"
                    />
                    <SocialLink
                      icon={Twitter}
                      href="https://twitter.com"
                      label="Twitter"
                    />
                    <SocialLink
                      icon={Instagram}
                      href="https://instagram.com"
                      label="Instagram"
                    />
                    <SocialLink
                      icon={LinkedinIcon}
                      href="https://linkedin.com"
                      label="LinkedIn"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Business Hours Card */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="max-w-4xl mx-auto"
            >
              <Card>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Regular Hours
                      </h3>
                      <div className="space-y-2 text-muted-foreground">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Holiday Hours
                      </h3>
                      <p className="text-muted-foreground">
                        Our hours may vary during holidays. Please call ahead or
                        check our social media for current hours during
                        holidays.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </main>
        </Container>
      </div>
      <FAQSection />
    </>
  );
}
