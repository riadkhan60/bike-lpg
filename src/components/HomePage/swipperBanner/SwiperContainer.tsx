'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

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

interface Banner {
  id: string;
  largeScreenUrl: string;
  smallScreenUrl: string;
}

const initialSlides: Slide[] = [
  {
    type: 'component',
    content: (
      <div className="relative h-full w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            backgroundImage: "url('/bg.png')",
          }}
        >
          <motion.div
            className="absolute inset-0 bg-[#FF9900]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>
        <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4 max-sm:mb-2 text-xl font-extrabold tracking-tight text-white sm:text-3xl md:text-6xl"
            >
              New Step in Solution for your life
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 max-md:mb-4 max-w-3xl max-md:w-[70%] text-[14px] text-gray-100 sm:text-2xl"
            >
              We offer innovative solutions that simplify life, promote
              sustainability, and support a eco-friendly future.
            </motion.p>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                Bike LPG
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                Contact Us
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function EnhancedSwiperContainer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [initialAnimationComplete, setInitialAnimationComplete] =
    useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/cms');
      const data = await response.json();

      const newSlides = data.banners.map((banner: Banner) => ({
        type: 'image' as const,
        src: banner.largeScreenUrl,
        alt: 'banner',
        mobile: banner.smallScreenUrl,
      }));

      setSlides((prevSlides) => [...prevSlides, ...newSlides]);
    } catch (error) {
      console.error('Error fetching slides:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialAnimationComplete(true);
      fetchData();
    }, 2000); // Adjust this delay as needed

    return () => clearTimeout(timer);
  }, [fetchData]);

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

  useEffect(() => {
    if (!isPaused && !isLoading && initialAnimationComplete) {
      timeoutRef.current = setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 7000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    activeIndex,
    isPaused,
    slides.length,
    isLoading,
    initialAnimationComplete,
  ]);

  const pauseAutoSlide = () => {
    setIsPaused(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const resumeAutoSlide = () => {
    setIsPaused(false);
  };

  const goToSlide = (index: number) => {
    pauseAutoSlide();
    setActiveIndex(index);
    setTimeout(resumeAutoSlide, 3000);
  };

  const goToPrevSlide = () => {
    pauseAutoSlide();
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
    );
    setTimeout(resumeAutoSlide, 3000);
  };

  const goToNextSlide = () => {
    pauseAutoSlide();
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    setTimeout(resumeAutoSlide, 3000);
  };

  const renderSlideContent = (slide: Slide) => {
    if (slide.type === 'component') {
      return slide.content;
    } else {
      const { src, alt, mobile } = slide;
      return (
        <Image
          fill
          className="object-cover"
          alt={alt}
          src={isMobile && mobile ? mobile : src}
          sizes="100vw"
          priority={activeIndex === 0}
          quality={100}
        />
      );
    }
  };

  return (
    <div className="relative w-full bg-black h-[366px] md:h-[454px] lg:h-[537px] xl:h-[650px] overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute top-0 left-0 w-full h-full"
        >
          {renderSlideContent(slides[activeIndex])}
        </motion.div>
      </AnimatePresence>

      {initialAnimationComplete && (
        <>
          <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex space-x-2"
            >
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full transition-all duration-300"
            onClick={goToPrevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full transition-all duration-300"
            onClick={goToNextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </>
      )}
    </div>
  );
}

// v1

// 'use client';

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import clsx from 'clsx';
// import { Button } from '@/components/ui/button';
// import { ArrowRight } from 'lucide-react';

// interface ImageSlide {
//   type: 'image';
//   src: string;
//   alt: string;
//   mobile?: string;
// }
// interface Banner {
//   id: string;
//   largeScreenUrl: string;
//   smallScreenUrl: string;
// }
// interface ComponentSlide {
//   type: 'component';
//   content: React.ReactNode;
// }

// type Slide = ImageSlide | ComponentSlide;

// // Slider data
// const initialSlides: Slide[] = [
//   {
//     type: 'component',
//     content: (
//       <div className="relative h-full w-full overflow-hidden">
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
//           }}
//         >
//           <div className="absolute inset-0 bg-black/60" />
//         </div>
//         <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-center text-center">
//             <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
//               New Step in Solution for your life
//             </h1>
//             <p className="mb-8 max-w-3xl text-xl text-gray-300 sm:text-2xl">
//               We provide innovative solutions and strategic guidance to help
//               your business thrive in {"today's"} competitive market.
//             </p>
//             <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
//               <Button
//                 size="lg"
//                 className="bg-primary text-primary-foreground hover:bg-primary/90"
//               >
//                 Our Services
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="bg-white text-gray-900 hover:bg-gray-100"
//               >
//                 Contact Us
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     ),
//   },
// ];

// const SwiperContainer: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const [slides, setSlides] = useState<Slide[]>(initialSlides); // Use initialSlides instead of slidesData

//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch('/api/cms');
//       const data = await response.json();

//       const newSlides = data.banners.map((banner: Banner) => ({
//         type: 'image',
//         src: banner.largeScreenUrl,
//         alt: 'banner',
//         mobile: banner.smallScreenUrl,
//       }));

//       setSlides((prevSlides) => [...prevSlides, ...newSlides]); // Append new slides to initialSlides
//     }

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 1280);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const goToSlide = (index: number) => {
//     setActiveIndex(index);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       goToSlide((activeIndex + 1) % slides.length);
//     }, 10000);

//     return () => clearInterval(interval);
//   }, [activeIndex, slides.length]); // Make sure the interval depends on `slides.length`

//   const renderPaginationButtons = () => {
//     return (
//       <div className="custom-pagination">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={clsx('pagination-button', {
//               active: index === activeIndex,
//             })}
//             onClick={() => goToSlide(index)}
//           ></button>
//         ))}
//       </div>
//     );
//   };

//   const renderSlideContent = (slide: Slide) => {
//     if (slide.type === 'component') {
//       return slide.content;
//     } else {
//       const { src, alt, mobile } = slide;
//       return (
//         <Image
//           fill
//           className="w-full h-full object-cover"
//           alt={alt}
//           src={isMobile && mobile ? mobile : src}
//           priority={activeIndex === 0}
//           quality={100}
//         />
//       );
//     }
//   };

//   return (
//     <div className="relative w-full bg-black h-[366px] md:h-[454px] lg:h-[537px] xl:h-[650px]">
//       <div className="relative w-full h-full overflow-hidden">
//         {slides.map(
//           (
//             slide,
//             index, // Use `slides` here instead of `slidesData`
//           ) => (
//             <div
//               key={index}
//               className={clsx(
//                 'absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out',
//                 {
//                   'opacity-0': index !== activeIndex,
//                   'opacity-100': index === activeIndex,
//                 },
//               )}
//               style={{ zIndex: index === activeIndex ? 1 : 0 }}
//             >
//               {renderSlideContent(slide)}
//             </div>
//           ),
//         )}
//       </div>

//       <div className="absolute bottom-[10px] right-[10px] z-10">
//         {renderPaginationButtons()}
//       </div>
//     </div>
//   );
// };

// export default SwiperContainer;

// v2

// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

// interface ImageSlide {
//   type: 'image';
//   src: string;
//   alt: string;
//   mobile?: string;
// }

// interface ComponentSlide {
//   type: 'component';
//   content: React.ReactNode;
// }

// type Slide = ImageSlide | ComponentSlide;

// interface Banner {
//   id: string;
//   largeScreenUrl: string;
//   smallScreenUrl: string;
// }

// const initialSlides: Slide[] = [];

// const componentSlideMain: Slide = {
//   type: 'component',
//   content: (
//     <div className="relative h-full w-full overflow-hidden">
//       <motion.div
//         className="absolute inset-0 bg-cover bg-center"
//         initial={{ scale: 1.2, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 1.5, ease: 'easeOut' }}
//         style={{
//           backgroundImage: "url('/bg.png')",
//         }}
//       >
//         <motion.div
//           className="absolute inset-0 bg-[#FF9900]"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 0.8 }}
//           transition={{ duration: 1, delay: 0.5 }}
//         />
//       </motion.div>
//       <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col items-center justify-center text-center">
//           <motion.h1
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="mb-4 max-sm:mb-2 text-xl font-extrabold tracking-tight text-white sm:text-3xl md:text-6xl"
//           >
//             New Step in Solution for your life
//           </motion.h1>
//           <motion.p
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="mb-8 max-md:mb-4 max-w-3xl max-md:w-[70%] text-[14px] text-gray-100 sm:text-2xl"
//           >
//             We offer innovative solutions that simplify life, promote
//             sustainability, and support a eco-friendly future.
//           </motion.p>
//           <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//             className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
//           >
//             <Button
//               size="lg"
//               className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105"
//             >
//               Bike LPG
//               <ArrowRight className="ml-2 h-5 w-5" />
//             </Button>
//             <Button
//               size="lg"
//               variant="outline"
//               className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
//             >
//               Contact Us
//             </Button>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   ),
// };

// export default function EnhancedSwiperContainer() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [slides, setSlides] = useState<Slide[]>(initialSlides);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const fetchData = useCallback(async () => {
//     try {
//       const response = await fetch('/api/cms');
//       const data = await response.json();

//       const newSlides = data.banners.map((banner: Banner) => ({
//         type: 'image' as const,
//         src: banner.largeScreenUrl,
//         alt: 'banner',
//         mobile: banner.smallScreenUrl,
//       }));

//       setSlides((prevSlides) => [...prevSlides, ...newSlides]);
//     } catch (error) {
//       console.error('Error fetching slides:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 1280);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     if (!isPaused) {
//       timeoutRef.current = setTimeout(() => {
//         setActiveIndex((prevIndex) => ((prevIndex + 1) % slides.length) + 1);
//       }, 7000);
//     }

//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, [activeIndex, isPaused, slides.length]);

//   const pauseAutoSlide = () => {
//     setIsPaused(true);
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   };

//   const resumeAutoSlide = () => {
//     setIsPaused(false);
//   };

//   const goToSlide = (index: number) => {
//     pauseAutoSlide();
//     setActiveIndex(index);
//     setTimeout(resumeAutoSlide, 3000);
//   };

//   const goToPrevSlide = () => {
//     pauseAutoSlide();
//     setActiveIndex(
//       (prevIndex) => ((prevIndex - 1 + slides.length) % slides.length) + 1,
//     );
//     setTimeout(resumeAutoSlide, 3000);
//   };

//   const goToNextSlide = () => {
//     pauseAutoSlide();
//     setActiveIndex((prevIndex) => ((prevIndex + 1) % slides.length) + 1);
//     setTimeout(resumeAutoSlide, 3000);
//   };

//   const renderSlideContent = (slide: Slide) => {
//     if (slide.type === 'component') {
//       return slide.content;
//     } else {
//       const { src, alt, mobile } = slide;
//       return (
//         <Image
//           fill
//           className="object-cover"
//           alt={alt}
//           src={isMobile && mobile ? mobile : src}
//           sizes="100vw"
//           priority={activeIndex === 0}
//           quality={100}
//         />
//       );
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center w-full h-[650px] bg-gray-100">
//         <Loader2 className="w-8 h-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full bg-black h-[366px] md:h-[454px] lg:h-[537px] xl:h-[650px] overflow-hidden">
//       <AnimatePresence initial={false}>
//         {slides.map((slide, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, scale: 1.1 }}
//             animate={
//               index === activeIndex
//                 ? { opacity: 1, scale: 1, transition: { duration: 0.7 } }
//                 : {}
//             }
//             exit={{ opacity: 0, transition: { duration: 0.5 } }}
//             className={`absolute top-0 left-0 w-full h-full ${
//               index === activeIndex ? 'z-20' : 'z-10'
//             }`}
//           >
//             {renderSlideContent(componentSlideMain)}
//             {renderSlideContent(slide)}
//           </motion.div>
//         ))}
//       </AnimatePresence>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 0.5 }}
//         className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30"
//       >
//         <div className="flex space-x-2">
//           {slides.map((_, index) => (
//             <motion.button
//               key={index}
//               whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.9 }}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === activeIndex
//                   ? 'bg-white scale-125'
//                   : 'bg-white/50 hover:bg-white/75'
//               }`}
//               onClick={() => goToSlide(index)}
//             />
//           ))}
//         </div>
//       </motion.div>

//       <motion.button
//         whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
//         whileTap={{ scale: 0.9 }}
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full transition-all duration-300"
//         onClick={goToPrevSlide}
//       >
//         <ChevronLeft className="w-6 h-6" />
//       </motion.button>
//       <motion.button
//         whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
//         whileTap={{ scale: 0.9 }}
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full transition-all duration-300"
//         onClick={goToNextSlide}
//       >
//         <ChevronRight className="w-6 h-6" />
//       </motion.button>
//     </div>
//   );
// }

// v3

// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

// interface ImageSlide {
//   type: 'image';
//   src: string;
//   alt: string;
//   mobile?: string;
// }

// interface ComponentSlide {
//   type: 'component';
//   content: React.ReactNode;
// }

// type Slide = ImageSlide | ComponentSlide;

// interface Banner {
//   id: string;
//   largeScreenUrl: string;
//   smallScreenUrl: string;
// }

// const initialSlides: Slide[] = [
//   {
//     type: 'component',
//     content: (
//       <div className="relative h-full w-full overflow-hidden">
//         <motion.div
//           className="absolute inset-0 bg-cover bg-center"
//           initial={{ scale: 1.2, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 1.5, ease: 'easeOut' }}
//           style={{
//             backgroundImage: "url('/bg.png')",
//           }}
//         >
//           <motion.div
//             className="absolute inset-0 bg-[#FF9900]"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.8 }}
//             transition={{ duration: 1, delay: 0.5 }}
//           />
//         </motion.div>
//         <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-center text-center">
//             <motion.h1
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="mb-4 max-sm:mb-2 text-xl font-extrabold tracking-tight text-white sm:text-3xl md:text-6xl"
//             >
//               New Step in Solution for your life
//             </motion.h1>
//             <motion.p
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="mb-8 max-md:mb-4 max-w-3xl max-md:w-[70%] text-[14px] text-gray-100 sm:text-2xl"
//             >
//               We offer innovative solutions that simplify life, promote
//               sustainability, and support a eco-friendly future.
//             </motion.p>
//             <motion.div
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.6 }}
//               className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
//             >
//               <Button
//                 size="lg"
//                 className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105"
//               >
//                 Bike LPG
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
//               >
//                 Contact Us
//               </Button>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     ),
//   },
// ];

