'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import HelpCenterHeader from '@/components/front-pages/help-center/HelpCenterHeader'
import KnowledgeBase from '@/components/front-pages/help-center/KnowledgeBase'
import NeedHelp from '@/components/front-pages/help-center/NeedHelp'

export default function HelpCenterPage() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Box className='min-h-screen bg-white'>
       {/* Header - Shared (should be componentized) */}
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
            
            <Box className='hidden md:flex items-center gap-8'>
              <Link href='/'>
                <Typography className='text-[#5D596C] hover:text-[#7367F0] transition-colors cursor-pointer font-medium'>
                  Accueil
                </Typography>
              </Link>
            </Box>

            <Box className='flex items-center gap-3'>
              <Link href='/login'>
                 <Button variant="outlined" color="primary">Connexion</Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>

      <div className='pt-16'>
        <HelpCenterHeader searchValue={searchValue} setSearchValue={setSearchValue} />
        <KnowledgeBase />
        <NeedHelp />
      </div>
    </Box>
  )
}
