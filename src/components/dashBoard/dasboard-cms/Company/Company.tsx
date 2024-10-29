import React from 'react';
import CompanyData from './CompanyData';
import MilestoneCMSSection from './MileStone';

export default function Grid() {
  return (
    <div className="grid gap-4 grid-cols-2 ">
      <div>
        <CompanyData />
       
      </div>
      <div className="grid-raw-auto">
        <MilestoneCMSSection />
      </div>
    </div>
  );
}
