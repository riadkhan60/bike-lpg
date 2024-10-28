'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import {
  IconBrandFacebook as Facebook,
  IconBrandWhatsapp as Whatsapp,
  IconBrandTiktok as Tiktok,
  IconBrandInstagram as Instagram,
  IconBrandLinkedin as Linkedin,
  IconBrandYoutube as Youtube,
} from '@tabler/icons-react';
import Container from '../LocalUi/container/Container';
import FAQSection from './FAQ';
import ContactUsForm from './ContactUsForm';

// Type definitions
interface ContactData {
  companyId?: string;
  location?: string;
  email?: string;
  phone?: string;
  facebook?: string;
  whatsapp?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  youtube?: string;
}

interface ContactInfoProps {
  icon: React.ElementType;
  title: string;
  content: string;
  link?: string;
  className?: string;
}

interface SocialLinkProps {
  icon: React.ElementType;
  href: string;
  label: string;
}

// Skeleton components
const SkeletonContactInfo = () => (
  <div className="flex items-center space-x-4">
    <div className="bg-primary/5 p-3 rounded-full animate-pulse">
      <div className="w-6 h-6" />
    </div>
    <div className="space-y-2">
      <div className="h-5 w-24 bg-primary/5 rounded animate-pulse" />
      <div className="h-4 w-32 bg-primary/5 rounded animate-pulse" />
    </div>
  </div>
);

const SkeletonSocialLink = () => (
  <div className="bg-primary/5 p-4 rounded-full animate-pulse">
    <div className="w-6 h-6" />
  </div>
);

const ContactInfo: React.FC<ContactInfoProps> = ({
  icon: Icon,
  title,
  content,
  link = '',
  className = '',
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

const SocialLink: React.FC<SocialLinkProps> = ({ icon: Icon, href, label }) =>
  href && (
    <motion.a
      href={href}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="bg-primary/10 p-4 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="w-6 h-6" />
    </motion.a>
  );

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const ContactUS: React.FC = () => {
  const [data, setData] = React.useState<ContactData>({});
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/contacts');
        const contactData: ContactData[] = await response.json();
        const bikeLpg = contactData.find(
          (company) => company.companyId === '1',
        );
        console.log(bikeLpg);
        setData(bikeLpg || {});
      } catch (error) {
        console.error('Error fetching contact data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Dummy data for development
  const dummyData: ContactData = {
    location: 'Loading...',
    email: 'Loading...',
    phone: 'Loading...',
    facebook: '#',
    whatsapp: '#',
    instagram: '#',
    linkedin: '#',
    tiktok: '#',
    youtube: '#',
  };

  const displayData = loading ? dummyData : data;

  return (
    <>
      <div className="min-h-screen bg-background">
        <Container>
          <main className="mx-auto py-16 space-y-24">
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
                {"We'd"} love to hear from you. Whether you have a question
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
                  />
                </Card>

                {/* Contact Details */}
                <div className="space-y-6">
                  {loading ? (
                    <>
                      <SkeletonContactInfo />
                      <SkeletonContactInfo />
                      <SkeletonContactInfo />
                      <SkeletonContactInfo />
                    </>
                  ) : (
                    <>
                      {displayData.location && (
                        <ContactInfo
                          icon={MapPin}
                          title="Visit Us"
                          content={displayData.location}
                        />
                      )}
                      {displayData.email && (
                        <ContactInfo
                          icon={Mail}
                          title="Email Us"
                          content={displayData.email}
                          link={`mailto:${displayData.email}`}
                        />
                      )}
                      {displayData.phone && (
                        <ContactInfo
                          icon={Phone}
                          title="Call Us"
                          content={displayData.phone}
                          link={`tel:${displayData.phone}`}
                        />
                      )}
                      <ContactInfo
                        icon={Clock}
                        title="Business Hours"
                        content="Monday - Friday: 9:00 AM - 6:00 PM"
                      />
                    </>
                  )}
                </div>

                {/* Social Media Links */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Connect With Us</h3>
                  <div className="grid grid-cols-4 w-fit gap-4">
                    {loading ? (
                      <>
                        <SkeletonSocialLink />
                        <SkeletonSocialLink />
                        <SkeletonSocialLink />
                        <SkeletonSocialLink />
                      </>
                    ) : (
                      <>
                        {displayData.facebook && (
                          <SocialLink
                            icon={Facebook}
                            href={displayData.facebook}
                            label="Facebook"
                          />
                        )}
                        {displayData.whatsapp && (
                          <SocialLink
                            icon={Whatsapp}
                            href={`https://wa.me/${displayData.whatsapp}?text=Hello%2C%20I%27m%20interested%20in%20your%20services%21`}
                            label="Whatsapp"
                          />
                        )}
                        {displayData.instagram && (
                          <SocialLink
                            icon={Instagram}
                            href={displayData.instagram}
                            label="Instagram"
                          />
                        )}
                        {displayData.linkedin && (
                          <SocialLink
                            icon={Linkedin}
                            href={displayData.linkedin}
                            label="LinkedIn"
                          />
                        )}
                        {displayData.tiktok && (
                          <SocialLink
                            icon={Tiktok}
                            href={displayData.tiktok}
                            label="Tiktok"
                          />
                        )}
                        {displayData.youtube && (
                          <SocialLink
                            icon={Youtube}
                            href={displayData.youtube}
                            label="Youtube"
                          />
                        )}
                      </>
                    )}
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
      <FAQSection number={displayData.phone ?? ''} />
    </>
  );
};

export default ContactUS;
