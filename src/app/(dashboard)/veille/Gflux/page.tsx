'use client'

import { useState, useEffect } from 'react'

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { createClient } from '@/utils/supabase'

import type { Database } from '@/types/supabase'

type Source = Database['public']['Tables']['sources']['Row']

export default function SourcesPage() {
  const [sources, setSources] = useState<Source[]>([])
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const supabase = createClient()

  const fetchSources = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('sources')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching sources:', error)
    } else {
      setSources(data || [])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchSources()
  }, [])

  const handleAddSource = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !url) return

    setAdding(true)

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert('You must be logged in')
      setAdding(false)
      
return
    }

    const { error } = await supabase.from('sources').insert({
      name,
      url,
      user_id: user.id, // RLS handles this usually but good to be explicit or let RLS default if column defaults to auth.uid() (it doesn't usually)
      // The SQL schema has not null user_id, but usually backend handles it or we pass it.
      // SQL: user_id uuid references public.profiles(id) not null
    })

    if (error) {
      alert(error.message)
    } else {
      setName('')
      setUrl('')
      fetchSources()
    }

    setAdding(false)
  }

  const handleDeleteSource = async (id: string) => {
    if (!confirm('Are you sure you want to delete this source?')) return

    const { error } = await supabase.from('sources').delete().eq('id', id)

    if (error) {
      alert(error.message)
    } else {
      setSources(sources.filter(s => s.id !== id))
    }
  }

  return (
    <div className='flex flex-col gap-6'>
      <Typography variant='h4'>Gestion des Sources</Typography>

      <Card>
        <CardHeader title='Ajouter une nouvelle source' />
        <CardContent>
          <form onSubmit={handleAddSource} className='flex gap-4 items-end flex-wrap'>
            <TextField
              label='Nom de la source'
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className='flex-grow min-w-[200px]'
            />
            <TextField
              label='URL (Flux RSS ou Site Web)'
              value={url}
              onChange={e => setUrl(e.target.value)}
              required
              className='flex-grow min-w-[300px]'
            />
            <Button variant='contained' type='submit' disabled={adding}>
              {adding ? 'Ajout...' : 'Ajouter'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title='Sources surveillées' />
        <CardContent>
          <TableContainer component={Paper} elevation={0} variant='outlined'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align='right'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                   <TableRow>
                    <TableCell colSpan={4} align="center">Chargement...</TableCell>
                  </TableRow>
                ) : sources.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">Aucune source trouvée.</TableCell>
                  </TableRow>
                ) : (
                  sources.map((source) => (
                    <TableRow key={source.id}>
                      <TableCell>{source.name}</TableCell>
                      <TableCell className='max-w-[300px] truncate' title={source.url}>{source.url}</TableCell>
                      <TableCell>{source.type}</TableCell>
                      <TableCell align='right'>
                        <IconButton color='error' onClick={() => handleDeleteSource(source.id)}>
                          <i className='tabler-trash' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  )
}
