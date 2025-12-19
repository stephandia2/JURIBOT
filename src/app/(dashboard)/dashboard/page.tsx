'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'

import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import type { User } from '@supabase/supabase-js'

import { createClient } from '@/utils/supabase'

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)

  const [stats, setStats] = useState({
    sources: 0,
    toProcess: 0,
    drafts: 0,
    published: 0
  })

  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      // Get user
      const { data: { user } } = await supabase.auth.getUser()

      setUser(user)

      if (user) {
        // Get stats
        const [sourcesRes, articlesRes] = await Promise.all([
          supabase.from('sources').select('id', { count: 'exact', head: true }),
          supabase.from('articles').select('status')
        ])

        const articles = articlesRes.data || []
        
        setStats({
          sources: sourcesRes.count || 0,
          toProcess: articles.filter(a => a.status === 'to_process').length,
          drafts: articles.filter(a => a.status === 'draft_ready').length,
          published: articles.filter(a => a.status === 'published').length
        })
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const statCards = [
    {
      title: 'Sources surveillées',
      value: stats.sources,
      icon: 'tabler-rss',
      color: 'primary',
      href: '/dashboard/sources'
    },
    {
      title: 'À traiter',
      value: stats.toProcess,
      icon: 'tabler-clock',
      color: 'warning',
      href: '/dashboard/articles'
    },
    {
      title: 'Brouillons prêts',
      value: stats.drafts,
      icon: 'tabler-file-text',
      color: 'success',
      href: '/dashboard/articles'
    },
    {
      title: 'Publiés',
      value: stats.published,
      icon: 'tabler-brand-linkedin',
      color: 'info',
      href: '/dashboard/articles'
    }
  ]

  return (
    <Box className='flex flex-col gap-6'>
      {/* Welcome Section */}
      <Card className='bg-gradient-to-r from-primary to-primary/80'>
        <CardContent className='p-8'>
          <Typography variant='h4' className='text-white font-bold mb-2'>
            Bienvenue{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''} 👋
          </Typography>
          <Typography className='text-white/80 mb-4'>
            Votre assistant de curation juridique est prêt à vous aider.
          </Typography>
          <Box className='flex gap-3'>
            <Link href='/dashboard/sources'>
              <Button variant='contained' color='inherit' className='text-primary'>
                Ajouter une source
              </Button>
            </Link>
            <Link href='/dashboard/articles'>
              <Button variant='outlined' color='inherit' className='text-white border-white/50 hover:border-white'>
                Voir les articles
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <Grid container spacing={4}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Link href={stat.href}>
              <Card className='cursor-pointer hover:shadow-lg transition-shadow h-full'>
                <CardContent className='p-6'>
                  <Box className='flex items-center justify-between mb-4'>
                    <Box 
                      className={`w-12 h-12 rounded-lg flex items-center justify-center`}
                      sx={{ backgroundColor: `var(--mui-palette-${stat.color}-main)20` }}
                    >
                      <i className={`${stat.icon} text-2xl`} style={{ color: `var(--mui-palette-${stat.color}-main)` }} />
                    </Box>
                    {loading && <LinearProgress className='w-8' />}
                  </Box>
                  <Typography variant='h4' className='font-bold mb-1'>
                    {loading ? '...' : stat.value}
                  </Typography>
                  <Typography className='text-textSecondary'>
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card className='h-full'>
            <CardContent className='p-6'>
              <Typography variant='h6' className='font-bold mb-4'>
                🚀 Démarrage rapide
              </Typography>
              <Box className='space-y-3'>
                <Box className='flex items-center gap-3 p-3 rounded-lg bg-actionHover'>
                  <Box className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold'>
                    1
                  </Box>
                  <Typography>Ajoutez vos sources RSS ou sites web à surveiller</Typography>
                </Box>
                <Box className='flex items-center gap-3 p-3 rounded-lg bg-actionHover'>
                  <Box className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold'>
                    2
                  </Box>
                  <Typography>L'IA analyse et génère des brouillons LinkedIn</Typography>
                </Box>
                <Box className='flex items-center gap-3 p-3 rounded-lg bg-actionHover'>
                  <Box className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold'>
                    3
                  </Box>
                  <Typography>Relisez, éditez et publiez en un clic</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className='h-full'>
            <CardContent className='p-6'>
              <Typography variant='h6' className='font-bold mb-4'>
                📊 Activité récente
              </Typography>
              {loading ? (
                <Box className='flex items-center justify-center py-8'>
                  <LinearProgress className='w-full max-w-xs' />
                </Box>
              ) : stats.toProcess + stats.drafts + stats.published === 0 ? (
                <Box className='flex flex-col items-center justify-center py-8 text-center'>
                  <i className='tabler-inbox-off text-5xl text-textSecondary mb-4' />
                  <Typography className='text-textSecondary mb-4'>
                    Aucun article pour le moment
                  </Typography>
                  <Link href='/dashboard/sources'>
                    <Button variant='outlined' size='small'>
                      Ajouter une source
                    </Button>
                  </Link>
                </Box>
              ) : (
                <Box className='space-y-4'>
                  <Box>
                    <Box className='flex justify-between mb-1'>
                      <Typography variant='body2'>À traiter</Typography>
                      <Typography variant='body2' className='font-bold'>{stats.toProcess}</Typography>
                    </Box>
                    <LinearProgress 
                      variant='determinate' 
                      value={Math.min((stats.toProcess / (stats.toProcess + stats.drafts + stats.published)) * 100, 100)} 
                      color='warning'
                    />
                  </Box>
                  <Box>
                    <Box className='flex justify-between mb-1'>
                      <Typography variant='body2'>Brouillons</Typography>
                      <Typography variant='body2' className='font-bold'>{stats.drafts}</Typography>
                    </Box>
                    <LinearProgress 
                      variant='determinate' 
                      value={Math.min((stats.drafts / (stats.toProcess + stats.drafts + stats.published)) * 100, 100)} 
                      color='success'
                    />
                  </Box>
                  <Box>
                    <Box className='flex justify-between mb-1'>
                      <Typography variant='body2'>Publiés</Typography>
                      <Typography variant='body2' className='font-bold'>{stats.published}</Typography>
                    </Box>
                    <LinearProgress 
                      variant='determinate' 
                      value={Math.min((stats.published / (stats.toProcess + stats.drafts + stats.published)) * 100, 100)} 
                      color='info'
                    />
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
