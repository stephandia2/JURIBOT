'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Type Imports
import type { SelectChangeEvent } from '@mui/material/Select'

// Utils Imports
import { createClient } from '@/utils/supabase/client'
import { useLanguage } from '@/contexts/LanguageContext' // Import du contexte de langue

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
  language: string
  timezone: string
  currency: string
}

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
  language: 'french',
  timezone: 'gmt-12',
  currency: 'usd'
}

const AccountDetails = () => {
  // States
  const [formData, setFormData] = useState<Data>(initialData)
  const [fileInput, setFileInput] = useState<string>('')
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [language, setLanguage] = useState<string[]>(['English'])
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  // Context de langue
  const { currentLanguage, setLanguage: setAppLanguage, t } = useLanguage()

  // Hooks
  const supabase = createClient()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Data>({ defaultValues: initialData })

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (user) {
        // L'email vient de l'objet user directement
        setFormData(prev => ({ ...prev, email: user.email || '' }))
        setValue('email', user.email || '')


        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profile) {
            // Mise à jour de formData et des champs du formulaire
            const newFormData = {
                firstName: profile.first_name || '',
                lastName: profile.last_name || '',
                email: user.email || '', // Garder l'email de l'auth
                organization: profile.organization || '',
                phoneNumber: profile.phone_number || '',
                address: profile.address || '',
                state: profile.state || '',
                zipCode: profile.zip_code || '',
                country: profile.country || '',
                language: profile.language || 'french',
                timezone: profile.timezone || 'gmt-12',
                currency: profile.currency || 'usd'
            }
            setFormData(newFormData)
            
            // Mettre à jour React Hook Form
            Object.keys(newFormData).forEach(key => {
                setValue(key as keyof Data, newFormData[key as keyof Data])
            })
            
            // Mise à jour de la langue de l'application
            setAppLanguage(newFormData.language as 'english' | 'french')

          if (profile.avatar_url) {
            // Construit l'URL publique pour l'avatar
            const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(profile.avatar_url)
            setImgSrc(publicUrl)
          }
        }
      }
    }

    fetchProfile()
  }, [supabase, setValue, setAppLanguage])

  const handleDelete = (value: string) => {
    setLanguage(current => current.filter(item => item !== value))
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(file)
      setFileInput(event.target.value)
    }
  }

  const handleFileInputReset = () => {
    setFileInput('')
    setImgSrc('/images/avatars/1.png')
    setAvatarFile(null)
  }

  const onSubmit = async (data: Data) => {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (user) {
      let avatarPath = null

      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop()
        const fileName = `${user.id}.${fileExt}`
        const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, avatarFile, {
          upsert: true
        })

        if (!uploadError) {
          avatarPath = fileName
        }
      }

      const updates: any = {
        id: user.id,
        first_name: data.firstName,
        last_name: data.lastName,
        organization: data.organization,
        phone_number: data.phoneNumber,
        address: data.address,
        state: data.state,
        zip_code: data.zipCode,
        country: data.country,
        language: data.language,
        timezone: data.timezone,
        currency: data.currency,
        updated_at: new Date().toISOString()
      }

      if (avatarPath) {
        updates.avatar_url = avatarPath
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        console.error('Error updating profile:', error)
         alert('Erreur lors de la mise à jour du profil: ' + error.message)
      } else {
        alert('Profil mis à jour avec succès !')
        // Mettre à jour la langue immédiatement si elle a changé
        setAppLanguage(data.language as 'english' | 'french')
      }
    }
  }

  return (
    <Card>
      <CardContent className='mbe-4'>
        <div className='flex max-sm:flex-col items-center gap-6'>
          <img height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button component='label' variant='contained' htmlFor='account-settings-upload-image'>
                {t('uploadPhoto')}
                <input
                  hidden
                  type='file'
                  value={fileInput}
                  accept='image/png, image/jpeg'
                  onChange={handleFileInputChange}
                  id='account-settings-upload-image'
                />
              </Button>
              <Button color='secondary' variant='tonal' onClick={handleFileInputReset}>
                {t('reset')}
              </Button>
            </div>
            <Typography>{t('allowedFileTypes')}</Typography>
          </div>
        </div>
      </CardContent>
      <Divider />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='firstName'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField {...field} fullWidth label={t('firstName')} placeholder='John' error={Boolean(errors.firstName)} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='lastName'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField {...field} fullWidth label={t('lastName')} placeholder='Doe' error={Boolean(errors.lastName)} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField {...field} fullWidth label='Email' placeholder='john.doe@gmail.com' error={Boolean(errors.email)} disabled />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
               <Controller
                name='organization'
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label={t('organization')} placeholder='JurisBot Inc.' />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='phoneNumber'
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label={t('phoneNumber')} placeholder='+1 (234) 567-8901' />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
               <Controller
                name='address'
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label={t('address')} placeholder='123 Main St' />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
               <Controller
                name='state'
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label={t('state')} placeholder='New York' />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
               <Controller
                name='zipCode'
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label={t('zipCode')} placeholder='10001' />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>{t('country')}</InputLabel>
                <Controller
                  name='country'
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label={t('country')}>
                      <MenuItem value='usa'>USA</MenuItem>
                      <MenuItem value='uk'>UK</MenuItem>
                      <MenuItem value='australia'>Australia</MenuItem>
                      <MenuItem value='germany'>Germany</MenuItem>
                      <MenuItem value='france'>France</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>{t('language')}</InputLabel>
                <Controller
                  name='language'
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label={t('language')}>
                      <MenuItem value='english'>English</MenuItem>
                      <MenuItem value='french'>French</MenuItem>
                      <MenuItem value='spanish'>Spanish</MenuItem>
                      <MenuItem value='arabic'>Arabic</MenuItem>
                      <MenuItem value='hindi'>Hindi</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>{t('timezone')}</InputLabel>
                <Controller
                  name='timezone'
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label={t('timezone')}>
                      <MenuItem value='gmt-12'>(GMT-12:00) International Date Line West</MenuItem>
                      <MenuItem value='gmt-11'>(GMT-11:00) Midway Island, Samoa</MenuItem>
                      <MenuItem value='gmt-10'>(GMT-10:00) Hawaii</MenuItem>
                      <MenuItem value='gmt-9'>(GMT-09:00) Alaska</MenuItem>
                      <MenuItem value='gmt-8'>(GMT-08:00) Pacific Time (US & Canada)</MenuItem>
                      <MenuItem value='gmt-8-baja'>(GMT-08:00) Baja California</MenuItem>
                      <MenuItem value='gmt-7'>(GMT-07:00) Mountain Time (US & Canada)</MenuItem>
                      <MenuItem value='gmt-7-chihuahua'>(GMT-07:00) Chihuahua, La Paz, Mazatlan</MenuItem>
                      <MenuItem value='gmt-7-arizona'>(GMT-07:00) Arizona</MenuItem>
                      <MenuItem value='gmt-6'>(GMT-06:00) Central Time (US & Canada)</MenuItem>
                      <MenuItem value='gmt-6-saskatchewan'>(GMT-06:00) Saskatchewan</MenuItem>
                      <MenuItem value='gmt-6-guadalajara'>(GMT-06:00) Guadalajara, Mexico City, Monterrey</MenuItem>
                      <MenuItem value='gmt-5'>(GMT-05:00) Eastern Time (US & Canada)</MenuItem>
                      <MenuItem value='gmt-5-bogota'>(GMT-05:00) Bogota, Lima, Quito, Rio Branco</MenuItem>
                      <MenuItem value='gmt-5-indiana'>(GMT-05:00) Indiana (East)</MenuItem>
                      <MenuItem value='gmt-4'>(GMT-04:00) Atlantic Time (Canada)</MenuItem>
                      <MenuItem value='gmt-4-caracas'>(GMT-04:00) Caracas, La Paz</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>{t('currency')}</InputLabel>
                <Controller
                  name='currency'
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label={t('currency')}>
                      <MenuItem value='usd'>USD</MenuItem>
                      <MenuItem value='eur'>EUR</MenuItem>
                      <MenuItem value='pound'>Pound</MenuItem>
                      <MenuItem value='bitcoin'>Bitcoin</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} className='flex gap-4 flex-wrap'>
              <Button variant='contained' type='submit'>
                {t('saveChanges')}
              </Button>
              <Button variant='tonal' color='secondary' type='reset' onClick={() => setFormData(initialData)}>
                {t('reset')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AccountDetails
