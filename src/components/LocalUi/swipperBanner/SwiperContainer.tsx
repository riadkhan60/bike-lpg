'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface ImageSlide {
  type: 'image';
  src: string;
  alt: string;
  mobile?: string;
}
interface Banner {
  id: string;
  largeScreenUrl: string;
  smallScreenUrl: string;
}
interface ComponentSlide {
  type: 'component';
  content: React.ReactNode;
}

type Slide = ImageSlide | ComponentSlide;

// Slider data
const initialSlides: Slide[] = [
  {
    type: 'component',
    content: (
      <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-4xl">
        Custom Content
      </div>
    ),
  },
];

const SwiperContainer: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [slides, setSlides] = useState<Slide[]>(initialSlides); // Use initialSlides instead of slidesData

 console.log(slides);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/cms');
      const data = await response.json();

      
      const newSlides = data.banners.map((banner: Banner) => ({
        type: 'image',
        src: banner.largeScreenUrl,
        alt: 'banner',
        mobile: banner.smallScreenUrl,
      }));

      
      setSlides((prevSlides) => [...prevSlides, ...newSlides]); // Append new slides to initialSlides
    }

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1280);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((activeIndex + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [activeIndex, slides.length]); // Make sure the interval depends on `slides.length`

  const renderPaginationButtons = () => {
    return (
      <div className="custom-pagination">
        {slides.map((_, index) => (
          <button
            key={index}
            className={clsx('pagination-button', {
              active: index === activeIndex,
            })}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    );
  };

  const renderSlideContent = (slide: Slide) => {
    if (slide.type === 'component') {
      return slide.content;
    } else {
      const { src, alt, mobile } = slide;
      return (
        <Image
          fill
          className="w-full h-full object-cover"
          alt={alt}
          src={isMobile && mobile ? mobile : src}
          priority={activeIndex === 0}
          quality={100}
        />
      );
    }
  };

  return (
    <div className="relative w-full h-[366px] md:h-[454px] lg:h-[537px] xl:h-[650px]">
      <div className="relative w-full h-full overflow-hidden">
        {slides.map(
          (
            slide,
            index, // Use `slides` here instead of `slidesData`
          ) => (
            <div
              key={index}
              className={clsx(
                'absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out',
                {
                  'opacity-0': index !== activeIndex,
                  'opacity-100': index === activeIndex,
                },
              )}
              style={{ zIndex: index === activeIndex ? 1 : 0 }}
            >
              {renderSlideContent(slide)}
            </div>
          ),
        )}
      </div>

      <div className="absolute bottom-[10px] right-[10px] z-10">
        {renderPaginationButtons()}
      </div>
    </div>
  );
};

export default SwiperContainer;
