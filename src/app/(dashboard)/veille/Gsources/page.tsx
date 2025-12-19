'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

import { Database } from '@/types/supabase'

type Article = Database['public']['Tables']['articles']['Row']

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [tabValue, setTabValue] = useState('all')
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [editorOpen, setEditorOpen] = useState(false)
  const [draftContent, setDraftContent] = useState('')
  const [processing, setProcessing] = useState(false)

  const supabase = createClient()

  const fetchArticles = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching articles:', error)
    } else {
      setArticles(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }

  const filteredArticles = articles.filter(article => {
    if (tabValue === 'all') return true
    if (tabValue === 'to_process') return article.status === 'to_process'
    if (tabValue === 'draft_ready') return article.status === 'draft_ready'
    if (tabValue === 'published') return article.status === 'published'
    return true
  })

  const getStatusChip = (status: string | null) => {
    switch (status) {
      case 'to_process': return <Chip label='À traiter' color='warning' size='small' />
      case 'draft_ready': return <Chip label='Brouillon prêt' color='success' size='small' />
      case 'published': return <Chip label='Publié' color='primary' size='small' />
      case 'error': return <Chip label='Erreur' color='error' size='small' />
      default: return <Chip label={status} size='small' />
    }
  }

  const handleOpenEditor = (article: Article) => {
    setSelectedArticle(article)
    setDraftContent(article.linkedin_draft || '')
    setEditorOpen(true)
  }

  const handleCloseEditor = () => {
    setEditorOpen(false)
    setSelectedArticle(null)
  }

  const handleUpdateStatus = async (status: 'published' | 'draft_ready') => {
    if (!selectedArticle) return
    setProcessing(true)

    const updates: any = { status }
    if (status === 'published') {
      // Logic to actually publish would go here or be triggered by status change
      updates.linkedin_draft = draftContent
    } else {
       updates.linkedin_draft = draftContent
    }

    const { error } = await supabase
      .from('articles')
      .update(updates)
      .eq('id', selectedArticle.id)

    if (error) {
      alert(error.message)
    } else {
      // Update local state
      setArticles(articles.map(a => a.id === selectedArticle.id ? { ...a, ...updates } : a))
      setEditorOpen(false)
    }
    setProcessing(false)
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
        <Typography variant='h4'>Flux de Curation</Typography>
        <Button variant='outlined' onClick={fetchArticles} startIcon={<i className='tabler-refresh' />}>
          Actualiser
        </Button>
      </div>
      
      <Card>
        <TabContext value={tabValue}>
          <div className='border-b'>
            <TabList onChange={handleTabChange} aria-label='article tabs'>
              <Tab label='Tout' value='all' />
              <Tab label='À traiter' value='to_process' />
              <Tab label='Brouillons' value='draft_ready' />
              <Tab label='Publiés' value='published' />
            </TabList>
          </div>
          
          <TabPanel value={tabValue} className='p-0'>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Titre</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align='right'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center" className='p-4'>Chargement...</TableCell>
                    </TableRow>
                  ) : filteredArticles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center" className='p-4'>Aucun article.</TableCell>
                    </TableRow>
                  ) : (
                    filteredArticles.map((article) => (
                      <TableRow key={article.id} hover>
                        <TableCell className='whitespace-nowrap'>
                          {new Date(article.created_at || '').toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className='font-medium'>{article.title || 'Sans titre'}</div>
                          <div className='text-xs text-textSecondary'>{article.source_url}</div>
                        </TableCell>
                        <TableCell>
                          {getStatusChip(article.status)}
                        </TableCell>
                        <TableCell align='right'>
                          <Button 
                            variant='text' 
                            size='small' 
                            onClick={() => handleOpenEditor(article)}
                          >
                            {article.status === 'draft_ready' ? 'Éditer' : 'Voir'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabContext>
      </Card>

      {/* Editor Dialog */}
      <Dialog 
        open={editorOpen} 
        onClose={handleCloseEditor}
        fullWidth
        maxWidth='lg'
        scroll='paper'
      >
        <DialogTitle className='flex justify-between items-center'>
          <span>Édition du Post LinkedIn</span>
          {getStatusChip(selectedArticle?.status || '')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={4} className='h-full'>
            {/* Left: Original Content */}
            <Grid item xs={12} md={6} className='border-r border-dashed' sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
              <Typography variant='subtitle1' className='mb-2 font-bold'>Article Original</Typography>
              <Typography variant='h6' className='mb-4'>{selectedArticle?.title}</Typography>
              <Typography variant='body2' className='whitespace-pre-wrap text-textSecondary'>
                {selectedArticle?.original_content || 'Aucun contenu récupéré.'}
              </Typography>
              {selectedArticle?.source_url && (
                <a href={selectedArticle.source_url} target='_blank' rel='noreferrer' className='text-primary mt-4 block'>
                  Voir la source originale
                </a>
              )}
            </Grid>

            {/* Right: Draft Editor */}
            <Grid item xs={12} md={6}>
              <Typography variant='subtitle1' className='mb-2 font-bold'>Brouillon LinkedIn (IA)</Typography>
              {selectedArticle?.status === 'to_process' ? (
                <div className='flex items-center justify-center h-[200px] border rounded bg-actionHover'>
                  <Typography color='textSecondary'>En attente de traitement par l'IA...</Typography>
                </div>
              ) : (
                <TextField
                  multiline
                  rows={20}
                  fullWidth
                  variant='outlined'
                  value={draftContent}
                  onChange={(e) => setDraftContent(e.target.value)}
                  placeholder="Le brouillon généré par l'IA apparaîtra ici..."
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='p-4'>
          <Button onClick={handleCloseEditor} color='secondary'>
            Fermer
          </Button>
          {selectedArticle?.status === 'draft_ready' && (
            <>
              <Button 
                onClick={() => handleUpdateStatus('draft_ready')}
                disabled={processing}
              >
                Sauvegarder Brouillon
              </Button>
              <Button 
                variant='contained' 
                color='primary'
                onClick={() => handleUpdateStatus('published')}
                disabled={processing}
                startIcon={<i className='tabler-brand-linkedin' />}
              >
                Valider & Publier
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}
