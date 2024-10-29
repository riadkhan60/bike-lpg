'use client';
import React, { createContext, useCallback } from 'react';

interface VideoLink {
  id: string;
  title: string;
  thumbnailUrl: string;
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
  offerPrice: number | null;
  imageUrl: string;
}

interface Banner {
  id: string;
  largeScreenUrl: string;
  smallScreenUrl: string;
}

interface Review {
  id: string;
  name: string;
  occupation: string;
  review: string;
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
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchedInitialData: (data: any) => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export default function DasboardContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [qas, setQAs] = React.useState<QA[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [videoLinks, setVideoLinks] = React.useState<VideoLink[]>([]);
  const [banners, setBanners] = React.useState<Banner[]>([]);
  const [reviews, setReviews] = React.useState<Review[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchedInitialData = useCallback((data: any) => {
    setQAs(data.qas);
    setVideoLinks(data.videoLinks);
    setProducts(data.products);
    setBanners(data.banners);
    setReviews(data.reviews);
  }, []);

  const value = {
    qas,
    setQAs,
    products,
    setProducts,
    videoLinks,
    setVideoLinks,
    banners,
    setBanners,
    reviews,
    setReviews,
    fetchedInitialData,
  };
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = React.useContext(DashboardContext);
  if (!context) {
    throw new Error(
      'useDashboardContext must be used within a DashboardContextProvider',
    );
  }
  return context;
}
