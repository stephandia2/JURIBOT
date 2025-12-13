'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'

export default function ProfilePage() {
  const supabase = createClient()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: ''
  })

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        setAvatarUrl(user.user_metadata?.avatar_url || null)
        setFormData({
          fullName: user.user_metadata?.full_name || '',
          email: user.email || '',
          company: user.user_metadata?.company || '',
          phone: user.user_metadata?.phone || ''
        })
      }
      setLoading(false)
    }
    getUser()
  }, [])

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user) return

    setUploadingAvatar(true)
    setMessage(null)

    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

      if (uploadError) {
        // If bucket doesn't exist, show helpful message
        if (uploadError.message.includes('Bucket not found')) {
          setMessage({ 
            type: 'error', 
            text: 'Le bucket "avatars" n\'existe pas. Créez-le dans Supabase Storage.' 
          })
        } else {
          setMessage({ type: 'error', text: uploadError.message })
        }
        setUploadingAvatar(false)
        return
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      // Update user metadata with new avatar URL
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      })

      if (updateError) {
        setMessage({ type: 'error', text: updateError.message })
      } else {
        setAvatarUrl(publicUrl)
        setMessage({ type: 'success', text: 'Photo de profil mise à jour !' })
        // Broadcast update to other components
        window.dispatchEvent(new Event('user:updated'))
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Erreur lors de l\'upload' })
    }

    setUploadingAvatar(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: formData.fullName,
        company: formData.company,
        phone: formData.phone
      }
    })

    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' })
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <Box className="flex items-center justify-center min-h-[400px]">
        <Typography>Chargement...</Typography>
      </Box>
    )
  }

  return (
    <Box className="p-6">
      <Typography variant="h4" className="mb-6" sx={{ color: '#5D596C', fontWeight: 600 }}>
        Mon Profil
      </Typography>

      {message && (
        <Alert severity={message.type} className="mb-4" onClose={() => setMessage(null)}>
          {message.text}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
            <CardContent className="flex flex-col items-center py-8">
              {/* Avatar with upload */}
              <Box sx={{ position: 'relative', mb: 3 }}>
                <Avatar
                  src={avatarUrl || undefined}
                  sx={{ 
                    width: 120, 
                    height: 120,
                    bgcolor: '#7367F0',
                    fontSize: '2.5rem',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s',
                    '&:hover': { opacity: 0.8 }
                  }}
                  onClick={handleAvatarClick}
                >
                  {formData.fullName?.charAt(0).toUpperCase() || formData.email?.charAt(0).toUpperCase()}
                </Avatar>
                
                {/* Upload overlay */}
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: '#7367F0',
                    color: 'white',
                    width: 36,
                    height: 36,
                    '&:hover': { bgcolor: '#685DD8' }
                  }}
                  onClick={handleAvatarClick}
                  disabled={uploadingAvatar}
                >
                  {uploadingAvatar ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <i className="tabler-camera text-lg" />
                  )}
                </IconButton>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" className="mb-2 text-center">
                Cliquez pour changer la photo
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 600, color: '#5D596C' }}>
                {formData.fullName || 'Utilisateur'}
              </Typography>
              <Typography color="text.secondary" className="mb-4">
                {formData.email}
              </Typography>
              <Box 
                sx={{ 
                  px: 2, 
                  py: 0.5, 
                  borderRadius: 1, 
                  bgcolor: 'rgba(115, 103, 240, 0.12)',
                  color: '#7367F0',
                  fontWeight: 500
                }}
              >
                Plan Gratuit
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Edit Profile Form */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
            <CardContent className="p-6">
              <Typography variant="h6" className="mb-4" sx={{ color: '#5D596C', fontWeight: 600 }}>
                Informations personnelles
              </Typography>
              <Divider className="mb-6" />
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nom complet"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={formData.email}
                    disabled
                    helperText="L'email ne peut pas être modifié"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Entreprise"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Téléphone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </Grid>
              </Grid>

              <Box className="flex justify-end gap-3 mt-6">
                <Button 
                  variant="outlined" 
                  onClick={() => router.back()}
                  sx={{ borderColor: '#7367F0', color: '#7367F0' }}
                >
                  Annuler
                </Button>
                <Button 
                  variant="contained" 
                  onClick={handleSave}
                  disabled={saving}
                  sx={{ bgcolor: '#7367F0', '&:hover': { bgcolor: '#685DD8' } }}
                >
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
