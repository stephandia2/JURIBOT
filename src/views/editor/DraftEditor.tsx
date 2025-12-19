'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'

// Icons
import { IconThumbUp, IconMessageCircle, IconShare, IconSend } from '@tabler/icons-react'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const DraftEditor = () => {
  // States
  const [tone, setTone] = useState('professional')
  const [topic, setTopic] = useState('')
  const [content, setContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)

    // Simulate API call
    setTimeout(() => {
      setContent(
        "Voici un brouillon généré par l'IA sur le sujet : " +
          topic +
          ".\n\nCe texte est un exemple de post LinkedIn optimisé pour l'engagement. Il utilise un ton " +
          tone +
          " pour maximiser l'impact.\n\n#Droit #VeilleJuridique #LegalTech"
      )
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <Grid container spacing={6}>
      {/* Left Column: Editor & AI Controls */}
      <Grid item xs={12} md={6}>
        <Card className='h-full'>
          <CardContent className='flex flex-col gap-4'>
            <Typography variant='h5' className='mb-2'>
              Studio de Création ✍️
            </Typography>

            {/* Tone Selection */}
            <CustomTextField
              select
              fullWidth
              label='Ton de la rédaction'
              value={tone}
              onChange={e => setTone(e.target.value)}
              id='tone-select'
            >
              <MenuItem value='professional'>👔 Professionnel & Expert</MenuItem>
              <MenuItem value='pedagogical'>🎓 Pédagogique & Clair</MenuItem>
              <MenuItem value='controversial'>🔥 Polémique & Débat</MenuItem>
              <MenuItem value='humorous'>😂 Humoristique & Décalé</MenuItem>
            </CustomTextField>

            {/* Topic Input */}
            <CustomTextField
              fullWidth
              label='Sujet, URL ou Mots-clés'
              placeholder='Ex: Arrêt de la Cour de Cassation sur le télétravail...'
              value={topic}
              onChange={e => setTopic(e.target.value)}
            />

            {/* Generate Button */}
            <Button
              variant='contained'
              onClick={handleGenerate}
              disabled={!topic || isGenerating}
              startIcon={isGenerating ? <i className='tabler-loader animate-spin' /> : <i className='tabler-wand' />}
            >
              {isGenerating ? 'Génération en cours...' : 'Générer le brouillon'}
            </Button>

            <Divider className='my-2' />

            {/* Rich Text Editor (Simple Multiline for now) */}
            <CustomTextField
              fullWidth
              multiline
              rows={12}
              label='Editeur de contenu'
              placeholder='Votre post LinkedIn apparaitra ici...'
              value={content}
              onChange={e => setContent(e.target.value)}
            />

            {/* Action Buttons */}
            <Box className='flex gap-2 flex-wrap'>
              <Button
                variant='outlined'
                color='secondary'
                disabled={!content}
                onClick={() => {
                  navigator.clipboard.writeText(content)
                  alert('Contenu copie!')
                }}
                startIcon={<i className='tabler-copy' />}
              >
                Copier
              </Button>
              <Button
                variant='outlined'
                color='primary'
                disabled={!content || isGenerating}
                onClick={() => {
                  setIsGenerating(true)
                  setTimeout(() => {
                    setContent(prev => prev + '\n\n[Version reformulee avec plus engagement]')
                    setIsGenerating(false)
                  }, 1000)
                }}
                startIcon={<i className='tabler-refresh' />}
              >
                Reformuler
              </Button>
              <Button
                variant='contained'
                color='success'
                disabled={!content}
                href='/editor/planning'
                startIcon={<i className='tabler-calendar' />}
              >
                Planifier
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Right Column: LinkedIn Preview */}
      <Grid item xs={12} md={6}>
        <Card className='h-full bg-slate-50 dark:bg-[#1b1b1b]'>
          <CardContent>
            <Typography variant='h6' className='mb-4 text-slate-500'>
              Aperçu LinkedIn
            </Typography>

            {/* LinkedIn Post Card Mockup */}
            <Card className='border border-slate-200 shadow-sm max-w-lg mx-auto'>
              <CardContent className='p-4'>
                {/* Header */}
                <Box className='flex gap-3 mb-3'>
                  <Avatar
                    src='/images/avatars/1.png'
                    alt='User Profile'
                    sx={{ width: 48, height: 48 }}
                  />
                  <Box>
                    <Typography variant='subtitle1' className='font-semibold leading-tight'>
                      Votre Nom
                    </Typography>
                    <Typography variant='body2' className='text-slate-500 text-xs'>
                      Avocat | Expert Juridique
                    </Typography>
                    <Typography variant='body2' className='text-slate-500 text-xs'>
                      2h • 🌐
                    </Typography>
                  </Box>
                </Box>

                {/* Content */}
                <Typography variant='body1' className='mb-4 whitespace-pre-wrap text-sm'>
                  {content || (
                    <span className='italic text-slate-400'>
                      Le contenu de votre post apparaîtra ici...
                    </span>
                  )}
                </Typography>

                {/* Media Placeholder */}
                {/* <Box className='bg-slate-100 h-64 w-full rounded-md flex items-center justify-center mb-4 text-slate-400'>
                    [Média / Image générée]
                </Box> */}

                <Divider className='my-3' />

                {/* Actions */}
                <Box className='flex justify-between px-2'>
                   <Box className='flex gap-1 items-center cursor-pointer hover:bg-slate-100 p-2 rounded'>
                      <IconThumbUp size={20} className='text-slate-500' />
                      <Typography variant='body2' className='text-slate-600 font-medium'>J&apos;aime</Typography>
                   </Box>
                   <Box className='flex gap-1 items-center cursor-pointer hover:bg-slate-100 p-2 rounded'>
                      <IconMessageCircle size={20} className='text-slate-500' />
                      <Typography variant='body2' className='text-slate-600 font-medium'>Commenter</Typography>
                   </Box>
                   <Box className='flex gap-1 items-center cursor-pointer hover:bg-slate-100 p-2 rounded'>
                      <IconShare size={20} className='text-slate-500' />
                      <Typography variant='body2' className='text-slate-600 font-medium'>Diffuser</Typography>
                   </Box>
                   <Box className='flex gap-1 items-center cursor-pointer hover:bg-slate-100 p-2 rounded'>
                      <IconSend size={20} className='text-slate-500' />
                      <Typography variant='body2' className='text-slate-600 font-medium'>Envoyer</Typography>
                   </Box>
                </Box>

              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default DraftEditor
