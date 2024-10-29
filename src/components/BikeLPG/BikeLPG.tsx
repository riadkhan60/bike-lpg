import React from 'react';

import ScrollGallery from './ScrollGalley';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import OurService from './OurService/OurService';
import BikeLpgBanner from './BikeLpgSwipperBanner/BikeLpgBanner';
import VideoShowcase from './VideosSection/VideosSection';
import FeaturedProductSection from './FeaturedProductSection/FeaturedProductSection';

export default function BikeLPG() {
  return (
    <div>
      <BikeLpgBanner />
      <FeaturedProductSection />
      <OurService />
      <VideoShowcase />
      <ScrollGallery />
      <MusicPlayer />
    </div>
  );
}
