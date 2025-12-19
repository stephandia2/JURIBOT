'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

// Icons
import {
  IconChartBar,
  IconEye,
  IconThumbUp,
  IconMessageCircle,
  IconShare,
  IconTrendingUp,
  IconTrendingDown
} from '@tabler/icons-react'

// Mock Data
const statsOverview = {
  totalPosts: 47,
  totalImpressions: 125400,
  avgEngagement: 4.2,
  topPost: 'Les 5 erreurs en droit du travail'
}

const recentPosts = [
  {
    id: 1,
    title: 'Les 5 erreurs a eviter en droit du travail',
    date: '2024-12-01',
    impressions: 12500,
    likes: 234,
    comments: 45,
    shares: 12,
    engagement: 5.8,
    trend: 'up'
  },
  {
    id: 2,
    title: 'Nouvelle jurisprudence sur le licenciement',
    date: '2024-11-28',
    impressions: 8900,
    likes: 189,
    comments: 32,
    shares: 8,
    engagement: 4.2,
    trend: 'down'
  },
  {
    id: 3,
    title: 'RGPD : Ce que vous devez savoir',
    date: '2024-11-25',
    impressions: 15200,
    likes: 312,
    comments: 67,
    shares: 24,
    engagement: 6.1,
    trend: 'up'
  },
  {
    id: 4,
    title: 'Reforme des retraites : Impact juridique',
    date: '2024-11-20',
    impressions: 6800,
    likes: 156,
    comments: 28,
    shares: 6,
    engagement: 3.4,
    trend: 'down'
  },
  {
    id: 5,
    title: 'Teletravail : Droits et obligations',
    date: '2024-11-15',
    impressions: 11200,
    likes: 278,
    comments: 54,
    shares: 18,
    engagement: 5.2,
    trend: 'up'
  }
]

const LinkedInStatsView = () => {
  const [timeRange, setTimeRange] = useState('30d')

  return (
    <Grid container spacing={6}>
      {/* Header */}
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Statistiques LinkedIn'
            subheader='Performances de vos publications'
            avatar={<IconChartBar size={24} />}
            action={
              <FormControl size='small' sx={{ minWidth: 120 }}>
                <InputLabel>Periode</InputLabel>
                <Select value={timeRange} label='Periode' onChange={e => setTimeRange(e.target.value)}>
                  <MenuItem value='7d'>7 jours</MenuItem>
                  <MenuItem value='30d'>30 jours</MenuItem>
                  <MenuItem value='90d'>90 jours</MenuItem>
                  <MenuItem value='all'>Tout</MenuItem>
                </Select>
              </FormControl>
            }
          />
        </Card>
      </Grid>

      {/* KPI Cards */}
      <Grid item xs={12} sm={6} md={3}>
        <Card className='h-full'>
          <CardContent className='flex flex-col items-center justify-center py-6'>
            <Box className='bg-blue-100 p-3 rounded-full mb-3'>
              <IconEye size={28} className='text-blue-600' />
            </Box>
            <Typography variant='h4' className='font-bold'>
              {statsOverview.totalImpressions.toLocaleString()}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Impressions Totales
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card className='h-full'>
          <CardContent className='flex flex-col items-center justify-center py-6'>
            <Box className='bg-green-100 p-3 rounded-full mb-3'>
              <IconThumbUp size={28} className='text-green-600' />
            </Box>
            <Typography variant='h4' className='font-bold'>
              {statsOverview.avgEngagement}%
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Taux Engagement Moyen
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card className='h-full'>
          <CardContent className='flex flex-col items-center justify-center py-6'>
            <Box className='bg-purple-100 p-3 rounded-full mb-3'>
              <IconMessageCircle size={28} className='text-purple-600' />
            </Box>
            <Typography variant='h4' className='font-bold'>
              {statsOverview.totalPosts}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Posts Publies
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card className='h-full'>
          <CardContent className='flex flex-col items-center justify-center py-6'>
            <Box className='bg-orange-100 p-3 rounded-full mb-3'>
              <IconShare size={28} className='text-orange-600' />
            </Box>
            <Typography variant='h4' className='font-bold'>
              1.2K
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Partages Totaux
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Top Performing Post */}
      <Grid item xs={12} md={6}>
        <Card className='h-full'>
          <CardHeader title='Meilleur Post' subheader='Publication avec le plus engagement' />
          <CardContent>
            <Box className='bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg'>
              <Typography variant='h6' className='font-semibold mb-2'>
                {statsOverview.topPost}
              </Typography>
              <Box className='flex gap-4 mt-3'>
                <Box className='flex items-center gap-1'>
                  <IconEye size={16} className='text-gray-500' />
                  <Typography variant='body2'>12.5K vues</Typography>
                </Box>
                <Box className='flex items-center gap-1'>
                  <IconThumbUp size={16} className='text-blue-500' />
                  <Typography variant='body2'>234 likes</Typography>
                </Box>
                <Box className='flex items-center gap-1'>
                  <IconMessageCircle size={16} className='text-green-500' />
                  <Typography variant='body2'>45 commentaires</Typography>
                </Box>
              </Box>
              <Box className='mt-4'>
                <Typography variant='body2' color='text.secondary' className='mb-1'>
                  Taux engagement
                </Typography>
                <Box className='flex items-center gap-2'>
                  <LinearProgress variant='determinate' value={58} className='flex-grow h-2 rounded' />
                  <Typography variant='body2' className='font-semibold'>
                    5.8%
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Engagement by Day */}
      <Grid item xs={12} md={6}>
        <Card className='h-full'>
          <CardHeader title='Meilleurs Jours' subheader='Engagement par jour de la semaine' />
          <CardContent>
            <Box className='space-y-3'>
              {['Mardi', 'Mercredi', 'Jeudi', 'Lundi', 'Vendredi'].map((day, index) => (
                <Box key={day} className='flex items-center gap-3'>
                  <Typography variant='body2' className='w-20'>
                    {day}
                  </Typography>
                  <LinearProgress
                    variant='determinate'
                    value={90 - index * 15}
                    className='flex-grow h-3 rounded'
                    color={index === 0 ? 'success' : 'primary'}
                  />
                  <Typography variant='body2' className='w-10 text-right'>
                    {90 - index * 15}%
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Recent Posts Table */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Performances Recentes' subheader='Detaill de vos derniers posts' />
          <CardContent>
            <TableContainer component={Paper} variant='outlined'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Post</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align='center'>Impressions</TableCell>
                    <TableCell align='center'>Likes</TableCell>
                    <TableCell align='center'>Comments</TableCell>
                    <TableCell align='center'>Engagement</TableCell>
                    <TableCell align='center'>Trend</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentPosts.map(post => (
                    <TableRow key={post.id} hover>
                      <TableCell>
                        <Typography variant='body2' className='font-medium max-w-xs truncate'>
                          {post.title}
                        </Typography>
                      </TableCell>
                      <TableCell>{post.date}</TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{post.impressions.toLocaleString()}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2' className='text-blue-600 font-medium'>
                          {post.likes}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2' className='text-green-600 font-medium'>
                          {post.comments}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Chip label={`${post.engagement}%`} size='small' color={post.engagement >= 5 ? 'success' : 'default'} />
                      </TableCell>
                      <TableCell align='center'>
                        {post.trend === 'up' ? (
                          <IconTrendingUp size={20} className='text-green-500' />
                        ) : (
                          <IconTrendingDown size={20} className='text-red-500' />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LinkedInStatsView
