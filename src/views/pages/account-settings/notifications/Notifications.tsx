'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import MenuItem from '@mui/material/MenuItem'

// Supabase Imports
import { createClient } from '@/utils/supabase'

// Context Imports
import { useLanguage } from '@/contexts/LanguageContext'

type NotificationType = 'new_for_you' | 'account_activity' | 'new_browser' | 'new_device'

type NotificationSettings = {
  notifications: {
    [key in NotificationType]: {
      email: boolean
      browser: boolean
      app: boolean
    }
  }
  when_to_send: 'online' | 'always' | 'never'
}

type VeillePreferences = {
  email_digest_enabled: boolean
  digest_time: string
}

const defaultSettings: NotificationSettings = {
  notifications: {
    new_for_you: { email: true, browser: true, app: true },
    account_activity: { email: true, browser: true, app: true },
    new_browser: { email: true, browser: true, app: false },
    new_device: { email: true, browser: false, app: false }
  },
  when_to_send: 'online'
}

const defaultVeillePrefs: VeillePreferences = {
  email_digest_enabled: true,
  digest_time: '07:00'
}

const NotificationsTab = () => {
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings)
  const [veillePrefs, setVeillePrefs] = useState<VeillePreferences>(defaultVeillePrefs)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const supabase = createClient()
  const { t } = useLanguage()

  const notificationLabels: Record<NotificationType, string> = {
    new_for_you: t.notifications.new_for_you,
    account_activity: t.notifications.account_activity,
    new_browser: t.notifications.new_browser,
    new_device: t.notifications.new_device
  }

  // Générer les options d'heures
  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0')
    return { value: `${hour}:00`, label: `${hour}:00` }
  })

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true)
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (user) {
        // Récupérer les paramètres de notifications
        const { data: settingsData } = await supabase
          .from('user_settings')
          .select('notifications')
          .eq('user_id', user.id)
          .single()

        if (settingsData?.notifications) {
          setSettings(prev => ({ ...prev, ...settingsData.notifications }))
        }

        // Récupérer les préférences de veille
        const { data: veilleData } = await supabase
          .from('user_preferences')
          .select('email_digest_enabled, digest_time')
          .eq('id', user.id)
          .single()

        if (veilleData) {
          setVeillePrefs({
            email_digest_enabled: veilleData.email_digest_enabled ?? true,
            digest_time: veilleData.digest_time?.substring(0, 5) ?? '07:00'
          })
        }
      }
      setLoading(false)
    }

    fetchSettings()
  }, [])

  const handleCheckboxChange = (type: NotificationType, channel: 'email' | 'browser' | 'app') => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: {
          ...prev.notifications[type],
          [channel]: !prev.notifications[type][channel]
        }
      }
    }))
  }

  const handleSelectChange = (value: string) => {
    setSettings(prev => ({ ...prev, when_to_send: value as any }))
  }

  const handleSave = async () => {
    setMessage(null)
    setSaving(true)
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (user) {
      // Sauvegarder les paramètres de notifications
      const { error: settingsError } = await supabase.from('user_settings').upsert({
        user_id: user.id,
        notifications: settings,
        updated_at: new Date().toISOString()
      })

      // Sauvegarder les préférences de veille
      const { error: veilleError } = await supabase.from('user_preferences').upsert({
        id: user.id,
        email_digest_enabled: veillePrefs.email_digest_enabled,
        digest_time: veillePrefs.digest_time + ':00',
        updated_at: new Date().toISOString()
      })

      if (settingsError || veilleError) {
        setMessage({ type: 'error', text: t.notifications.error_save })
      } else {
        setMessage({ type: 'success', text: t.notifications.success_save })
      }
    }
    setSaving(false)
  }

  if (loading)
    return (
      <div className='p-4 flex justify-center'>
        <CircularProgress />
      </div>
    )

  return (
    <Grid container spacing={6}>
      {/* Section Veille Juridique */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='📰 Veille Juridique'
            subheader='Configurez vos préférences de réception des emails de veille quotidienne'
          />
          <CardContent>
            {message && (
              <Alert severity={message.type} className='mb-4'>
                {message.text}
              </Alert>
            )}
            <Grid container spacing={4} alignItems='center'>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={veillePrefs.email_digest_enabled}
                      onChange={e => setVeillePrefs(prev => ({ ...prev, email_digest_enabled: e.target.checked }))}
                      color='primary'
                    />
                  }
                  label={
                    <div>
                      <Typography variant='body1' fontWeight={500}>
                        Recevoir le digest par email
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Un récapitulatif quotidien de vos articles juridiques
                      </Typography>
                    </div>
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomTextField
                  select
                  fullWidth
                  label="Heure d'envoi"
                  value={veillePrefs.digest_time}
                  onChange={e => setVeillePrefs(prev => ({ ...prev, digest_time: e.target.value }))}
                  disabled={!veillePrefs.email_digest_enabled}
                >
                  {timeOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Section Notifications classiques */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader title={t.notifications.recent_devices} subheader={t.notifications.permission_text} />
          <CardContent>
            <TableContainer className='border rounded'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t.notifications.table_type}</TableCell>
                    <TableCell align='center'>{t.notifications.table_email}</TableCell>
                    <TableCell align='center'>{t.notifications.table_browser}</TableCell>
                    <TableCell align='center'>{t.notifications.table_app}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(Object.keys(notificationLabels) as NotificationType[]).map(type => (
                    <TableRow key={type}>
                      <TableCell>{notificationLabels[type as NotificationType]}</TableCell>
                      <TableCell align='center'>
                        <Checkbox
                          checked={settings.notifications[type as NotificationType]?.email ?? false}
                          onChange={() => handleCheckboxChange(type as NotificationType, 'email')}
                        />
                      </TableCell>
                      <TableCell align='center'>
                        <Checkbox
                          checked={settings.notifications[type as NotificationType]?.browser ?? false}
                          onChange={() => handleCheckboxChange(type as NotificationType, 'browser')}
                        />
                      </TableCell>
                      <TableCell align='center'>
                        <Checkbox
                          checked={settings.notifications[type as NotificationType]?.app ?? false}
                          onChange={() => handleCheckboxChange(type as NotificationType, 'app')}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
          <CardContent>
            <Typography className='mbe-4 font-medium'>{t.notifications.send_question}</Typography>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomTextField
                  select
                  fullWidth
                  value={settings.when_to_send}
                  onChange={e => handleSelectChange(e.target.value)}
                >
                  <MenuItem value='online'>{t.notifications.opt_online}</MenuItem>
                  <MenuItem value='always'>{t.notifications.opt_always}</MenuItem>
                  <MenuItem value='never'>{t.notifications.opt_never}</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid size={{ xs: 12 }} className='flex gap-4'>
                <Button variant='contained' onClick={handleSave} disabled={saving}>
                  {saving ? t.common.saving : t.common.save}
                </Button>
                <Button
                  variant='tonal'
                  color='secondary'
                  onClick={() => {
                    setSettings(defaultSettings)
                    setVeillePrefs(defaultVeillePrefs)
                  }}
                >
                  {t.common.reset}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default NotificationsTab

