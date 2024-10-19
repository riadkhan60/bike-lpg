import React from 'react'
import { encode } from 'qss';
import Image from 'next/image';

  const params = encode({
    url: 'https://bike-lpg.vercel.app',
    screenshot: true,
    meta: false,
    embed: 'screenshot.url',
    colorScheme: 'dark',
    'viewport.isMobile': true,
    'viewport.deviceScaleFactor': 1,
    'viewport.width': 210 * 7,
    'viewport.height': 125 * 6,
  });

 const src = `https://api.microlink.io/?${params}`;


export default function WebsitePreviewCard() {

  return (
    <div>
      <Image
        src={src}
        width={510}
        height={325}
        quality={50}
        layout={'fixed'}
        priority={true}
        alt="hidden image"
      />
    </div>
  );
}