// export default function EnhancedSwiperContainer() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [slides, setSlides] = useState<Slide[]>(initialSlides);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const fetchData = useCallback(async () => {
//     try {
//       const response = await fetch('/api/cms');
//       const data = await response.json();

//       const newSlides = data.banners.map((banner: Banner) => ({
//         type: 'image' as const,
//         src: banner.largeScreenUrl,
//         alt: 'banner',
//         mobile: banner.smallScreenUrl,
//       }));

//       setSlides((prevSlides) => [...prevSlides, ...newSlides]);
//     } catch (error) {
//       console.error('Error fetching slides:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 1280);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     if (!isPaused && !isLoading) {
//       timeoutRef.current = setTimeout(() => {
//         setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
//       }, 7000);
//     }

//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, [activeIndex, isPaused, slides.length, isLoading]);

//   const pauseAutoSlide = () => {
//     setIsPaused(true);
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   };

//   const resumeAutoSlide = () => {
//     setIsPaused(false);
//   };

//   const goToSlide = (index: number) => {
//     pauseAutoSlide();
//     setActiveIndex(index);
//     setTimeout(resumeAutoSlide, 3000);
//   };

//   const goToPrevSlide = () => {
//     pauseAutoSlide();
//     setActiveIndex(
//       (prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
//     );
//     setTimeout(resumeAutoSlide, 3000);
//   };

