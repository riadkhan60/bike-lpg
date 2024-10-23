'use client'
import React, { createContext } from 'react';

interface VideoLink {
  id: string;
  title: string;
  url: string;
  order: number;
}

interface QA {
  id: string;
  question: string;
  answer: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface Banner {
  id: string;
  largeScreenUrl: string;
  smallScreenUrl: string;
}

interface DashboardContextValue {
  qas: QA[];
  setQAs: React.Dispatch<React.SetStateAction<QA[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  videoLinks: VideoLink[];
  setVideoLinks: React.Dispatch<React.SetStateAction<VideoLink[]>>;
  banners: Banner[];
  setBanners: React.Dispatch<React.SetStateAction<Banner[]>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchedInitialData: (data: any) => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);


export default function DasboardContextProvider({ children }: { children: React.ReactNode }) {
  const [qas, setQAs] = React.useState<QA[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [videoLinks, setVideoLinks] = React.useState<VideoLink[]>([]);
  const [banners, setBanners] = React.useState<Banner[]>([]);


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function fetchedInitialData(data: any) {
    setQAs(data.qas);
    setVideoLinks(data.videoLinks);
    setProducts(data.products);
    setBanners(data.banners);
  } 
    
  
  
  const value = {
    qas,
    setQAs,
    products,
    setProducts,
    videoLinks,
    setVideoLinks,
    banners,
    setBanners,
    fetchedInitialData
  };
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

