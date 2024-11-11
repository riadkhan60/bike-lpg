// 'use client';
// import { ArrowRight, Check } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// export default function FeaturedProductSection() {
//   return (
//     <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
//       <div className="container px-4 md:px-6">
//         <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
//           <div className="flex flex-col justify-center space-y-4">
//             <div className="space-y-2">
//               <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
//                 Introducing the NextGen Pro
//               </h1>
//               <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
//                 Experience the future of productivity with our most advanced
//                 device yet. Sleek, powerful, and intuitive.
//               </p>
//             </div>
//             <div className="flex flex-col gap-2 min-[400px]:flex-row">
//               <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
//                 Buy Now
//               </Button>
//               <Button
//                 variant="outline"
//                 className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
//               >
//                 Learn More
//               </Button>
//             </div>
//           </div>
//           <div className="flex items-center justify-center">
//             <div className="relative h-[450px] w-[300px] sm:h-[550px] sm:w-[400px] lg:h-[650px] lg:w-[400px]">
//               <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-2xl" />
//               <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-xl shadow-inner" />
//               <div className="absolute inset-4 bg-gray-100 dark:bg-gray-800 rounded-lg" />
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="text-4xl font-bold text-gray-300 dark:text-gray-600">
//                   Product Image
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="flex items-center space-x-3 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg transition-all hover:scale-105"
//             >
//               <Check className="h-6 w-6 flex-shrink-0 text-green-500" />
//               <div>
//                 <h3 className="font-semibold">{feature.title}</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   {feature.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="mt-12 text-center">
//           <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
//             Explore All Features <ArrowRight className="ml-2 h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }

// const features = [
//   {
//     title: 'Lightning Fast',
//     description: 'Powered by the latest processor for seamless performance.',
//   },
//   {
//     title: 'All-Day Battery',
//     description: 'Up to 24 hours of battery life on a single charge.',
//   },
//   {
//     title: 'Stunning Display',
//     description: 'Vibrant colors and crisp details on our Retina XDR display.',
//   },
//   {
//     title: '5G Connectivity',
//     description: 'Blazing fast internet speeds wherever you go.',
//   },
// ];

// 'use client';

// import { ArrowRight, Check } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import Container from '@/components/LocalUi/container/Container';
// import { useEffect, useState } from 'react';
// import { useSectionImages } from '@/sectionImageConext/sectionImageConext';

// interface Feature {
//   title: string;
//   description: string;
// }

// interface Product {
//   id: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   features: Feature[];
// }

// export default function Component() {
//   const [data, setData] = useState({} as Product);
//   const { featureProductPicture, isLoading } = useSectionImages();

//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         const response = await fetch('/api/feature-product');
//         if (!response.ok) throw new Error('Failed to fetch product');
//         const data = await response.json();
//         setData(data);
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       }
//     }

//     fetchProduct();
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         delayChildren: 0.3,
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//     },
//   };

//   return (
//     <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
//       <h2 className="text-5xl max-md:text-3xl  mb-4 font-bold max-lg:hidden text-center bg-clip-text text-transparent bg-gradient-to-r from-[#7a462a] to-[#FF9900]">
//         Featured Product
//       </h2>
//       <p className="text-xl text-gray-600 text-center  mb-10 dark:text-gray-300 max-w-2xl mx-auto">
//         Explore Our Top-Quality, Authentic LPG Conversion Solutions!
//       </p>
//       <Container>
//         <motion.div
//           className=""
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
//             <motion.div
//               className="flex flex-col justify-center space-y-4"
//               variants={itemVariants}
//             >
//               <div className="space-y-2">
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
//                   {data.title}
//                 </h1>
//                 <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
//                   {data.description}
//                 </p>
//               </div>
//               <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                 <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
//                   Request Quote
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
//                 >
//                   View Specifications
//                 </Button>
//               </div>
//             </motion.div>
//             <motion.div
//               className="flex items-center justify-end max-lg:justify-center"
//               variants={itemVariants}
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: 'spring', stiffness: 300 }}
//             >
//               <div className="relative h-[350px] w-[300px] sm:h-[400px] sm:w-[350px] lg:h-[450px] lg:w-[400px]">
//                 {featureProductPicture && (
//                   <Image
//                     src={featureProductPicture?.imageUrl}
//                     alt={data.imageUrl}
//                     layout="fill"
//                     objectFit="cover"
//                     className="rounded-2xl shadow-2xl"
//                   />
//                 )}
//               </div>
//             </motion.div>
//           </div>
//           <motion.div
//             className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
//             variants={containerVariants}
//           >
//             {data?.features?.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 className="flex items-center space-x-3 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg"
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ type: 'spring', stiffness: 400, damping: 10 }}
//               >
//                 <Check className="h-6 w-6 flex-shrink-0 text-[#FF9900]" />
//                 <div>
//                   <h3 className="font-semibold">{feature.title}</h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     {feature.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//           <motion.div
//             className="mt-12 text-center"
//             variants={itemVariants}
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: 'spring', stiffness: 400, damping: 10 }}
//           >
//             <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
//               Explore Full Catalog <ArrowRight className="ml-2 h-4 w-4" />
//             </Button>
//           </motion.div>
//         </motion.div>
//       </Container>
//     </section>
//   );
// }