//   const goToNextSlide = () => {
//     pauseAutoSlide();
//     setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
//     setTimeout(resumeAutoSlide, 3000);
//   };

//   const renderSlideContent = (slide: Slide) => {
//     if (slide.type === 'component') {
//       return slide.content;
//     } else {
//       const { src, alt, mobile } = slide;
//       return (
//         <Image
//           fill
//           className="object-cover"
//           alt={alt}
//           src={isMobile && mobile ? mobile : src}
//           sizes="100vw"
//           priority={activeIndex === 0}
//           quality={100}
//         />
//       );
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center w-full h-[650px] bg-gray-100">
//         <Loader2 className="w-8 h-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full bg-black h-[366px] md:h-[454px] lg:h-[537px] xl:h-[650px] overflow-hidden">
//       <AnimatePresence initial={false} mode="wait">
//         <motion.div
//           key={activeIndex}
//           initial={{ opacity: 0, scale: 1.1 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.7 }}
//           className="absolute top-0 left-0 w-full h-full"
//         >
//           {renderSlideContent(slides[activeIndex])}
//         </motion.div>
//       </AnimatePresence>

//       <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 0.5 }}
//           className="flex space-x-2"
//         >
//           {slides.map((_, index) => (
//             <motion.button
//               key={index}
//               whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.9 }}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === activeIndex
//                   ? 'bg-white scale-125'
//                   : 'bg-white/50 hover:bg-white/75'
//               }`}
//               onClick={() => goToSlide(index)}
//             />
//           ))}
//         </motion.div>
//       </div>

