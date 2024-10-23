'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  className,
}: {
  items: {
    image: string;
  }[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    function addAnimation() {
      if (containerRef.current && scrollerRef.current) {
        const scrollerContent = Array.from(scrollerRef.current.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });

        getDirection();
        getSpeed();
        setStart(true);
      }
    }

    const getSpeed = () => {
      if (containerRef.current) {
        if (speed === 'fast') {
          containerRef.current.style.setProperty('--animation-duration', '20s');
        } else if (speed === 'normal') {
          containerRef.current.style.setProperty('--animation-duration', '40s');
        } else {
          containerRef.current.style.setProperty('--animation-duration', '80s');
        }
      }
    };

    const getDirection = () => {
      if (containerRef.current) {
        if (direction === 'left') {
          containerRef.current.style.setProperty(
            '--animation-direction',
            'forwards',
          );
        } else {
          containerRef.current.style.setProperty(
            '--animation-direction',
            'reverse',
          );
        }
      }
    };

    addAnimation();
  }, [direction, speed, pauseOnHover]);

  const [start, setStart] = useState(false);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative z-20 max-w-7xl overflow-hidden flex justify-center items-center', // Added items-center for vertical centering
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex justify-center gap-4 py-4 w-max flex-nowrap',
          start && 'animate-scroll ',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        {items.map((item, index) => (
          <li
            className="w-[350px] h-[250px] max-w-full relative rounded-2xl  flex-shrink-0 px-8 py-6 md:w-[450px]"
            key={index}
          >
            <Image
              src={item.image}
              alt={'image'}
              fill
              className="rounded-lg object-cover opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-105"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
