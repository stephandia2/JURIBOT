'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'

import FrontHeader from '@/components/front-pages/FrontHeader'
import FrontFooter from '@/components/front-pages/FrontFooter'

const features = [
  {
    icon: 'tabler-rss',
    title: 'Surveillance Multi-Sources',
    description: 'Surveillance 24/7 automatique de toutes vos sources préférées (RSS, Newsletters, Sites Web). Ne manquez plus jamais une actualité importante.'
  },
  {
    icon: 'tabler-brain',
    title: 'Analyse IA Gemini',
    description: 'Notre IA analyse, résume et extrait les points clés de chaque article pour vous. Gagnez des heures de lecture chaque semaine.'
  },
  {
    icon: 'tabler-pencil',
    title: 'Génération de Posts LinkedIn',
    description: 'Brouillons LinkedIn optimisés pour l\'engagement, adaptés à votre ton et votre audience. Publiez du contenu de qualité sans effort.'
  },
  {
    icon: 'tabler-calendar',
    title: 'Planification Intelligente',
    description: 'Programmez vos publications aux meilleurs horaires pour maximiser votre visibilité et votre engagement.'
  },
  {
    icon: 'tabler-chart-bar',
    title: 'Analytics Avancés',
    description: 'Suivez les performances de vos posts et optimisez votre stratégie de contenu avec des insights détaillés.'
  },
  {
    icon: 'tabler-lock',
    title: 'Sécurité Maximale',
    description: 'Vos données sont chiffrées et stockées de manière sécurisée en Europe, en conformité avec le RGPD.'
  },
  {
    icon: 'tabler-refresh',
    title: 'Mise à jour en temps réel',
    description: 'Recevez des notifications dès qu\'une nouvelle actualité importante est détectée dans votre domaine.'
  },
  {
    icon: 'tabler-users',
    title: 'Collaboration d\'équipe',
    description: 'Partagez l\'accès avec votre équipe et collaborez sur la création de contenu juridique.'
  },
  {
    icon: 'tabler-api',
    title: 'API & Intégrations',
    description: 'Connectez JurisBot à vos outils existants grâce à notre API RESTful complète.'
  }
]

export default function FeaturesPage() {
  return (
    <Box className='min-h-screen bg-white'>
      <FrontHeader />

      {/* Hero Section */}
      <Box 
        className='pt-32 pb-20 text-center'
        sx={{ background: 'linear-gradient(138.18deg, #eae8fd 0%, #fce5e6 94.44%)' }}
      >
        <Container maxWidth='lg'>
          <Chip size='small' variant='outlined' color='primary' label='Fonctionnalités' className='mb-4' />
          <Typography variant='h3' className='font-bold text-[#5D596C] mb-4'>
            Tout ce dont vous avez besoin pour votre veille juridique
          </Typography>
          <Typography className='text-gray-600 max-w-2xl mx-auto'>
            Découvrez les fonctionnalités puissantes qui font de JurisBot l'outil indispensable des professionnels du droit.
          </Typography>
        </Container>
      </Box>

      {/* Features Grid */}
      <Container maxWidth='lg' className='py-20'>
        <Grid container spacing={6}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <Box className='p-6 rounded-2xl border border-gray-100 hover:border-[#7367F0]/30 hover:shadow-lg transition-all h-full'>
                <Box className='w-16 h-16 rounded-full bg-[#7367F0]/10 flex items-center justify-center mb-4'>
                  <i className={`${feature.icon} text-3xl text-[#7367F0]`} />
                </Box>
                <Typography variant='h5' className='font-bold text-[#5D596C] mb-2'>
                  {feature.title}
                </Typography>
                <Typography className='text-gray-500'>
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <FrontFooter />
    </Box>
  )
}