//       <motion.button
//         whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
//         whileTap={{ scale: 0.9 }}
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full transition-all duration-300"
//         onClick={goToPrevSlide}
//       >
//         <ChevronLeft className="w-6 h-6" />
//       </motion.button>
//       <motion.button
//         whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
//         whileTap={{ scale: 0.9 }}
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full transition-all duration-300"
//         onClick={goToNextSlide}
//       >
//         <ChevronRight className="w-6 h-6" />
//       </motion.button>
//     </div>
//   );
// }

// // v4

// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

// interface ImageSlide {
//   type: 'image';
//   src: string;
//   alt: string;
//   mobile?: string;
// }

// interface ComponentSlide {
//   type: 'component';
//   content: React.ReactNode;
// }

// type Slide = ImageSlide | ComponentSlide;

// interface Banner {
//   id: string;
//   largeScreenUrl: string;
//   smallScreenUrl: string;
// }

// const initialSlides: Slide[] = [
//   {
//     type: 'component',
//     content: (
//       <div className="relative h-full w-full overflow-hidden">
//         <motion.div
//           className="absolute inset-0 bg-cover bg-center"
//           initial={{ scale: 1.2, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 1.5, ease: 'easeOut' }}
//           style={{
//             backgroundImage: "url('/bg.png')",
//           }}
//         >
//           <motion.div
//             className="absolute inset-0 bg-[#FF9900]"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.8 }}
//             transition={{ duration: 1, delay: 0.5 }}
//           />
//         </motion.div>
//         <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-center text-center">
//             <motion.h1
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="mb-4 max-sm:mb-2 text-xl font-extrabold tracking-tight text-white sm:text-3xl md:text-6xl"
//             >
//               New Step in Solution for your life
//             </motion.h1>
//             <motion.p
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="mb-8 max-md:mb-4 max-w-3xl max-md:w-[70%] text-[14px] text-gray-100 sm:text-2xl"
//             >
//               We offer innovative solutions that simplify life, promote
//               sustainability, and support a eco-friendly future.
//             </motion.p>
//             <motion.div
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.6 }}
//               className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
//             >
//               <Button
//                 size="lg"
//                 className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105"
//               >
//                 Bike LPG
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
//               >
//                 Contact Us
//               </Button>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     ),
//   },
// ];

