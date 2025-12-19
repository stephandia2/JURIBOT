'use client'

import Link from 'next/link'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

export default function FrontFooter() {
  return (
    <Box component='footer' className='py-12 bg-[#28243D]'>
      <Container maxWidth='lg'>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Box className='flex items-center gap-2 mb-4'>
              <Box className='w-10 h-10 rounded-lg flex items-center justify-center bg-[#7367F0]'>
                <i className='tabler-scale text-xl text-white' />
              </Box>
              <Typography variant='h6' className='font-bold text-white'>JurisBot</Typography>
            </Box>
            <Typography className='text-white/60 mb-4'>
              La solution IA pour automatiser votre veille juridique et votre présence LinkedIn.
            </Typography>
            <Box className='flex items-center gap-3'>
              <IconButton size='small' sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <i className='tabler-brand-linkedin' />
              </IconButton>
              <IconButton size='small' sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <i className='tabler-brand-twitter' />
              </IconButton>
              <IconButton size='small' sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <i className='tabler-mail' />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant='subtitle2' className='font-bold mb-4 text-white'>Produit</Typography>
            <Box className='space-y-2'>
              <Link href='/features'><Typography className='text-white/60 hover:text-white cursor-pointer'>Fonctionnalités</Typography></Link>
              <Link href='/pricing'><Typography className='text-white/60 hover:text-white cursor-pointer'>Tarifs</Typography></Link>
              <Link href='/faq'><Typography className='text-white/60 hover:text-white cursor-pointer'>FAQ</Typography></Link>
            </Box>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant='subtitle2' className='font-bold mb-4 text-white'>Entreprise</Typography>
            <Box className='space-y-2'>
              <Link href='/contact'><Typography className='text-white/60 hover:text-white cursor-pointer'>Contact</Typography></Link>
              <Typography className='text-white/60 hover:text-white cursor-pointer'>CGU</Typography>
              <Typography className='text-white/60 hover:text-white cursor-pointer'>Confidentialité</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant='subtitle2' className='font-bold mb-4 text-white'>Newsletter</Typography>
            <Typography className='text-white/60 mb-4'>Recevez nos conseils LinkedIn.</Typography>
            <Box className='flex gap-2'>
              <TextField 
                placeholder='Votre email'
                size='small'
                variant='outlined'
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)', 
                  borderRadius: 1,
                  input: { color: 'white' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' }
                }}
              />
              <Button variant='contained' sx={{ backgroundColor: '#7367F0' }}>OK</Button>
            </Box>
          </Grid>
        </Grid>
        <Box className='mt-12 pt-6 border-t border-white/10 text-center'>
          <Typography className='text-white/60'>
            © 2025 <Link href='https://stephanequentin.fr' target='_blank' className='text-white hover:underline'>STEPHANE QUENTIN</Link>. Tous droits réservés.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
