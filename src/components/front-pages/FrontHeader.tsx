'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Supabase Imports
import type { User } from '@supabase/supabase-js'

import { createClient } from '@/utils/supabase'

// Component Imports
import UserDropdown from '@components/layout/shared/UserDropdown'

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Fonctionnalités', href: '/features' },
  { label: 'Tarifs', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export default function FrontHeader() {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      setUser(user)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <Box 
      component='header' 
      className='fixed top-0 left-0 right-0 z-50'
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}
    >
      <Container maxWidth='lg'>
        <Box className='flex items-center justify-between py-3'>
          {/* Logo */}
          <Link href='/'>
            <Box className='flex items-center gap-2'>
              <Box 
                className='w-9 h-9 rounded-lg flex items-center justify-center'
                sx={{ background: 'linear-gradient(135deg, #7367F0 0%, #9E95F5 100%)' }}
              >
                <i className='tabler-scale text-lg text-white' />
              </Box>
              <Typography variant='h6' sx={{ fontWeight: 700, color: '#5D596C' }}>
                JurisBot
              </Typography>
            </Box>
          </Link>
          
          {/* Navigation Links - Vuexy Style */}
          <Box className='hidden md:flex items-center gap-1'>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: '6px',
                    transition: 'all 0.2s ease',
                    backgroundColor: pathname === link.href ? 'rgba(115, 103, 240, 0.08)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(115, 103, 240, 0.08)'
                    }
                  }}
                >
                  <Typography 
                    sx={{
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      color: pathname === link.href ? '#7367F0' : '#5D596C',
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: '#7367F0'
                      }
                    }}
                  >
                    {link.label}
                  </Typography>
                </Box>
              </Link>
            ))}
          </Box>

          {/* Login/Register Button - Vuexy Style */}
          {/* Login/Register Button or User Dropdown */}
          {user ? (
            <div className='flex items-center gap-3'>
              <Link href='/dashboard'>
                <Button 
                  variant='outlined' 
                  color='primary'
                  startIcon={<i className='tabler-layout-dashboard' />}
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  Dashboard
                </Button>
              </Link>
              <UserDropdown />
            </div>
          ) : (
            <Link href='/login'>
              <Button 
                variant='contained'
                startIcon={<i className='tabler-login' />}
                sx={{ 
                  backgroundColor: '#7367F0',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 3,
                  py: 1,
                  boxShadow: '0 2px 6px rgba(115, 103, 240, 0.4)',
                  '&:hover': {
                    backgroundColor: '#685DD8',
                    boxShadow: '0 4px 12px rgba(115, 103, 240, 0.4)'
                  }
                }}
              >
                Connexion
              </Button>
            </Link>
          )}
        </Box>
      </Container>
    </Box>
  )
}