// export default function EnhancedSwiperContainer() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [slides, setSlides] = useState<Slide[]>(initialSlides);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const fetchData = useCallback(async () => {
//     try {
//       const response = await fetch('/api/cms');
//       const data = await response.json();

//       const newSlides = data.banners.map((banner: Banner) => ({
//         type: 'image' as const,
//         src: banner.largeScreenUrl,
//         alt: 'banner',
//         mobile: banner.smallScreenUrl,
//       }));

//       setSlides((prevSlides) => [...prevSlides, ...newSlides]);
//     } catch (error) {
//       console.error('Error fetching slides:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 1280);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     if (!isPaused && !isLoading) {
//       timeoutRef.current = setTimeout(() => {
//         setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
//       }, 7000);
//     }

//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, [activeIndex, isPaused, slides.length, isLoading]);

//   const pauseAutoSlide = () => {
//     setIsPaused(true);
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   };

//   const resumeAutoSlide = () => {
//     setIsPaused(false);
//   };

//   const goToSlide = (index: number) => {
//     pauseAutoSlide();
//     setActiveIndex(index);
//     setTimeout(resumeAutoSlide, 3000);
//   };

//   const goToPrevSlide = () => {
//     pauseAutoSlide();
//     setActiveIndex(
//       (prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
//     );
//     setTimeout(resumeAutoSlide, 3000);
//   };

//   const goToNextSlide = () => {
//     pauseAutoSlide();
//     setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
//     setTimeout(resumeAutoSlide, 3000);
//   };

