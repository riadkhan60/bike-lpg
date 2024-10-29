import React from 'react';
import BikeLPGProducts from './BikeLPGProducts';
import ScrollGallery from './ScrollGalley';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import OurService from './OurService/OurService';
import BikeLpgBanner from './BikeLpgSwipperBanner/BikeLpgBanner';
import VideoShowcase from './VideosSection/VideosSection';

export default function BikeLPG() {
  return (
    <div>
      <BikeLpgBanner/>
      <BikeLPGProducts />
      <OurService />
      <VideoShowcase />
      <ScrollGallery />
      <MusicPlayer />
    </div>
  );
}
