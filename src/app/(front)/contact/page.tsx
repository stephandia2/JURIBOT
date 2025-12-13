'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'

import FrontHeader from '@/components/front-pages/FrontHeader'
import FrontFooter from '@/components/front-pages/FrontFooter'

const contactMethods = [
  {
    icon: 'tabler-mail',
    title: 'Email',
    description: 'Envoyez-nous un email, nous répondons sous 24h.',
    action: 'contact@jurisbot.fr'
  },
  {
    icon: 'tabler-phone',
    title: 'Téléphone',
    description: 'Appelez-nous du lundi au vendredi, 9h-18h.',
    action: '+33 1 23 45 67 89'
  },
  {
    icon: 'tabler-brand-linkedin',
    title: 'LinkedIn',
    description: 'Suivez-nous et échangez avec nous.',
    action: '@JurisBot'
  }
]

export default function ContactPage() {
  return (
    <Box className='min-h-screen bg-white'>
      <FrontHeader />

      {/* Hero Section */}
      <Box 
        className='pt-32 pb-20 text-center'
        sx={{ background: 'linear-gradient(138.18deg, #eae8fd 0%, #fce5e6 94.44%)' }}
      >
        <Container maxWidth='lg'>
          <Chip size='small' variant='outlined' color='primary' label='Contact' className='mb-4' />
          <Typography variant='h3' className='font-bold text-[#5D596C] mb-4'>
            Contactez-nous
          </Typography>
          <Typography className='text-gray-600 max-w-2xl mx-auto'>
            Une question ? Un projet ? Notre équipe est à votre écoute.
          </Typography>
        </Container>
      </Box>

      {/* Contact Content */}
      <Container maxWidth='lg' className='py-20'>
        <Grid container spacing={6}>
          {/* Contact Methods */}
          <Grid item xs={12} lg={4}>
            <Box className='space-y-6'>
              {contactMethods.map((method, index) => (
                <Card key={index} className='border border-gray-100'>
                  <CardContent className='p-6'>
                    <Box className='flex items-start gap-4'>
                      <Box className='w-12 h-12 rounded-full bg-[#7367F0]/10 flex items-center justify-center'>
                        <i className={`${method.icon} text-2xl text-[#7367F0]`} />
                      </Box>
                      <Box>
                        <Typography variant='h6' className='font-bold text-[#5D596C]'>
                          {method.title}
                        </Typography>
                        <Typography className='text-gray-500 text-sm mb-2'>
                          {method.description}
                        </Typography>
                        <Typography className='text-[#7367F0] font-medium'>
                          {method.action}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} lg={8}>
            <Card className='border border-gray-100'>
              <CardContent className='p-8'>
                <Typography variant='h5' className='font-bold text-[#5D596C] mb-6'>
                  Envoyez-nous un message
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Nom' placeholder='Votre nom' />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Email' placeholder='votre@email.com' type='email' />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label='Sujet' placeholder='Objet de votre message' />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      fullWidth 
                      label='Message' 
                      placeholder='Décrivez votre demande...' 
                      multiline 
                      rows={6} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      variant='contained' 
                      size='large' 
                      sx={{ backgroundColor: '#7367F0' }}
                    >
                      Envoyer le message
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <FrontFooter />
    </Box>
  )
}
