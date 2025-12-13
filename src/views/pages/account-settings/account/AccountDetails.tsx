'use client'

// React Imports
import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Supabase Imports
import { createClient } from '@/utils/supabase'
import type { User } from '@supabase/supabase-js'

// Context Imports
import { useLanguage } from '@/contexts/LanguageContext'

type Data = {
  firstName: string
  lastName: string
  email: string
  organization: string
  phoneNumber: string
  address: string
  state: string
  zipCode: string
  country: string
  language: string // Changed to single string
  timezone: string
  currency: string
}

// Vars
const initialData: Data = {
  firstName: '',
  lastName: '',
  email: '',
  organization: '',
  phoneNumber: '',
  address: '',
  state: '',
  zipCode: '',
  country: '',
  language: 'Français', // Default single value
  timezone: '',
  currency: 'eur'
}

// Only French and English as requested
const languageData = ['Français', 'Anglais']

const AccountDetails = () => {
  // States
  const [formData, setFormData] = useState<Data>(initialData)
  const [fileInput, setFileInput] = useState<string>('')
  const [imgSrc, setImgSrc] = useState<string>('')
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const supabase = createClient()
  const { t } = useLanguage()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (user) {
        setUser(user)

        // Setup initial avatar
        setImgSrc(user.user_metadata?.avatar_url || '/images/avatars/1.png')

        // Fetch profile data
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

        let firstName = ''
        let lastName = ''

        // Initialize from user metadata if available
        if (user.user_metadata?.full_name) {
          const names = user.user_metadata.full_name.split(' ')
          firstName = names[0] || ''
          lastName = names.slice(1).join(' ') || ''
        }

        const newFormData: Data = {
          firstName,
          lastName,
          email: user.email || '',
          organization: user.user_metadata?.company || '',
          phoneNumber: user.user_metadata?.phone || '',
          address: '',
          state: '',
          zipCode: '',
          country: '',
          language: 'Français',
          timezone: '',
          currency: 'eur'
        }

        if (profile) {
          if (profile.full_name) {
            const names = profile.full_name.split(' ')
            firstName = names[0] || ''
            lastName = names.slice(1).join(' ') || ''
          }

          newFormData.firstName = firstName
          newFormData.lastName = lastName
          newFormData.organization = profile.organization || newFormData.organization
          newFormData.phoneNumber = profile.phone || newFormData.phoneNumber
          newFormData.address = profile.address || ''
          newFormData.state = profile.state || ''
          newFormData.zipCode = profile.zip_code || ''
          newFormData.country = profile.country || ''
          // Handle existing language or default
          newFormData.language = profile.language || 'Français'
          newFormData.timezone = profile.timezone || ''
          newFormData.currency = profile.currency || 'eur'
        }

        setFormData(newFormData)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleFormChange = (field: keyof Data, value: Data[keyof Data]) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleFileInputChange = async (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement

    if (files && files.length !== 0 && user) {
      const selectedFile = files[0]
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(selectedFile)

      // Upload to Supabase
      setUploading(true)
      try {
        const fileExt = selectedFile.name.split('.').pop()
        const fileName = `${user.id}-${Date.now()}.${fileExt}`
        const filePath = `avatars/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, selectedFile, { upsert: true })

        if (uploadError) throw uploadError

        const {
          data: { publicUrl }
        } = supabase.storage.from('avatars').getPublicUrl(filePath)

        // Update auth metadata
        const { error: updateError } = await supabase.auth.updateUser({
          data: { avatar_url: publicUrl }
        })

        if (updateError) throw updateError

        // Also update profiles table
        await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', user.id)

        // Dispatch event for header sync
        window.dispatchEvent(new Event('user:updated'))

        setMessage({ type: 'success', text: t.account.upload_success })
      } catch (error: any) {
        console.error(error)
        setMessage({ type: 'error', text: t.account.upload_error })
      } finally {
        setUploading(false)
      }
    }
  }

  const handleFileInputReset = async () => {
    setFileInput('')
    setImgSrc('/images/avatars/1.png')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setMessage(null)
    setLoading(true)

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim()

      // 1. Update Profile Table
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: user.id,
        full_name: fullName,
        organization: formData.organization,
        phone: formData.phoneNumber,
        address: formData.address,
        state: formData.state,
        zip_code: formData.zipCode,
        country: formData.country,
        language: formData.language, // No longer an array
        timezone: formData.timezone,
        currency: formData.currency,
        updated_at: new Date().toISOString()
      })

      if (profileError) throw profileError

      // 2. Update Auth Metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          company: formData.organization,
          phone: formData.phoneNumber
        }
      })

      if (authError) throw authError

      // Dispatch event for header sync
      window.dispatchEvent(new Event('user:updated'))

      setMessage({ type: 'success', text: t.account.success_update })
    } catch (error: any) {
      setMessage({ type: 'error', text: t.account.error_update })
    } finally {
      setLoading(false)
    }
  }

  if (loading && !user) {
    return (
      <div className='p-4 flex justify-center'>
        <CircularProgress />
      </div>
    )
  }

  return (
    <Card>
      <CardContent className='mbe-4'>
        <div className='flex max-sm:flex-col items-center gap-6'>
          <img height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button
                component='label'
                variant='contained'
                htmlFor='account-settings-upload-image'
                disabled={uploading}
              >
                {uploading ? t.common.loading : t.account.change_photo}
                <input
                  hidden
                  type='file'
                  value={fileInput}
                  accept='image/png, image/jpeg'
                  onChange={handleFileInputChange}
                  id='account-settings-upload-image'
                />
              </Button>
              <Button variant='tonal' color='secondary' onClick={handleFileInputReset}>
                {t.account.reset_photo}
              </Button>
            </div>
            <Typography>{t.account.upload_text}</Typography>
          </div>
        </div>
      </CardContent>
      <Divider />
      <CardContent>
        <form onSubmit={handleSubmit}>
          {message && (
            <Alert severity={message.type} sx={{ mb: 4 }}>
              {message.text}
            </Alert>
          )}
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label={t.account.first_name}
                value={formData.firstName}
                placeholder='Jean'
                onChange={e => handleFormChange('firstName', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label={t.account.last_name}
                value={formData.lastName}
                placeholder='Dupont'
                onChange={e => handleFormChange('lastName', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label={t.account.email}
                value={formData.email}
                placeholder='jean.dupont@email.com'
                disabled
                helperText={t.account.email_helper}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label={t.account.organization}
                value={formData.organization}
                placeholder='Ma Société'
                onChange={e => handleFormChange('organization', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label={t.account.phone}
                value={formData.phoneNumber}
                placeholder='+33 6 12 34 56 78'
                onChange={e => handleFormChange('phoneNumber', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label={t.account.address}
                value={formData.address}
                placeholder='123 Rue de la Paix'
                onChange={e => handleFormChange('address', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label={t.account.ville}
                value={formData.state}
                placeholder='Paris'
                onChange={e => handleFormChange('state', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                type='text'
                label={t.account.zip}
                value={formData.zipCode}
                placeholder='75000'
                onChange={e => handleFormChange('zipCode', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                select
                fullWidth
                label={t.account.country}
                value={formData.country}
                onChange={e => handleFormChange('country', e.target.value)}
              >
                <MenuItem value='france'>France</MenuItem>
                <MenuItem value='usa'>États-Unis</MenuItem>
                <MenuItem value='uk'>Royaume-Uni</MenuItem>
                <MenuItem value='germany'>Allemagne</MenuItem>
                <MenuItem value='australia'>Australie</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {/* Single Select Language */}
              <CustomTextField
                select
                fullWidth
                label={t.account.language}
                value={formData.language}
                onChange={e => handleFormChange('language', e.target.value)}
              >
                {languageData.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                select
                fullWidth
                label={t.account.timezone}
                value={formData.timezone}
                onChange={e => handleFormChange('timezone', e.target.value)}
                slotProps={{
                  select: { MenuProps: { PaperProps: { style: { maxHeight: 250 } } } }
                }}
              >
                <MenuItem value='gmt-12'>(GMT-12:00) International Date Line West</MenuItem>
                <MenuItem value='gmt-01'>(GMT+01:00) Paris, Bruxelles, Copenhague, Madrid</MenuItem>
                <MenuItem value='gmt-00'>(GMT+00:00) Londres, Dublin, Édimbourg</MenuItem>
                <MenuItem value='gmt-05'>(GMT-05:00) Heure de l'Est (US & Canada)</MenuItem>
                <MenuItem value='gmt-08'>(GMT-08:00) Heure du Pacifique (US & Canada)</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                select
                fullWidth
                label={t.account.currency}
                value={formData.currency}
                onChange={e => handleFormChange('currency', e.target.value)}
              >
                <MenuItem value='eur'>EUR (€)</MenuItem>
                <MenuItem value='usd'>USD ($)</MenuItem>
                <MenuItem value='gbp'>GBP (£)</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid size={{ xs: 12 }} className='flex gap-4 flex-wrap'>
              <Button variant='contained' type='submit' disabled={loading}>
                {loading ? t.common.saving : t.common.save}
              </Button>
              <Button variant='tonal' type='reset' color='secondary' onClick={() => setFormData(initialData)}>
                {t.common.reset}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AccountDetails
