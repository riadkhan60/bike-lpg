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

interface ComponentSlide {
  type: 'component';
  content: React.ReactNode;
}

type Slide = ImageSlide | ComponentSlide;

// Slider data
const slidesData: Slide[] = [
  {
    type: 'component',
    content: (
      <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-4xl">
        Custom Content
      </div>
    ),
  },
  {
    type: 'image',
    src: '/d.png',
    alt: 'Nature 5',
    mobile: '/d-mobile.png',
  },
  {
    type: 'image',
    src: '/i.png',
    alt: 'Nature 5',
    mobile: '/i-mobile.png',
  },
];

const SwiperContainer: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
      goToSlide((activeIndex + 1) % slidesData.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const renderPaginationButtons = () => {
    return (
      <div className="custom-pagination">
        {slidesData.map((_, index) => (
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
        {slidesData.map((slide, index) => (
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
        ))}
      </div>

      <div className="absolute bottom-[10px] right-[10px] z-10">
        {renderPaginationButtons()}
      </div>
    </div>
  );
};

export default SwiperContainer;
