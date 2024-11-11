import FillingStation from '@/components/FillingStation/FillingStation'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'Jannat Petroleum',
};

export default function page() {
  
  return (
    <div>
      <FillingStation/>
    </div>
  )
}
