import HomePage from '@/components/HomePage/HomePage';
import React from 'react'

export default function home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ms Jannat Traders',
    url: 'https://msjannattraders.com',
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
    <div className="">
      <HomePage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      ></script>
    </div>
  );
}