//   const renderSlideContent = (slide: Slide) => {
//     if (slide.type === 'component') {
//       return slide.content;
//     } else {
//       const { src, alt, mobile } = slide;
//       return (
//         <Image
//           fill
//           className="object-cover"
//           alt={alt}
//           src={isMobile && mobile ? mobile : src}
//           sizes="100vw"
//           priority={activeIndex === 0}
//           quality={100}
//         />
//       );
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center w-full h-[650px] bg-gray-100">
//         <Loader2 className="w-8 h-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full bg-black h-[366px] md:h-[454px] lg:h-[537px] xl:h-[650px] overflow-hidden">
//       <AnimatePresence initial={false}>
//         {slides.map((slide, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0 }}
//             animate={{
//               opacity: index === activeIndex ? 1 : 0,
//               transition: { duration: 0.7 },
//             }}
//             exit={{ opacity: 0, transition: { duration: 0.7 } }}
//             transition={{ duration: 0.7 }}
//             className={`absolute top-0 left-0 w-full h-full`}
//             style={{ zIndex: index === activeIndex ? 20 : 10 }}
//           >
//             {renderSlideContent(slide)}
//           </motion.div>
//         ))}
//       </AnimatePresence>

//       <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 0.5 }}
//           className="flex space-x-2"
//         >
//           {slides.map((_, index) => (
//             <motion.button
//               key={index}
//               whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.9 }}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === activeIndex
//                   ? 'bg-white scale-125'
//                   : 'bg-white/50 hover:bg-white/75'
//               }`}
//               onClick={() => goToSlide(index)}
//             />
//           ))}
//         </motion.div>
//       </div>

//       <motion.button
//         whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
//         whileTap={{ scale: 0.9 }}
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full transition-all duration-300"
//         onClick={goToPrevSlide}
//       >
//         <ChevronLeft className="w-6 h-6" />
//       </motion.button>
//       <motion.button
//         whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
//         whileTap={{ scale: 0.9 }}
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full transition-all duration-300"
//         onClick={goToNextSlide}
//       >
//         <ChevronRight className="w-6 h-6" />
//       </motion.button>
//     </div>
//   );
// }


// v5
// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

// interface ImageSlide {
//   type: 'image';
//   src: string;
//   alt: string;
//   mobile?: string;
// }

// interface ComponentSlide {
//   type: 'component';
//   content: React.ReactNode;
// }

// type Slide = ImageSlide | ComponentSlide;

// interface Banner {
//   id: string;
//   largeScreenUrl: string;
//   smallScreenUrl: string;
// }

// const initialSlides: Slide[] = [
//   {
//     type: 'component',
//     content: (
//       <div className="relative h-full w-full overflow-hidden">
//         <motion.div
//           className="absolute inset-0 bg-cover bg-center"
//           initial={{ scale: 1.2, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 1.5, ease: 'easeOut' }}
//           style={{
//             backgroundImage: "url('/bg.png')",
//           }}
//         >
//           <motion.div
//             className="absolute inset-0 bg-[#FF9900]"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.8 }}
//             transition={{ duration: 1, delay: 0.5 }}
//           />
//         </motion.div>
//         <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-center text-center">
//             <motion.h1
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="mb-4 max-sm:mb-2 text-xl font-extrabold tracking-tight text-white sm:text-3xl md:text-6xl"
//             >
//               New Step in Solution for your life
//             </motion.h1>
//             <motion.p
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="mb-8 max-md:mb-4 max-w-3xl max-md:w-[70%] text-[14px] text-gray-100 sm:text-2xl"
//             >
//               We offer innovative solutions that simplify life, promote
//               sustainability, and support a eco-friendly future.
//             </motion.p>
//             <motion.div
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.6 }}
//               className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
//             >
//               <Button
//                 size="lg"
//                 className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105"
//               >
//                 Bike LPG
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
//               >
//                 Contact Us
//               </Button>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     ),
//   },
// ];

// export default function EnhancedSwiperContainer() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [slides, setSlides] = useState<Slide[]>(initialSlides);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const fetchData = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('/api/cms');
//       const data = await response.json();

//       const newSlides = data.banners.map((banner: Banner) => ({
//         type: 'image' as const,
//         src: banner.largeScreenUrl,
//         alt: 'banner',
//         mobile: banner.smallScreenUrl,
//       }));

//       setSlides((prevSlides) => [...prevSlides, ...newSlides]);
//     } catch (error) {
//       console.error('Error fetching slides:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 1280);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     if (!isPaused && !isLoading) {
//       timeoutRef.current = setTimeout(() => {
//         setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
//       }, 7000);
//     }

