'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

// Supabase Imports
import { createClient } from '@/utils/supabase'

// Context Imports
import { useLanguage } from '@/contexts/LanguageContext'

type ConnectedAccount = {
  id: string
  name: string
  subtitleKey: string
  logo: string
}

const connectedAccountsList: ConnectedAccount[] = [
  { id: 'google', name: 'Google', subtitleKey: 'google_sub', logo: 'tabler-brand-google' },
  { id: 'slack', name: 'Slack', subtitleKey: 'slack_sub', logo: 'tabler-brand-slack' },
  { id: 'github', name: 'Github', subtitleKey: 'github_sub', logo: 'tabler-brand-github' },
  { id: 'mailchimp', name: 'Mailchimp', subtitleKey: 'mailchimp_sub', logo: 'tabler-brand-mailchimp' },
  { id: 'asana', name: 'Asana', subtitleKey: 'asana_sub', logo: 'tabler-brand-asana' }
]

const socialAccountsList: ConnectedAccount[] = [
  { id: 'facebook', name: 'Facebook', subtitleKey: 'not_connected', logo: 'tabler-brand-facebook' },
  { id: 'twitter', name: 'Twitter', subtitleKey: 'not_connected', logo: 'tabler-brand-twitter' }, // Simplification for translations
  { id: 'instagram', name: 'Instagram', subtitleKey: 'not_connected', logo: 'tabler-brand-instagram' },
  { id: 'dribbble', name: 'Dribbble', subtitleKey: 'not_connected', logo: 'tabler-brand-dribbble' },
  { id: 'behance', name: 'Behance', subtitleKey: 'not_connected', logo: 'tabler-brand-behance' }
]

const ConnectionsTab = () => {
  const [connections, setConnections] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const supabase = createClient()
  const { t } = useLanguage()

  useEffect(() => {
    const fetchConnections = async () => {
      setLoading(true)

      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (user) {
        const { data } = await supabase.from('user_settings').select('connections').eq('user_id', user.id).single()

        if (data?.connections) {
          setConnections(data.connections)
        }
      }

      setLoading(false)
    }

    fetchConnections()
  }, [])

  const handleToggle = async (id: string, checked: boolean) => {
    // Optimistic update
    const newConnections = { ...connections, [id]: checked }

    setConnections(newConnections)

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (user) {
      const { error } = await supabase.from('user_settings').upsert({
        user_id: user.id,
        connections: newConnections,
        updated_at: new Date().toISOString()
      })

      if (error) {
        setMessage({ type: 'error', text: t.common.error })

        // Revert
        setConnections(connections)
      }
    }
  }

  const handleSocialConnect = async (id: string) => {
    // Mock connecting logic
    const isConnected = !!connections[id]

    handleToggle(id, !isConnected)
  }

  if (loading)
    return (
      <div className='p-4 flex justify-center'>
        <CircularProgress />
      </div>
    )

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        {message && (
          <Alert severity={message.type} onClose={() => setMessage(null)}>
            {message.text}
          </Alert>
        )}
      </Grid>

      {/* Connected Accounts */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardHeader title={t.connections.connected_title} subheader={t.connections.connected_sub} />
          <CardContent className='flex flex-col gap-4'>
            {connectedAccountsList.map(account => (
              <div key={account.id} className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Box className='flex items-center justify-center w-9 h-9 rounded bg-actionHover'>
                    <i className={`${account.logo} text-xl`} />
                  </Box>
                  <div>
                    <Typography className='font-medium'>{account.name}</Typography>
                    <Typography variant='caption'>
                      {t.connections[account.subtitleKey as keyof typeof t.connections]}
                    </Typography>
                  </div>
                </div>
                <Switch
                  checked={!!connections[account.id]}
                  onChange={(e, checked) => handleToggle(account.id, checked)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </Grid>

      {/* Social Accounts */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardHeader title={t.connections.social_title} subheader={t.connections.social_sub} />
          <CardContent className='flex flex-col gap-4'>
            {socialAccountsList.map(account => {
              const isConnected = !!connections[account.id]

              
return (
                <div key={account.id} className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <Box className='flex items-center justify-center w-9 h-9 rounded bg-actionHover'>
                      <i className={`${account.logo} text-xl`} />
                    </Box>
                    <div>
                      <Typography className='font-medium'>{account.name}</Typography>
                      <Typography
                        variant='caption'
                        color={isConnected ? 'primary' : 'textSecondary'}
                        component={isConnected ? 'a' : 'span'}
                        href='#'
                      >
                        {isConnected
                          ? account.id === 'twitter' || account.id === 'instagram'
                            ? '@Pixinvent'
                            : t.connections.not_connected
                          : t.connections.not_connected}
                      </Typography>
                    </div>
                  </div>
                  <Button
                    variant='tonal'
                    size='small'
                    color={isConnected ? 'error' : 'secondary'}
                    className='min-w-[40px] px-2'
                    onClick={() => handleSocialConnect(account.id)}
                  >
                    <i className={isConnected ? 'tabler-trash' : 'tabler-link'} />
                  </Button>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ConnectionsTab
