import React from 'react';
import BikeLPGProducts from './BikeLPGProducts';
import ScrollGallery from './ScrollGalley';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import OurService from './OurService/OurService';

export default function BikeLPG() {
  return (
    <div>
      <BikeLPGProducts />
      <OurService />
      <ScrollGallery />
      <MusicPlayer />
    </div>
  );
}
