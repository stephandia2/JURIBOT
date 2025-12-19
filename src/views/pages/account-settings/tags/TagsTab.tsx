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
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'

// Icons
import { IconPlus, IconX, IconTag, IconSearch } from '@tabler/icons-react'

// Mock Data
const initialTags = [
  { id: 1, name: 'Droit du travail', color: 'primary' },
  { id: 2, name: 'RGPD', color: 'secondary' },
  { id: 3, name: 'Licenciement', color: 'error' },
  { id: 4, name: 'Contrats', color: 'success' },
  { id: 5, name: 'Jurisprudence', color: 'warning' },
  { id: 6, name: 'Teletravail', color: 'info' }
]

const initialKeywords = [
  'reforme',
  'loi',
  'arret',
  'cour de cassation',
  'code du travail',
  'conseil prudhommes'
]

const TagsTab = () => {
  const [tags, setTags] = useState(initialTags)
  const [keywords, setKeywords] = useState(initialKeywords)
  const [newTag, setNewTag] = useState('')
  const [newKeyword, setNewKeyword] = useState('')

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, { id: Date.now(), name: newTag.trim(), color: 'default' }])
      setNewTag('')
    }
  }

  const handleRemoveTag = (id: number) => {
    setTags(tags.filter(tag => tag.id !== id))
  }

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()])
      setNewKeyword('')
    }
  }

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword))
  }

  return (
    <Grid container spacing={6}>
      {/* Tags Section */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader
            title='Tags de categorisation'
            subheader='Organisez vos articles par themes'
            avatar={<IconTag size={24} />}
          />
          <CardContent>
            <Box className='flex gap-2 mb-4'>
              <TextField
                fullWidth
                size='small'
                placeholder='Nouveau tag...'
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleAddTag()}
              />
              <Button variant='contained' onClick={handleAddTag} startIcon={<IconPlus size={18} />}>
                Ajouter
              </Button>
            </Box>

            <Divider className='my-4' />

            <Typography variant='body2' color='text.secondary' className='mb-3'>
              Tags actifs ({tags.length})
            </Typography>

            <Box className='flex flex-wrap gap-2'>
              {tags.map(tag => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  color={tag.color as any}
                  onDelete={() => handleRemoveTag(tag.id)}
                  deleteIcon={<IconX size={14} />}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Keywords Section */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader
            title='Mots-cles de veille'
            subheader='Definissez les termes a surveiller'
            avatar={<IconSearch size={24} />}
          />
          <CardContent>
            <Box className='flex gap-2 mb-4'>
              <TextField
                fullWidth
                size='small'
                placeholder='Nouveau mot-cle...'
                value={newKeyword}
                onChange={e => setNewKeyword(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleAddKeyword()}
              />
              <Button variant='contained' onClick={handleAddKeyword} startIcon={<IconPlus size={18} />}>
                Ajouter
              </Button>
            </Box>

            <Divider className='my-4' />

            <Typography variant='body2' color='text.secondary' className='mb-3'>
              Mots-cles surveilles ({keywords.length})
            </Typography>

            <Box className='flex flex-wrap gap-2'>
              {keywords.map(keyword => (
                <Chip
                  key={keyword}
                  label={keyword}
                  variant='outlined'
                  onDelete={() => handleRemoveKeyword(keyword)}
                  deleteIcon={<IconX size={14} />}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Info Card */}
      <Grid item xs={12}>
        <Card className='bg-gradient-to-r from-blue-50 to-purple-50'>
          <CardContent>
            <Typography variant='h6' className='mb-2'>
              Comment utiliser les tags et mots-cles ?
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <strong>Tags</strong> : Utilisez-les pour categoriser vos articles et posts. Ils apparaitront dans vos archives et statistiques.
            </Typography>
            <Typography variant='body2' color='text.secondary' className='mt-1'>
              <strong>Mots-cles</strong> : L&apos;IA utilisera ces termes pour filtrer et prioriser les articles juridiques pertinents dans votre veille.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TagsTab
