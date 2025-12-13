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

const defaultSettings: NotificationSettings = {
  notifications: {
    new_for_you: { email: true, browser: true, app: true },
    account_activity: { email: true, browser: true, app: true },
    new_browser: { email: true, browser: true, app: false },
    new_device: { email: true, browser: false, app: false }
  },
  when_to_send: 'online'
}

const NotificationsTab = () => {
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings)
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

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true)
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase.from('user_settings').select('notifications').eq('user_id', user.id).single()

        if (data?.notifications) {
          setSettings(prev => ({ ...prev, ...data.notifications }))
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
      const { error } = await supabase.from('user_settings').upsert({
        user_id: user.id,
        notifications: settings,
        updated_at: new Date().toISOString()
      })

      if (error) {
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
    <Card>
      <CardHeader title={t.notifications.recent_devices} subheader={t.notifications.permission_text} />
      <CardContent>
        {message && (
          <Alert severity={message.type} className='mb-4'>
            {message.text}
          </Alert>
        )}
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
            <Button variant='tonal' color='secondary' onClick={() => setSettings(defaultSettings)}>
              {t.common.reset}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default NotificationsTab
