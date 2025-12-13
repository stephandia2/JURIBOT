'use client'

import { useState } from 'react'
import type { ChangeEvent } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import Container from '@mui/material/Container'

import FrontHeader from '@/components/front-pages/FrontHeader'
import FrontFooter from '@/components/front-pages/FrontFooter'

const pricingPlans = [
  {
    title: 'Starter',
    img: '/images/front-pages/landing-page/pricing-basic.png',
    monthlyPay: 0,
    annualPay: 0,
    perYearPay: 0,
    features: ['3 sources maximum', '10 articles/mois', 'Génération IA basique', 'Support email'],
    current: false
  },
  {
    title: 'Pro',
    img: '/images/front-pages/landing-page/pricing-team.png',
    monthlyPay: 29,
    annualPay: 24,
    perYearPay: 288,
    features: [
      'Tout Starter +',
      'Sources illimitées',
      '100 articles/mois',
      'IA Gemini Pro',
      'Analytics avancés',
      'Support prioritaire'
    ],
    current: true
  },
  {
    title: 'Cabinet',
    img: '/images/front-pages/landing-page/pricing-enterprise.png',
    monthlyPay: 99,
    annualPay: 89,
    perYearPay: 1068,
    features: [
      'Tout Pro +',
      'Multi-utilisateurs',
      'Branding personnalisé',
      'API access',
      'Account manager dédié',
      'SLA garanti'
    ],
    current: false
  }
]

export default function PricingPage() {
  const [pricingPlan, setPricingPlan] = useState<'monthly' | 'annually'>('annually')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setPricingPlan('annually')
    } else {
      setPricingPlan('monthly')
    }
  }

  return (
    <Box className='min-h-screen bg-white'>
      <FrontHeader />

      {/* Hero Section */}
      <Box 
        className='pt-32 pb-20 text-center'
        sx={{ background: 'linear-gradient(138.18deg, #eae8fd 0%, #fce5e6 94.44%)' }}
      >
        <Container maxWidth='lg'>
          <Chip size='small' variant='outlined' color='primary' label='Tarifs' className='mb-4' />
          <Typography variant='h3' className='font-bold text-[#5D596C] mb-4'>
            Des tarifs simples et transparents
          </Typography>
          <Typography className='text-gray-600 max-w-2xl mx-auto'>
            Choisissez le plan qui correspond à vos besoins. Changez ou annulez à tout moment.
          </Typography>
        </Container>
      </Box>

      {/* Pricing Plans */}
      <Container maxWidth='lg' className='py-20'>
        <div className='flex justify-center items-center mb-12'>
          <InputLabel htmlFor='pricing-switch' className='cursor-pointer text-gray-600 font-medium mr-2'>
            Mensuel
          </InputLabel>
          <Switch id='pricing-switch' onChange={handleChange} checked={pricingPlan === 'annually'} />
          <InputLabel htmlFor='pricing-switch' className='cursor-pointer text-gray-600 font-medium ml-2'>
            Annuel
          </InputLabel>
          <div className='flex gap-x-1 items-start ml-2 mb-5 hidden sm:flex'>
            <img src='/images/front-pages/landing-page/pricing-arrow.png' width='50' alt="arrow" />
            <Typography className='font-medium text-sm text-[#7367F0]'>-20%</Typography>
          </div>
        </div>

        <Grid container spacing={6}>
          {pricingPlans.map((plan, index) => (
            <Grid item xs={12} lg={4} key={index}>
              <Card className={`h-full ${plan.current ? 'border-2 border-[#7367F0] shadow-xl' : ''}`}>
                <CardContent className='flex flex-col gap-8 p-8 h-full justify-between'>
                  <div>
                    <div className='w-full flex flex-col items-center gap-3 mb-4'>
                      <img src={plan.img} alt={plan.title} height='88' width='86' className='text-center' />
                    </div>
                    <div className='flex flex-col items-center gap-y-[2px] relative mb-6'>
                      <Typography className='text-center font-bold' variant='h4'>
                        {plan.title}
                      </Typography>
                      <div className='flex items-baseline gap-x-1'>
                        <Typography variant='h3' className='font-extrabold text-[#7367F0]'>
                          {pricingPlan === 'monthly' ? plan.monthlyPay : plan.annualPay}€
                        </Typography>
                        <Typography color='text.secondary' className='font-medium'>
                          /mois
                        </Typography>
                      </div>
                      {pricingPlan === 'annually' && plan.monthlyPay > 0 && (
                        <Typography color='text.secondary' className='text-sm mt-1'>
                          Facturé {plan.perYearPay}€ / an
                        </Typography>
                      )}
                    </div>
                    <div className='flex flex-col gap-3 mt-3'>
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className='flex items-center gap-[12px]'>
                          <Box className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.current ? 'bg-[#7367F0] text-white' : 'bg-[#7367F0]/10 text-[#7367F0]'}`}>
                            <i className='tabler-check text-xs' />
                          </Box>
                          <Typography variant='body1' className='text-gray-600'>{feature}</Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button 
                    component={Link} 
                    href='/payment' 
                    variant={plan.current ? 'contained' : 'outlined'}
                    color='primary'
                    fullWidth
                    size='large'
                    sx={plan.current ? { backgroundColor: '#7367F0' } : {}}
                  >
                    Choisir ce plan
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* FAQ Section */}
        <Box className='mt-20 text-center'>
          <Typography variant='h5' className='font-bold text-[#5D596C] mb-4'>
            Des questions ?
          </Typography>
          <Typography className='text-gray-500 mb-6'>
            Consultez notre FAQ ou contactez-nous directement.
          </Typography>
          <Box className='flex gap-4 justify-center'>
            <Button component={Link} href='/faq' variant='outlined' color='primary'>
              Voir la FAQ
            </Button>
            <Button component={Link} href='/contact' variant='contained' sx={{ backgroundColor: '#7367F0' }}>
              Nous contacter
            </Button>
          </Box>
        </Box>
      </Container>

      <FrontFooter />
    </Box>
  )
}
