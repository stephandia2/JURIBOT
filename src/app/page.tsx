'use client'

import Box from '@mui/material/Box'

// Import Shared Components
import FrontHeader from '@/components/front-pages/FrontHeader'
import FrontFooter from '@/components/front-pages/FrontFooter'

// Import Refactored Components
import HeroSection from '@/components/front-pages/landing-page/HeroSection'
import Features from '@/components/front-pages/landing-page/UsefulFeature'
import PricingPlan from '@/components/front-pages/landing-page/Pricing'
import Faqs from '@/components/front-pages/landing-page/Faqs'

export default function LandingPage() {
  return (
    <Box className='min-h-screen bg-white'>
      <FrontHeader />

      {/* Main Content using Template Components */}
      <Box className='pt-16'>
        <HeroSection />
        <Features />
        <PricingPlan />
        <Faqs />
      </Box>

      <FrontFooter />
    </Box>
  )
}
