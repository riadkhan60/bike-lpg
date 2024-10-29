import BikeLPG from '@/components/BikeLPG/BikeLPG'
import React from 'react'

export default function page() {
   const jsonLd = {
     '@context': 'https://schema.org',
     '@type': 'Organization',
     name: 'Ms Jannat Traders',
     url: 'https://bikelpg.com',
     logo: 'https://msjannattraders.com/data/logo.png',
     sameAs: [
       'https://www.facebook.com/@bikelpg0',
       'https://www.youtube.com/@BIkeLPGBangladesh',
     ],
     contactPoint: {
       '@type': 'ContactPoint',
       telephone: '+8801632102050',
       contactType: 'Customer Service',
       areaServed: 'BD',
       availableLanguage: ['en', 'bn'],
     },
   };
  return (
    <div>
      <BikeLPG />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      ></script>
    </div>
  );
}
