import React from 'react'
import SwiperContainer from './swipperBanner/SwiperContainer'
import FeatureSection from './FeatureSection/FeatureSection'
import AllBusinessCards from './AllBusinessCards/AllBusinessCards'
import VideoSection from './Customers/Customers'
import Owner from './Owner/Owner'

export default function Hero() {
  return (
    <div>
      <SwiperContainer />
      <AllBusinessCards />
      <FeatureSection />
      <VideoSection />
      <Owner/>
    </div>
  )
}
