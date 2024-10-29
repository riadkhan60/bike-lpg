import Footer from '@/components/footer/Footer';
import BikeLpgNavigation from '@/components/Navigation/BikeLpgNavigation';

import SmoothScroll from '@/components/smoothScroll/SmoothScroll';
import { Metadata } from 'next';
import React from 'react';


export const metadata: Metadata = {
  title: {
    template: '%s | Bike Lpg',
    default: 'Bike Lpg',
  },
  description:
    "Leading the way in LPG technology, fuel stations, and furniture solutions. We're committed to innovation and sustainability in all our ventures. Bike Lpg is the first and best importer for lpg conversion kits in Bangladesh.",
  keywords: [
    'Jannat',
    'Traders',
    'BikeLPG',
    'Fuel',
    'Gas',
    'bike',
    'bike lpg',
    'lpg conversion',
    'lpg kit',
    'bike gas',
    'gas fuel for bike',
    'bike lpg kit',
    'lpg fuel for bike',
    'lpg fuel',
    'best bike shops',
    'jannat Traders',
    'jannat traders',
    'jannat',
    'bike lpg best price',
    'bike lpg price',
    'bike lpg impoter',
    'Jannat Traders',
    'BikeLPG',
    'Fuel',
    'Gas',
    'bike',
    'bike lpg',
    'lpg conversion kit',
    'motorcycle gas kit',
    'LPG bike kit',
    'bike gas fuel',
    'bike LPG best price',
    'Bangladesh LPG bike kit',
    'motorbike LPG kit importer',
    'best bike gas conversion',
    'bike LPG Bangladesh',
    'motorcycle LPG Bangladesh',
    'bike LPG gas station',
    'motorcycle LPG fuel',
    'bike conversion kit importer',
    'affordable bike gas kits',
    'Ms Jannat Traders Bangladesh',
    'Bangladesh gas station dealers',
    'motorbike fuel solutions',
    'eco-friendly bike fuel',
    'bike LPG benefits',
    'leading bike LPG dealer',
    'trusted LPG bike brand',
    'bike LPG converter',
    'motorbike LPG system',
    'top LPG kits for bikes',
    'best fuel economy bike',
    'cost-effective bike LPG',
    'bike LPG support Bangladesh',
    'বাংলাদেশ বাইক এলপিজি কিট', // Bangladesh bike LPG kit
    'এলপিজি বাইক কনভার্টার', // LPG bike converter
    'বাইক গ্যাস জ্বালানি', // bike gas fuel
    'সেরা বাইক এলপিজি সমাধান', // best bike LPG solution
    'এলপিজি মোটরবাইক আমদানিকারক', // LPG motorbike importer
    'বাংলাদেশ বাইক কনভার্সন', // Bangladesh bike conversion
    'বাইক সাশ্রয়ী জ্বালানি', // bike affordable fuel
    'এলপিজি গ্যাস সেবা', // LPG gas service
    'মোটরবাইক এলপিজি কিট', // motorbike LPG kit
    'বাইক লং জ্বালানি', // bike long fuel
    'এলপিজি ফুয়েল সলিউশন', // LPG fuel solution
    'মোটরবাইক গ্যাস কিট', // motorbike gas kit
    'সাশ্রয়ী মোটরবাইক জ্বালানি', // affordable motorbike fuel
    'গাড়ির জন্য এলপিজি', // LPG for vehicles
    'বেস্ট বাইক এলপিজি কিট', // best bike LPG kit
    'ঢাকা বাইক এলপিজি কিট',
    'Jannat Traders',
    'BikeLPG',
    'Fuel',
    'Gas',
    'bike',
    'bike lpg',
    'lpg conversion kit',
    'motorcycle gas kit',
    'LPG bike kit',
    'bike gas fuel',
    'bike LPG best price',
    'Bangladesh LPG bike kit',
    'motorbike LPG kit importer',
    'best bike gas conversion',
    'bike LPG Bangladesh',
    'motorcycle LPG Bangladesh',
    'bike LPG gas station',
    'motorcycle LPG fuel',
    'bike conversion kit importer',
    'affordable bike gas kits',
    'Ms Jannat Traders Bangladesh',
    'Bangladesh gas station dealers',
    'motorbike fuel solutions',
    'eco-friendly bike fuel',
    'bike LPG benefits',
    'leading bike LPG dealer',
    'trusted LPG bike brand',
    'bike LPG converter',
    'motorbike LPG system',
    'top LPG kits for bikes',
    'best fuel economy bike',
    'cost-effective bike LPG',
    'bike LPG support Bangladesh',
    'বাংলাদেশ বাইক এলপিজি কিট', // Bangladesh bike LPG kit
    'এলপিজি বাইক কনভার্টার', // LPG bike converter
    'বাইক গ্যাস জ্বালানি', // bike gas fuel
    'সেরা বাইক এলপিজি সমাধান', // best bike LPG solution
    'এলপিজি মোটরবাইক আমদানিকারক', // LPG motorbike importer
    'বাংলাদেশ বাইক কনভার্সন', // Bangladesh bike conversion
    'বাইক সাশ্রয়ী জ্বালানি', // bike affordable fuel
    'এলপিজি গ্যাস সেবা', // LPG gas service
    'মোটরবাইক এলপিজি কিট', // motorbike LPG kit
    'বাইক লং জ্বালানি', // bike long fuel
    'এলপিজি ফুয়েল সলিউশন', // LPG fuel solution
    'মোটরবাইক গ্যাস কিট', // motorbike gas kit
    'সাশ্রয়ী মোটরবাইক জ্বালানি', // affordable motorbike fuel
    'গাড়ির জন্য এলপিজি', // LPG for vehicles
    'বেস্ট বাইক এলপিজি কিট', // best bike LPG kit
    'ঢাকা বাইক এলপিজি কিট', // Dhaka bike LPG kit
    'এলপিজি কিট মূল্য', // LPG kit price
    'বাইক কনভার্সন সেটআপ', // bike conversion setup
    'সাশ্রয়ী এলপিজি কিট', // affordable LPG kit
    'এলপিজি বাইক রিফিল স্টেশন', // LPG bike refill station
    'সেরা মোটরবাইক এলপিজি ব্র্যান্ড', // best motorbike LPG brand
    'এলপিজি কিট সেবা বাংলাদেশ', // LPG kit service Bangladesh
    'বাইক গ্যাস কনভার্সন', // bike gas conversion
    'এলপিজি মোটরবাইক ফুয়েল', // LPG motorbike fuel
    'বাইক জ্বালানি সাশ্রয়ী কিট', // bike fuel saver kit
    'বাইক এলপিজি ইনস্টলেশন', // bike LPG installation
    'এলপিজি গ্যাস আমদানি', // LPG gas import
    'বাংলাদেশ এলপিজি সেবা', // Bangladesh LPG service
    'সাশ্রয়ী এলপিজি মোটরবাইক',
  ],
  authors: [
    {
      name: 'shafik islam',
      url: 'https://bikelpg.com/',
    },
  ],
  openGraph: {
    title: 'Bike Lpg - Leading Bike LPG Importer in Bangladesh',
    description:
      "Bike Lpg is Bangladesh's trusted distributor for LPG bike conversion kits with a wide dealer network and quality service.",
    url: 'https://bikelpg.com/', // Update with the actual website URL
    type: 'website',
    locale: 'bn-BD',
    siteName: 'Ms Jannat Traders',
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div>
        <div>
          <BikeLpgNavigation />
        </div>
        <div className="mt-[65px]"></div>
        {children}
        <div>
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
}
