import Navigation from '@/components/Navigation/Navigation';
import SmoothScroll from '@/components/smoothScroll/SmoothScroll';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div>
        <div>
          <Navigation />
        </div>
        {children}
      </div>
    </SmoothScroll>
  );
}