'use client';

interface ContactData {
  id?: string;
  companyId: string;
  phone?: string;
  email?: string;
  location?: string;
  facebook?: string;
  whatsapp?: string;
  tiktok?: string;
  youtube?: string;
  instagram?: string;
  linkedin?: string;
}

import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Container from '@/components/LocalUi/container/Container';
import { useEffect, useState } from 'react';
import { useSectionImages } from '@/sectionImageConext/sectionImageConext';
import Link from 'next/link';

interface Feature {
  title: string;
  description: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  features: Feature[];
}

const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
  />
);

export default function Component() {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { featureProductPicture, isLoading } = useSectionImages();
  const [contacts, setContacts] = useState({} as ContactData);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/contacts');
        const data = await response.json();
        setContacts(data[2]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch('/api/feature-product');
        if (!response.ok) throw new Error('Failed to fetch product');
        const productData = await response.json();
        setData(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <h2 className="text-5xl max-md:text-3xl mb-4 font-bold max-lg:hidden text-center bg-clip-text text-transparent bg-gradient-to-r from-[#7a462a] to-[#FF9900]">
        Featured Product
      </h2>
      <p className="text-xl text-gray-600 text-center mb-10 max-lg:hidden dark:text-gray-300 max-w-2xl mx-auto">
        Explore Our Top-Quality, Authentic LPG Conversion Solutions!
      </p>
      <Container>
        <motion.div
          className=""
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              variants={itemVariants}
            >
              <div className="space-y-2">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="skeleton"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Skeleton className="h-12 w-3/4 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-5/6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                        {data?.title}
                      </h1>
                      <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                        {data?.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <a
                  href={`https://wa.me/${
                    contacts.whatsapp || '8801632102050'
                  }?text=Hello%2C%20I%27m%20interested%20in%20your%20services%21`}
                >
                  <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                    {"Let's talk"}
                  </Button>
                </a>
                <Link href={'/site/contact-us'}>
                  <Button
                    variant="outline"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center justify-end max-lg:justify-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="relative h-[350px] w-[300px] sm:h-[400px] sm:w-[350px] lg:h-[450px] lg:w-[400px]">
                <AnimatePresence mode="wait">
                  {loading || isLoading ? (
                    <motion.div
                      key="skeleton"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full rounded-2xl overflow-hidden"
                    >
                      <Skeleton className="w-full h-full" />
                    </motion.div>
                  ) : (
                    featureProductPicture && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Image
                          src={featureProductPicture.imageUrl}
                          alt={data?.title || 'Featured product'}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-2xl shadow-2xl"
                        />
                      </motion.div>
                    )
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <>
                  {[...Array(4)].map((_, index) => (
                    <motion.div
                      key={`skeleton-${index}`}
                      className="flex items-center space-x-3 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    </motion.div>
                  ))}
                </>
              ) : (
                data?.features?.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Check className="h-6 w-6 flex-shrink-0 text-[#FF9900]" />
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
          <motion.div
            className="mt-12 text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Link href={'/bike-lpg/our-products'}>
              <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                Explore Full Catalog <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
