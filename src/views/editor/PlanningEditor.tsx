'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

// Icons
import { IconCalendar, IconClock, IconEdit, IconTrash, IconPlus } from '@tabler/icons-react'

// Mock Data
const scheduledPosts = [
  {
    id: 1,
    title: 'Reforme du droit du travail 2024',
    scheduledDate: '2024-12-15',
    scheduledTime: '09:00',
    status: 'scheduled',
    tone: 'Professionnel'
  },
  {
    id: 2,
    title: 'Arret Cour de Cassation - Teletravail',
    scheduledDate: '2024-12-16',
    scheduledTime: '12:00',
    status: 'scheduled',
    tone: 'Pedagogique'
  },
  {
    id: 3,
    title: 'RGPD : Nouvelles sanctions',
    scheduledDate: '2024-12-17',
    scheduledTime: '14:30',
    status: 'draft',
    tone: 'Polemique'
  }
]

const PlanningEditor = () => {
  const [posts] = useState(scheduledPosts)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'success';
      case 'draft':
        return 'warning';
      case 'published':
        return 'info';
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Planifie';
      case 'draft':
        return 'Brouillon';
      case 'published':
        return 'Publie';
      default:
        return status
    }
  }

  return (
    <Grid container spacing={6}>
      {/* Header */}
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Planificateur de Publications'
            subheader='Gerez vos posts LinkedIn programmes'
            action={
              <Button variant='contained' startIcon={<IconPlus size={18} />}>
                Nouveau Post
              </Button>
            }
          />
        </Card>
      </Grid>

      {/* Calendar Overview */}
      <Grid item xs={12} md={4}>
        <Card className='h-full'>
          <CardContent>
            <Typography variant='h6' className='mb-4 flex items-center gap-2'>
              <IconCalendar size={20} />
              Cette Semaine
            </Typography>
            <Box className='space-y-3'>
              {posts.slice(0, 3).map(post => (
                <Box
                  key={post.id}
                  className='p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border-l-4 border-primary'
                >
                  <Typography variant='subtitle2' className='font-semibold'>
                    {post.title}
                  </Typography>
                  <Typography variant='caption' className='text-slate-500 flex items-center gap-1 mt-1'>
                    <IconClock size={14} />
                    {post.scheduledDate} a {post.scheduledTime}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Posts Table */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              Publications Programmees
            </Typography>
            <TableContainer component={Paper} variant='outlined'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Titre</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Heure</TableCell>
                    <TableCell>Ton</TableCell>
                    <TableCell>Statut</TableCell>
                    <TableCell align='right'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {posts.map(post => (
                    <TableRow key={post.id} hover>
                      <TableCell>
                        <Typography variant='body2' className='font-medium'>
                          {post.title}
                        </Typography>
                      </TableCell>
                      <TableCell>{post.scheduledDate}</TableCell>
                      <TableCell>{post.scheduledTime}</TableCell>
                      <TableCell>
                        <Chip label={post.tone} size='small' variant='outlined' />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(post.status)}
                          size='small'
                          color={getStatusColor(post.status) as any}
                        />
                      </TableCell>
                      <TableCell align='right'>
                        <IconButton size='small' color='primary'>
                          <IconEdit size={18} />
                        </IconButton>
                        <IconButton size='small' color='error'>
                          <IconTrash size={18} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Engagement Tips */}
      <Grid item xs={12}>
        <Card className='bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
          <CardContent>
            <Typography variant='h6' className='mb-2'>
              Conseil Engagement
            </Typography>
            <Typography variant='body2'>
              Les meilleurs moments pour publier sur LinkedIn sont le mardi et jeudi entre 8h-10h et 17h-18h.
              Planifiez vos posts strategiquement pour maximiser votre visibilite !
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PlanningEditor
