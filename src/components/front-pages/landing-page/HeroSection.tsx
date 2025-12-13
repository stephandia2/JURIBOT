'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'

import styles from './styles.module.css'

const HeroSection = () => {
  const [transform, setTransform] = useState('')
  const theme = useTheme()
  const isAboveLgScreen = useMediaQuery(theme.breakpoints.up('lg'))

  // Images
  const dashboardImage = '/images/front-pages/landing-page/hero-dashboard-light.png'
  const elementsImage = '/images/front-pages/landing-page/hero-elements-light.png'
  const heroSectionBg = '/images/front-pages/landing-page/hero-bg-light.png'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleMouseMove = (event: MouseEvent) => {
        const rotateX = (window.innerHeight - 2 * event.clientY) / 100
        const rotateY = (window.innerWidth - 2 * event.clientX) / 100

        setTransform(
          `perspective(1200px) rotateX(${rotateX < -40 ? -20 : rotateX}deg) rotateY(${rotateY}deg) scale3d(1,1,1)`
        )
      }

      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <section id='home' className='overflow-hidden relative pt-[75px] -mt-[75px]'>
      <img
        src={heroSectionBg}
        alt='hero-bg'
        className={`${styles.heroSectionBg} ${styles.bgLight} h-[95%] sm:h-[85%] md:h-[80%]`}
      />
      <div className='pt-[88px] overflow-hidden container mx-auto px-6'>
        <div className='md:max-w-[550px] mx-auto text-center relative mb-7'>
          <Typography
            className={`font-extrabold sm:text-[42px] text-3xl mb-4 leading-[48px] ${styles.heroText}`}
          >
            Automatisez votre veille juridique avec l'IA
          </Typography>
          <Typography className='font-medium' color='text.primary'>
            JurisBot surveille vos sources, analyse les actualités et génère des posts LinkedIn viraux prêts à publier.
          </Typography>
          {/* Button centered without the "Rejoindre la communauté" text */}
          <div className='flex mt-6 justify-center'>
            <Link href='/register'>
              <Button
                size='large'
                variant='contained'
                sx={{ backgroundColor: '#7367F0', px: 4, py: 1.5 }}
              >
                Démarrer gratuitement
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Dashboard image with constrained max-width */}
      <div
        className='relative text-center container mx-auto px-6'
        style={{ transform: isAboveLgScreen ? transform : 'none' }}
      >
        <Link href='/dashboard' className='block relative'>
          <img 
            src={dashboardImage} 
            alt='dashboard-image' 
            className='mx-auto max-w-3xl w-full' 
          />
        </Link>
      </div>
    </section>
  )
}

export default HeroSection