//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, [activeIndex, isPaused, slides.length, isLoading]);

//   const pauseAutoSlide = () => {
//     setIsPaused(true);
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   };

//   const resumeAutoSlide = () => {
//     setIsPaused(false);
//   };

//   const goToSlide = (index: number) => {
//     pauseAutoSlide();
//     setActiveIndex(index);
//     setTimeout(resumeAutoSlide, 3000);
//   };

//   const goToPrevSlide = () => {
//     pauseAutoSlide();
//     setActiveIndex(
//       (prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
//     );
//     setTimeout(resumeAutoSlide, 3000);
//   };

//   const goToNextSlide = () => {
//     pauseAutoSlide();
//     setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
//     setTimeout(resumeAutoSlide, 3000);
//   };

//   const renderSlideContent = (slide: Slide) => {
//     if (slide.type === 'component') {
//       return slide.content;
//     } else {
//       const { src, alt, mobile } = slide;
//       return (
//         <Image
//           fill
//           className="object-cover"
//           alt={alt}
//           src={isMobile && mobile ? mobile : src}
//           sizes="100vw"
//           priority={activeIndex === 0}
//           quality={100}
//         />
//       );
//     }
//   };

//   return (
//     <div className="relative w-full bg-black h-[366px] md:h-[454px] lg:h-[537px] xl:h-[650px] overflow-hidden">
//       <AnimatePresence initial={false}>
//         {slides.map((slide, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0 }}
//             animate={{
//               opacity: index === activeIndex ? 1 : 0,
//               transition: { duration: 0.7 },
//             }}
//             exit={{ opacity: 0, transition: { duration: 0.7 } }}
//             transition={{ duration: 0.7 }}
//             className={`absolute top-0 left-0 w-full h-full`}
//             style={{ zIndex: index === activeIndex ? 20 : 10 }}
//           >
//             {renderSlideContent(slide)}
//           </motion.div>
//         ))}
//       </AnimatePresence>

//       {isLoading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
//           <Loader2 className="w-8 h-8 animate-spin text-white" />
//         </div>
//       )}

//       <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 0.5 }}
//           className="flex space-x-2"
//         >
//           {slides.map((_, index) => (
//             <motion.button
//               key={index}
//               whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.9 }}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === activeIndex
//                   ? 'bg-white scale-125'
//                   : 'bg-white/50 hover:bg-white/75'
//               }`}
//               onClick={() => goToSlide(index)}
//             />
//           ))}
//         </motion.div>
//       </div>

//       <motion.button
//         whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
//         whileTap={{ scale: 0.9 }}
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full transition-all duration-300"
//         onClick={goToPrevSlide}
//       >
//         <ChevronLeft className="w-6 h-6" />
//       </motion.button>
//       <motion.button
//         whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
//         whileTap={{ scale: 0.9 }}
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full transition-all duration-300"
//         onClick={goToNextSlide}
//       >
//         <ChevronRight className="w-6 h-6" />
//       </motion.button>
//     </div>
//   );
// }

// current

// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

// interface ImageSlide {
//   type: 'image';
//   src: string;
//   alt: string;
//   mobile?: string;
// }

// interface ComponentSlide {
//   type: 'component';
//   content: React.ReactNode;
// }

// type Slide = ImageSlide | ComponentSlide;

// interface Banner {
//   id: string;
//   largeScreenUrl: string;
//   smallScreenUrl: string;
// }

// const initialSlides: Slide[] = [
//   {
//     type: 'component',
//     content: (
//       <div className="relative h-full w-full overflow-hidden">
//         <motion.div
//           className="absolute inset-0 bg-cover bg-center"
//           initial={{ scale: 1.2, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 1.5, ease: 'easeOut' }}
//           style={{
//             backgroundImage: "url('/bg.png')",
//           }}
//         >
//           <motion.div
//             className="absolute inset-0 bg-[#FF9900]"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.8 }}
//             transition={{ duration: 1, delay: 0.5 }}
//           />
//         </motion.div>
//         <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-center text-center">
//             <motion.h1
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="mb-4 max-sm:mb-2 text-xl font-extrabold tracking-tight text-white sm:text-3xl md:text-6xl"
//             >
//               New Step in Solution for your life
//             </motion.h1>
//             <motion.p
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="mb-8 max-md:mb-4 max-w-3xl max-md:w-[70%] text-[14px] text-gray-100 sm:text-2xl"
//             >
//               We offer innovative solutions that simplify life, promote
//               sustainability, and support a eco-friendly future.
//             </motion.p>
//             <motion.div
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.6 }}
//               className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
//             >
//               <Button
//                 size="lg"
//                 className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105"
//               >
//                 Bike LPG
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
//               >
//                 Contact Us
//               </Button>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     ),
//   },
// ];

