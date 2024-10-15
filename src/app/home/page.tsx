import AuthButton from '@/components/authentication/AuthButton';
import SwiperContainer from '@/components/LocalUi/swipperBanner/SwiperContainer';
import React from 'react'

export default function home() {
  return (
    <div className="h-[500vh]">
      <SwiperContainer />
      <div>
        <AuthButton />
      </div>
    </div>
  );
}
