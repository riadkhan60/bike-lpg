import Navigation from '@/components/Navigation/Navigation';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div >
      <div>
        <Navigation />
      </div>
      {children}
    </div>
  );
}