// export default function EnhancedSwiperContainer() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [slides, setSlides] = useState<Slide[]>(initialSlides);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [initialAnimationComplete, setInitialAnimationComplete] =
//     useState(false);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const fetchData = useCallback(async () => {
//     try {
//       const response = await fetch('/api/cms');
//       const data = await response.json();

//       const newSlides = data.banners.map((banner: Banner) => ({
//         type: 'image' as const,
//         src: banner.largeScreenUrl,
//         alt: 'banner',
//         mobile: banner.smallScreenUrl,
//       }));

//       setSlides((prevSlides) => [...prevSlides, ...newSlides]);
//     } catch (error) {
//       console.error('Error fetching slides:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setInitialAnimationComplete(true);
//       fetchData();
//     }, 2000); // Adjust this delay as needed

//     return () => clearTimeout(timer);
//   }, [fetchData]);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 1280);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     if (!isPaused && !isLoading && initialAnimationComplete) {
//       timeoutRef.current = setTimeout(() => {
//         setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
//       }, 7000);
//     }

//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, [
//     activeIndex,
//     isPaused,
//     slides.length,
//     isLoading,
//     initialAnimationComplete,
//   ]);

//   const pauseAutoSlide = () => {
//     setIsPaused(true);
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   };

//   const resumeAutoSlide = () => {
//     setIsPaused(false);
//   };

//   const goToSlide = (index: number) => {
//     pauseAutoSlide();
//     setActiveIndex(index);
//     setTimeout(resumeAutoSlide, 3000);
//   };

//   const goToPrevSlide = () => {
//     pauseAutoSlide();
//     setActiveIndex(
//       (prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
//     );
//     setTimeout(resumeAutoSlide, 3000);
//   };

//   const goToNextSlide = () => {
//     pauseAutoSlide();
//     setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
//     setTimeout(resumeAutoSlide, 3000);
//   };

//   const renderSlideContent = (slide: Slide) => {
//     if (slide.type === 'component') {
//       return slide.content;
//     } else {
//       const { src, alt, mobile } = slide;
//       return (
//         <Image
//           fill
//           className="object-cover"
//           alt={alt}
//           src={isMobile && mobile ? mobile : src}
//           sizes="100vw"
//           priority={activeIndex === 0}
//           quality={100}
//         />
//       );
//     }
//   };

//   return (
//     <div className="relative w-full bg-black h-[366px] md:h-[454px] lg:h-[537px] xl:h-[650px] overflow-hidden">
//       <AnimatePresence initial={false} mode="wait">
//         <motion.div
//           key={activeIndex}
//           initial={{ opacity: 0, scale: 1.1 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.7 }}
//           className="absolute top-0 left-0 w-full h-full"
//         >
//           {renderSlideContent(slides[activeIndex])}
//         </motion.div>
//       </AnimatePresence>

//       {initialAnimationComplete && (
//         <>
//           <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5, duration: 0.5 }}
//               className="flex space-x-2"
//             >
//               {slides.map((_, index) => (
//                 <motion.button
//                   key={index}
//                   whileHover={{ scale: 1.2 }}
//                   whileTap={{ scale: 0.9 }}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     index === activeIndex
//                       ? 'bg-white scale-125'
//                       : 'bg-white/50 hover:bg-white/75'
//                   }`}
//                   onClick={() => goToSlide(index)}
//                 />
//               ))}
//             </motion.div>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
//             whileTap={{ scale: 0.9 }}
//             className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full transition-all duration-300"
//             onClick={goToPrevSlide}
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
//             whileTap={{ scale: 0.9 }}
//             className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full transition-all duration-300"
//             onClick={goToNextSlide}
//           >
//             <ChevronRight className="w-6 h-6" />
//           </motion.button>
//         </>
//       )}
//     </div>
//   );
// }