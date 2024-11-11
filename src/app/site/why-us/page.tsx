import WhyUs from '@/components/WhyUS/WhuUs'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Why Us',
  description:
    'Choose Bike LPG for trusted quality, expert support, and a vast dealer network across Bangladesh. Enjoy fuel savings, reliability, and eco-friendly bike conversions with us!',
};

export default function page() {
  return (
    <div><WhyUs/></div>
  )
}
