'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import React from 'react';

// Define types for each section
type ImageSection = {
  imageUrl: string;
  name: string;
  description: string;
};

// Define the type for our context value with individual sections
type SectionImageContextType = {
  bannerBackgroudOne: ImageSection | null;
  bannerBackgroudTwo: ImageSection | null;
  fillingStationSection: ImageSection | null;
  fillingStationCard: ImageSection | null;
  designHouseCard: ImageSection | null;
  bikeLpgCard: ImageSection | null;
  clientImageOne: ImageSection | null;
  clientImageTwo: ImageSection | null;
  clientImageThree: ImageSection | null;
  clientImageFour: ImageSection | null;
  ownerImage: ImageSection | null;
  officePicture: ImageSection | null;
  featureProductPicture: ImageSection | null;
  dealerSectionPicture: ImageSection | null;
  furnitureOne: ImageSection | null;
  furnitureTwo: ImageSection | null;
  furnitureThree: ImageSection | null;
  isLoading: boolean;
  error: Error | null;
};

// Create the context with an initial value
const SectionImageContext = createContext<SectionImageContextType>({
  bannerBackgroudOne: null,
  bannerBackgroudTwo: null,
  fillingStationSection: null,
  fillingStationCard: null,
  designHouseCard: null,
  bikeLpgCard: null,
  clientImageOne: null,
  clientImageTwo: null,
  clientImageThree: null,
  clientImageFour: null,
  ownerImage: null,
  officePicture: null,
  featureProductPicture: null,
  dealerSectionPicture: null,
  furnitureOne: null,
  furnitureTwo: null,
  furnitureThree: null,
  isLoading: true,
  error: null,
});

// Custom hook to use the context
export const useSectionImages = () => {
  const context = useContext(SectionImageContext);
  if (!context) {
    throw new Error(
      'useSectionImages must be used within a SectionImageContextProvider',
    );
  }
  return context;
};

// Provider component
export default function SectionImageContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sectionImages, setSectionImages] = useState<
    Omit<SectionImageContextType, 'isLoading' | 'error'>
  >({
    bannerBackgroudOne: null,
    bannerBackgroudTwo: null,
    fillingStationSection: null,
    fillingStationCard: null,
    designHouseCard: null,
    bikeLpgCard: null,
    clientImageOne: null,
    clientImageTwo: null,
    clientImageThree: null,
    clientImageFour: null,
    ownerImage: null,
    officePicture: null,
    featureProductPicture: null,
    dealerSectionPicture: null,
    furnitureOne: null,
    furnitureTwo: null,
    furnitureThree: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/sections');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        // Transform array data into individual section objects
        const transformedData: typeof sectionImages = data.reduce(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (acc: any, item: any) => {
            // Create section object with only required fields
            const sectionData = {
              imageUrl: item.imageUrl,
              name: item.name,
              description: item.description,
            };

            // Add to accumulator using sectionId as key
            acc[item.sectionId] = sectionData;
            return acc;
          },
          {},
        );

        setSectionImages(transformedData);
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error('An error occurred'),
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const contextValue = {
    ...sectionImages,
    isLoading,
    error,
  };

  return (
    <SectionImageContext.Provider value={contextValue}>
      {children}
    </SectionImageContext.Provider>
  );
}

