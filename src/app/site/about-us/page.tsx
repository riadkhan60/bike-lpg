import AboutUsPage from '@/components/AboutUs/AboutUs'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Bike LPG is Bangladesh's leading provider of LPG bike conversion kits, committed to quality, safety, and sustainability. With a robust dealer network and exceptional customer support, we empower riders to enjoy fuel savings and eco-friendly travel.",
};
export default function page() {
  return (
    <div><AboutUsPage /></div>
  )
}
