'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
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
import { IconSearch, IconArchive, IconEye, IconCopy, IconFilter } from '@tabler/icons-react'

// Mock Data
const archivedPosts = [
  {
    id: 1,
    title: 'Les 5 erreurs a eviter en droit du travail',
    publishedDate: '2024-12-01',
    platform: 'LinkedIn',
    engagement: { likes: 234, comments: 45, shares: 12 },
    tone: 'Pedagogique'
  },
  {
    id: 2,
    title: 'Nouvelle jurisprudence sur le licenciement',
    publishedDate: '2024-11-28',
    platform: 'LinkedIn',
    engagement: { likes: 189, comments: 32, shares: 8 },
    tone: 'Professionnel'
  },
  {
    id: 3,
    title: 'RGPD : Ce que vous devez savoir',
    publishedDate: '2024-11-25',
    platform: 'LinkedIn',
    engagement: { likes: 312, comments: 67, shares: 24 },
    tone: 'Pedagogique'
  },
  {
    id: 4,
    title: 'Reforme des retraites : Impact juridique',
    publishedDate: '2024-11-20',
    platform: 'LinkedIn',
    engagement: { likes: 156, comments: 28, shares: 6 },
    tone: 'Polemique'
  },
  {
    id: 5,
    title: 'Teletravail : Droits et obligations',
    publishedDate: '2024-11-15',
    platform: 'LinkedIn',
    engagement: { likes: 278, comments: 54, shares: 18 },
    tone: 'Professionnel'
  }
]

const ArchivesPage = () => {
  const [posts] = useState(archivedPosts)
  const [searchTerm, setSearchTerm] = useState('')
  const [toneFilter, setToneFilter] = useState('all')

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTone = toneFilter === 'all' || post.tone === toneFilter

    return matchesSearch && matchesTone
  })

  const totalEngagement = posts.reduce(
    (acc, post) => ({
      likes: acc.likes + post.engagement.likes,
      comments: acc.comments + post.engagement.comments,
      shares: acc.shares + post.engagement.shares
    }),
    { likes: 0, comments: 0, shares: 0 }
  )

  return (
    <Grid container spacing={6}>
      {/* Header */}
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Archives des Publications'
            subheader='Historique de tous vos posts publies'
            avatar={<IconArchive size={24} />}
          />
        </Card>
      </Grid>

      {/* Stats Cards */}
      <Grid item xs={12} sm={4}>
        <Card className='bg-gradient-to-br from-blue-500 to-blue-600 text-white'>
          <CardContent>
            <Typography variant='h4' className='font-bold'>
              {posts.length}
            </Typography>
            <Typography variant='body2'>Posts Publies</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card className='bg-gradient-to-br from-green-500 to-green-600 text-white'>
          <CardContent>
            <Typography variant='h4' className='font-bold'>
              {totalEngagement.likes}
            </Typography>
            <Typography variant='body2'>Total Likes</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card className='bg-gradient-to-br from-purple-500 to-purple-600 text-white'>
          <CardContent>
            <Typography variant='h4' className='font-bold'>
              {totalEngagement.comments}
            </Typography>
            <Typography variant='body2'>Total Comments</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Filters */}
      <Grid item xs={12}>
        <Card>
          <CardContent className='flex gap-4 items-center flex-wrap'>
            <TextField
              placeholder='Rechercher un post...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              size='small'
              className='min-w-[300px]'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <IconSearch size={18} />
                  </InputAdornment>
                )
              }}
            />
            <FormControl size='small' className='min-w-[150px]'>
              <InputLabel>Ton</InputLabel>
              <Select
                value={toneFilter}
                label='Ton'
                onChange={e => setToneFilter(e.target.value)}
                startAdornment={<IconFilter size={16} className='mr-2' />}
              >
                <MenuItem value='all'>Tous</MenuItem>
                <MenuItem value='Professionnel'>Professionnel</MenuItem>
                <MenuItem value='Pedagogique'>Pedagogique</MenuItem>
                <MenuItem value='Polemique'>Polemique</MenuItem>
                <MenuItem value='Humoristique'>Humoristique</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>

      {/* Archives Table */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <TableContainer component={Paper} variant='outlined'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Titre</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Ton</TableCell>
                    <TableCell align='center'>Likes</TableCell>
                    <TableCell align='center'>Comments</TableCell>
                    <TableCell align='center'>Shares</TableCell>
                    <TableCell align='right'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPosts.map(post => (
                    <TableRow key={post.id} hover>
                      <TableCell>
                        <Typography variant='body2' className='font-medium'>
                          {post.title}
                        </Typography>
                      </TableCell>
                      <TableCell>{post.publishedDate}</TableCell>
                      <TableCell>
                        <Chip label={post.tone} size='small' variant='outlined' />
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2' className='font-semibold text-blue-600'>
                          {post.engagement.likes}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2' className='font-semibold text-green-600'>
                          {post.engagement.comments}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2' className='font-semibold text-purple-600'>
                          {post.engagement.shares}
                        </Typography>
                      </TableCell>
                      <TableCell align='right'>
                        <IconButton size='small' color='primary' title='Voir'>
                          <IconEye size={18} />
                        </IconButton>
                        <IconButton size='small' color='secondary' title='Dupliquer'>
                          <IconCopy size={18} />
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
    </Grid>
  )
}

export default ArchivesPage
