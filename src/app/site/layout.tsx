import Footer from '@/components/footer/Footer';
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
        <div className='mt-[65px]'>

        </div>
        {children}
        <div>
          <Footer/>
        </div>
      </div>
    </SmoothScroll>
  );
}
