'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Supabase Imports
import { createClient } from '@/utils/supabase'

// Context Imports
import { useLanguage } from '@/contexts/LanguageContext'

const SecurityTab = () => {
  // States
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const supabase = createClient()
  const { t } = useLanguage()

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: t.security.error_match })

      return
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: t.security.error_length })

      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })

      if (error) throw error

      setMessage({ type: 'success', text: t.security.success_update })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || t.common.error })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader title={t.security.change_password} />
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
                    label={t.security.current_password}
                    type={showPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={e => e.preventDefault()}
                            >
                              <i className={showPassword ? 'tabler-eye-off' : 'tabler-eye'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={6} className='mbe-4 mt-6'>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomTextField
                    fullWidth
                    label={t.security.new_password}
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    helperText={t.security.password_helper}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={e => e.preventDefault()}
                            >
                              <i className={showPassword ? 'tabler-eye-off' : 'tabler-eye'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomTextField
                    fullWidth
                    label={t.security.confirm_password}
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={e => e.preventDefault()}
                            >
                              <i className={showPassword ? 'tabler-eye-off' : 'tabler-eye'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography className='mbe-2 font-medium'>{t.security.requirements_title}</Typography>
                  <ul className='pl-4 list-disc space-y-1 text-textSecondary'>
                    <li>{t.security.req_1}</li>
                    <li>{t.security.req_2}</li>
                    <li>{t.security.req_3}</li>
                  </ul>
                </Grid>
                <Grid size={{ xs: 12 }} className='flex gap-4'>
                  <Button variant='contained' type='submit' disabled={loading}>
                    {t.common.save}
                  </Button>
                  <Button
                    variant='tonal'
                    color='secondary'
                    onClick={() => {
                      setCurrentPassword('')
                      setNewPassword('')
                      setConfirmPassword('')
                    }}
                  >
                    {t.common.reset}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader title={t.security.two_factor_title} />
          <CardContent>
            <Typography className='mbe-4 font-medium'>{t.security.two_factor_text}</Typography>
            <Typography className='mbe-6'>{t.security.two_factor_sub}</Typography>
            <Button variant='contained' onClick={() => setMessage({ type: 'success', text: t.security.feature_soon })}>
              {t.security.two_factor_btn}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SecurityTab
