'use client'

import { useState } from 'react'
import type { ChangeEvent } from 'react'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import styles from './styles.module.css'

const pricingPlans = [
  {
    title: 'Starter',
    img: '/images/front-pages/landing-page/pricing-basic.png',
    monthlyPay: 0,
    annualPay: 0,
    perYearPay: 0,
    subtitle: 'Pour débuter',
    features: ['3 sources maximum', '10 articles/mois', 'Génération IA basique', 'Support email', 'Statistiques de base', 'Export PDF'],
    current: false,
    popular: false
  },
  {
    title: 'Pro',
    img: '/images/front-pages/landing-page/pricing-team.png',
    monthlyPay: 29,
    annualPay: 22,
    perYearPay: 264,
    subtitle: 'Le plus populaire',
    features: [
      'Tout Starter +',
      'Sources illimitées',
      '100 articles/mois',
      'IA Gemini Pro',
      'Analytics avancés',
      'Support prioritaire',
      'Intégration LinkedIn'
    ],
    current: false,
    popular: true
  },
  {
    title: 'Cabinet',
    img: '/images/front-pages/landing-page/pricing-enterprise.png',
    monthlyPay: 99,
    annualPay: 79,
    perYearPay: 948,
    subtitle: 'Pour les équipes',
    features: [
      'Tout Pro +',
      'Multi-utilisateurs',
      'Branding personnalisé',
      'API access',
      'Account manager dédié',
      'SLA garanti',
      'Formation incluse'
    ],
    current: false,
    popular: false
  }
]

const PricingPlan = () => {
  const [pricingPlan, setPricingPlan] = useState<'monthly' | 'annually'>('annually')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setPricingPlan('annually')
    } else {
      setPricingPlan('monthly')
    }
  }

  return (
    <section
      id='pricing-plans'
      className={`flex flex-col gap-8 lg:gap-12 py-[100px] bg-[#F8F7FA] ${styles.sectionStartRadius}`}
    >
      <div className='w-full container mx-auto px-6'>
        {/* Header */}
        <div className='flex flex-col gap-y-4 items-center justify-center mb-4'>
          <Chip size='small' variant='outlined' color='primary' label='Nos Tarifs' />
          <Typography variant='h4' sx={{ fontWeight: 700, color: '#5D596C', textAlign: 'center' }}>
            <span style={{ fontWeight: 800, textDecoration: 'underline', textDecorationColor: '#7367F0', textUnderlineOffset: '4px' }}>Des tarifs adaptés</span>{' '}
            à vos besoins
          </Typography>
          <Typography sx={{ textAlign: 'center', color: '#6B6B80', maxWidth: 500 }}>
            Tous les plans incluent nos outils avancés pour booster votre veille juridique.<br/>
            Choisissez le plan qui vous convient.
          </Typography>
        </div>

        {/* Toggle Switch - Vuexy Style */}
        <div className='flex justify-center items-center mb-8 relative'>
          <Typography sx={{ fontWeight: 500, color: pricingPlan === 'monthly' ? '#5D596C' : '#A5A3AE', mr: 1 }}>
            Mensuel
          </Typography>
          <Switch 
            id='pricing-switch' 
            onChange={handleChange} 
            checked={pricingPlan === 'annually'} 
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#7367F0',
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#7367F0',
              },
            }}
          />
          <Typography sx={{ fontWeight: 500, color: pricingPlan === 'annually' ? '#5D596C' : '#A5A3AE', ml: 1 }}>
            Annuel
          </Typography>
          <Box sx={{ position: 'absolute', left: '50%', top: '-35px', transform: 'translateX(60px)', display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            <i className='tabler-corner-left-down text-gray-400' />
            <Chip label='Économisez 25%' size='small' variant='outlined' color='primary' />
          </Box>
        </div>

        {/* Pricing Cards - Constrained Width */}
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
          <Grid container spacing={6} justifyContent="center">
            {pricingPlans.map((plan, index) => (
            <Grid item xs={12} md={4} key={index}>
              <CardContent
                sx={{
                  position: 'relative',
                  border: plan.popular ? '2px solid #7367F0' : '1px solid #E7E3FC',
                  borderRadius: '12px',
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  backgroundColor: 'white',
                  height: '100%'
                }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <Chip
                    color='primary'
                    label='Populaire'
                    size='small'
                    sx={{ position: 'absolute', top: 16, right: 16 }}
                  />
                )}
                
                {/* Plan Image */}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <img src={plan.img} alt={plan.title} height='100' width='100' />
                </Box>
                
                {/* Plan Title & Subtitle */}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant='h5' sx={{ fontWeight: 700, color: '#5D596C' }}>
                    {plan.title}
                  </Typography>
                  <Typography sx={{ color: '#A5A3AE', fontSize: '0.875rem' }}>
                    {plan.subtitle}
                  </Typography>
                </Box>
                
                {/* Price */}
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
                    <Typography component='sup' sx={{ fontWeight: 500, fontSize: '1rem', alignSelf: 'flex-start', mt: 1 }}>
                      €
                    </Typography>
                    <Typography 
                      variant='h2' 
                      component='span' 
                      sx={{ color: '#7367F0', fontWeight: 700, lineHeight: 1 }}
                    >
                      {pricingPlan === 'monthly' ? plan.monthlyPay : plan.annualPay}
                    </Typography>
                    <Typography component='sub' sx={{ fontWeight: 500, fontSize: '0.875rem', alignSelf: 'flex-end', mb: 0.5 }}>
                      /mois
                    </Typography>
                  </Box>
                  {pricingPlan === 'annually' && plan.monthlyPay > 0 && (
                    <Typography 
                      variant='caption' 
                      sx={{ 
                        position: 'absolute', 
                        left: '50%', 
                        transform: 'translateX(-50%)',
                        color: '#A5A3AE'
                      }}
                    >
                      {plan.perYearPay}€ / an
                    </Typography>
                  )}
                </Box>
                
                {/* Features */}
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {plan.features.map((feature, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <i className='tabler-circle-filled text-[8px] text-[#7367F0]' />
                      <Typography sx={{ color: '#5D596C', fontSize: '0.9375rem' }}>
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                
                {/* CTA Button */}
                <Button 
                  component={Link} 
                  href='/payment' 
                  variant={plan.popular ? 'contained' : 'outlined'}
                  fullWidth
                  size='large'
                  sx={plan.popular ? {
                    backgroundColor: '#7367F0',
                    py: 1.5,
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: '#685DD8'
                    }
                  } : {
                    borderColor: '#E7E3FC',
                    color: '#7367F0',
                    py: 1.5,
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'rgba(115, 103, 240, 0.08)',
                      borderColor: '#7367F0'
                    }
                  }}
                >
                  {plan.monthlyPay === 0 ? 'Commencer gratuitement' : 'Choisir ce plan'}
                </Button>
              </CardContent>
            </Grid>
          ))}
          </Grid>
        </Box>
      </div>
    </section>
  )
}

export default PricingPlan
