'use client'

import { useState } from 'react'

import Link from 'next/link'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Chip from '@mui/material/Chip'


const countries = ['France', 'Belgique', 'Suisse', 'Canada', 'Luxembourg']

export default function PaymentPage() {
  const [selectCountry, setSelectCountry] = useState('France')
  const [paymentMethod, setPaymentMethod] = useState('credit-card')

  return (
    <Box className='min-h-screen bg-white py-24'>
       {/* Header - Reuse or import shared header */}
       <Box 
        component='header' 
        className='fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100'
      >
        <Container maxWidth='lg'>
          <Box className='flex items-center justify-between py-4'>
            <Link href='/'>
              <Box className='flex items-center gap-2'>
                <Box className='w-10 h-10 rounded-lg flex items-center justify-center bg-[#7367F0]'>
                  <i className='tabler-scale text-xl text-white' />
                </Box>
                <Typography variant='h5' className='font-bold text-[#5D596C]'>
                  JurisBot
                </Typography>
              </Box>
            </Link>
            <Link href='/pricing'>
               <Button variant="text">Retour aux tarifs</Button>
            </Link>
          </Box>
        </Container>
      </Box>

      <Container maxWidth='lg'>
        <Card sx={{ borderRadius: 4, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
          <Grid container>
            <Grid item xs={12} lg={7} sx={{ borderRight: '1px solid rgba(0,0,0,0.1)' }}>
              <CardContent className='p-8 flex flex-col gap-8'>
                <div className='flex flex-col gap-2'>
                  <Typography variant='h4' className='font-bold text-[#5D596C]'>Paiement</Typography>
                  <Typography className='text-gray-500'>
                    Finalisez votre abonnement pour accéder à toutes les fonctionnalités.
                  </Typography>
                </div>

                <FormControl component="fieldset">
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Box
                          className={`border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'credit-card' ? 'border-[#7367F0] bg-[#7367F0]/5' : 'border-gray-200'}`}
                          onClick={() => setPaymentMethod('credit-card')}
                        >
                          <FormControlLabel
                            value="credit-card"
                            control={<Radio />}
                            label={
                              <Box className='flex items-center gap-3'>
                                <Avatar variant='rounded' sx={{ bgcolor: 'white', ml: 1 }}>
                                  <img src='/images/front-pages/landing-page/pricing-basic.png' alt='visa' className='h-6 w-6 object-contain' /> 
                                  {/* Using a placeholder icon as I don't have visa.png confirmed, or standard icon */}
                                </Avatar>
                                <Typography className='font-bold text-[#5D596C]'>Carte Bancaire</Typography>
                              </Box>
                            }
                            className='m-0 w-full'
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                         <Box
                          className={`border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'border-[#7367F0] bg-[#7367F0]/5' : 'border-gray-200'}`}
                          onClick={() => setPaymentMethod('paypal')}
                        >
                          <FormControlLabel
                            value="paypal"
                            control={<Radio />}
                            label={
                              <Box className='flex items-center gap-3'>
                                <Avatar variant='rounded' sx={{ bgcolor: 'white', ml: 1 }}>
                                   <i className='tabler-brand-paypal text-blue-600 text-xl' />
                                </Avatar>
                                <Typography className='font-bold text-[#5D596C]'>PayPal</Typography>
                              </Box>
                            }
                            className='m-0 w-full'
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </FormControl>

                <div>
                  <Typography variant='h6' className='mb-6 font-bold text-[#5D596C]'>
                    Adresse de facturation
                  </Typography>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Email' placeholder='john.doe@gmail.com' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type='password' label='Mot de passe' placeholder='········' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label='Pays'
                        value={selectCountry}
                        onChange={(e) => setSelectCountry(e.target.value)}
                      >
                        {countries.map((item, index) => (
                          <MenuItem key={index} value={item}>{item}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Code Postal' type='number' />
                    </Grid>
                  </Grid>
                </div>

                {paymentMethod === 'credit-card' && (
                  <div>
                    <Typography variant='h6' className='mb-6 font-bold text-[#5D596C]'>
                      Détails de la carte
                    </Typography>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <TextField fullWidth label='Numéro de carte' placeholder='8763 2345 3478' />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='Titulaire' placeholder='John Doe' />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField fullWidth label='Exp.' placeholder='MM/AA' />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField fullWidth label='CVC' placeholder='123' />
                      </Grid>
                    </Grid>
                  </div>
                )}
              </CardContent>
            </Grid>

            <Grid item xs={12} lg={5}>
              <CardContent className='p-8 flex flex-col gap-8 bg-gray-50 h-full'>
                <div className='flex flex-col gap-2'>
                  <Typography variant='h4' className='font-bold text-[#5D596C]'>Récapitulatif</Typography>
                  <Typography className='text-gray-500'>
                    Abonnement Pro Mensuel
                  </Typography>
                </div>

                <div className='flex flex-col gap-5'>
                  <div className='flex flex-col gap-2 p-6 bg-white rounded-xl border border-gray-200'>
                     <Box className="flex justify-between items-center mb-2">
                        <Typography className='font-bold text-[#7367F0]'>Plan Pro</Typography>
                        <Chip label="Populaire" color="primary" size="small" />
                     </Box>
                    <div className='flex items-baseline'>
                      <Typography variant='h3' className='font-bold text-[#5D596C]'>29€</Typography>
                      <Typography component='span' className='text-gray-500'>/mois</Typography>
                    </div>
                    <Typography className='text-sm text-gray-500 mt-2'>
                        14 jours d'essai offerts. Vous ne serez pas débité avant la fin de la période d'essai.
                    </Typography>
                  </div>

                  <div>
                    <div className='flex justify-between mb-3'>
                      <Typography className='text-gray-600'>Abonnement</Typography>
                      <Typography className='font-medium text-[#5D596C]'>29.00€</Typography>
                    </div>
                    <div className='flex justify-between mb-3'>
                      <Typography className='text-gray-600'>TVA (20%)</Typography>
                      <Typography className='font-medium text-[#5D596C]'>5.80€</Typography>
                    </div>
                    <Divider className='my-4' />
                    <div className='flex justify-between mb-4'>
                      <Typography className='font-bold text-lg text-[#5D596C]'>Total à payer</Typography>
                      <Typography className='font-bold text-lg text-[#7367F0]'>34.80€</Typography>
                    </div>
                  </div>

                  <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    fullWidth
                    sx={{ py: 1.5, backgroundColor: '#7367F0' }}
                  >
                    Confirmer et Payer
                  </Button>
                  
                  <Typography className='text-xs text-center text-gray-400 mt-4'>
                    Transactions sécurisées SSL 256-bit. <br/>
                    En confirmant, vous acceptez nos CGV.
                  </Typography>
                </div>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  )
}
