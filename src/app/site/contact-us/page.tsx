import ContactUS from '@/components/ContactUs/ContactUs';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Contact Bike Lpg for products, dealership, any questions, or suggestions. We're here to help you find the perfect bike conversion kit for your needs.",
};
export default function page() {
  return (
    <div>
      <ContactUS />
    </div>
  );
}
