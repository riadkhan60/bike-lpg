import FurnitureHouse from '@/components/FurnitureHouse/FurnitureHouse'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'SR Design House',
};

export default function page() {
  return (
    <div><FurnitureHouse /></div>
  )
}
