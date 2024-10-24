import React from 'react';
import BikeLPGProducts from './BikeLPGProducts';
import ScrollGallery from './ScrollGalley';
import MusicPlayer from '../MusicPlayer/MusicPlayer';


export default function BikeLPG() {
  return (
    <div>
      <BikeLPGProducts />
      <ScrollGallery />
      <MusicPlayer/>
    </div>
  );
}
