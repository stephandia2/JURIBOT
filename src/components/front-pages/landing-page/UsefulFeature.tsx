'use client'

import { useEffect, useRef } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'

const feature = [
  {
    icon: 'tabler-rss',
    title: 'Surveillance Multi-Sources',
    description: 'Surveillance 24/7 automatique de toutes vos sources préférées (RSS, Newsletters, Sites Web).'
  },
  {
    icon: 'tabler-brain',
    title: 'Analyse IA Gemini',
    description: 'Notre IA analyse, résume et extrait les points clés de chaque article pour vous.'
  },
  {
    icon: 'tabler-pencil',
    title: 'Génération de Posts',
    description: 'Brouillons LinkedIn optimisés pour l\'engagement, adaptés à votre ton et votre audience.'
  },
  {
    icon: 'tabler-calendar',
    title: 'Planification',
    description: 'Programmez vos publications aux meilleurs horaires pour maximiser votre visibilité.'
  },
  {
    icon: 'tabler-chart-bar',
    title: 'Analytics Avancés',
    description: 'Suivez les performances de vos posts et optimisez votre stratégie de contenu.'
  },
  {
    icon: 'tabler-lock',
    title: 'Sécurité Maximale',
    description: 'Vos données sont chiffrées et stockées de manière sécurisée en Europe.'
  }
]

const UsefulFeature = () => {
  return (
    <section id='features' className='bg-white'>
      <div className='flex flex-col gap-12 pt-12 pb-[100px] container mx-auto px-6'>
        <div className='flex flex-col gap-y-4 items-center justify-center'>
          <Chip size='small' variant='outlined' color='primary' label='Fonctionnalités Clés' />
          <div className='flex flex-col items-center gap-y-1 justify-center flex-wrap'>
            <div className='flex items-center gap-x-2'>
              <Typography color='text.primary' variant='h4' className='text-center'>
                <span className='relative z-[1] font-extrabold'>
                  Tout ce dont vous avez besoin
                  <img
                    src='/images/front-pages/landing-page/bg-shape.png'
                    alt='bg-shape'
                    className='absolute bottom-0 z-[1] h-[40%] w-[125%] sm:w-[132%] -left-[13%] sm:left-[-19%] top-[17px]'
                  />
                </span>{' '}
                pour votre veille juridique
              </Typography>
            </div>
            <Typography className='text-center'>
              Pas juste un outil, mais une suite complète pour votre présence en ligne.
            </Typography>
          </div>
        </div>
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
          <Grid container spacing={6}>
            {feature.map((item, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <div className='flex flex-col gap-2 justify-center items-center'>
                  <Box className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary'>
                    <i className={`${item.icon} text-3xl text-[#7367F0]`} />
                  </Box>
                  <Typography className='mt-2 font-bold' variant='h5'>
                    {item.title}
                  </Typography>
                  <Typography className='max-w-[364px] text-center text-gray-500'>{item.description}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </section>
  )
}

export default UsefulFeature
