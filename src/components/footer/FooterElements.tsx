'use client';

import React, { useEffect, useState } from 'react';

import {
  IconBrandFacebook as Facebook,
  IconBrandWhatsapp as Whatsapp,
  IconBrandTiktok as Tiktok,
  IconBrandYoutube as Youtube,
} from '@tabler/icons-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '../LocalUi/container/Container';
import FooterSubscriberInput from './FooterSubscriberInput';

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

export default function FooterElements({
  authButton,
}: {
  authButton: React.ReactNode;
}) {
  const [contacts, setContacts] = useState({} as ContactData);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/contacts');
        const data = await response.json();
        setContacts(data[2]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, []);

  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Container>
      <motion.footer
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white text-gray-800 border-t border-gray-200"
      >
        <div className=" mx-auto  py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                About MS Jannat Traders
              </h3>
              <p className="text-sm">
                Leading the way in LPG technology all over the Bangladesh.{' '}
                {"We're"} committed to innovation and sustainability in all our
                ventures.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Our Products', href: '/bike-lpg/our-products' },
                  { label: 'About Us', href: '/site/about-us' },
                  { label: 'Contact Us', href: '/site/contact-us' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="text-sm hover:text-primary transition-colors">
                  {authButton}
                </li>
              </ul>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Our Businesses
              </h3>
              <ul className="space-y-2">
                {[
                  {
                    label: 'Bike Lpg',
                    href: '/bike-lpg',
                  },
                  {
                    label: 'Jannat Petroleum',
                    href: '/site/jannat-petroleum',
                  },
                  {
                    label: 'Sr Design House',
                    href: '/site/sr-design-house',
                  },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Newsletter
              </h3>
              <p className="text-sm">
                Stay updated with our latest news and offers.
              </p>
              <FooterSubscriberInput />
            </motion.div>
          </div>
          <motion.hr variants={itemVariants} className="my-8 border-gray-200" />
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <p className="text-sm text-gray-600">
              &copy; {currentYear} MS Jannat Traders. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {[
                {
                  icon: <Youtube className="h-5 w-5" />,
                  href: contacts.youtube,
                  label: 'Twitter',
                },
                {
                  icon: <Facebook className="h-5 w-5" />,
                  href: contacts.facebook,
                  label: 'Facebook',
                },
                {
                  icon: <Tiktok className="h-5 w-5" />,
                  href: contacts.tiktok,
                  label: 'Instagram',
                },
                {
                  icon: <Whatsapp className="h-5 w-5" />,
                  href: `https://wa.me/${contacts.whatsapp}?text=Hello%2C%20I%27m%20interested%20in%20your%20services%21`,
                  label: 'LinkedIn',
                },
              ].map((social) => (
                <a
                  key={social.label}
                  target="_blank"
                  href={social.href}
                  className="text-gray-600 hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </Container>
  );
}
