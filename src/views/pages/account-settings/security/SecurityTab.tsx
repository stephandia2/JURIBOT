'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Utils Imports
import { createClient } from '@/utils/supabase/client'

const SecurityTab = () => {
  // States
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isCurrentPasswordShown, setIsCurrentPasswordShown] = useState(false)
  const [isNewPasswordShown, setIsNewPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const supabase = createClient()

  const handleChangePassword = async (e: React.FormEvent) => {
      e.preventDefault()
      setError(null)
      setSuccess(null)

      if (newPassword !== confirmPassword) {
          setError('Les nouveaux mots de passe ne correspondent pas.')
          return
      }

      const { error } = await supabase.auth.updateUser({
          password: newPassword
      })

      if (error) {
          setError(error.message)
      } else {
          setSuccess('Mot de passe mis à jour avec succès !')
          setCurrentPassword('')
          setNewPassword('')
          setConfirmPassword('')
      }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Changer le mot de passe' />
          <CardContent>
            <form onSubmit={handleChangePassword}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Mot de passe actuel'
                    placeholder='············'
                    type={isCurrentPasswordShown ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={() => setIsCurrentPasswordShown(!isCurrentPasswordShown)}
                            onMouseDown={e => e.preventDefault()}
                          >
                            <i className={isCurrentPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} />
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Nouveau mot de passe'
                    placeholder='············'
                    type={isNewPasswordShown ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    helperText='Minimum 8 caractères, majuscule & symbole'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={() => setIsNewPasswordShown(!isNewPasswordShown)}
                            onMouseDown={e => e.preventDefault()}
                          >
                            <i className={isNewPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Confirmer le nouveau mot de passe'
                    placeholder='············'
                    type={isConfirmPasswordShown ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
                            onMouseDown={e => e.preventDefault()}
                          >
                            <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                {error && <Grid item xs={12}><p className='text-error'>{error}</p></Grid>}
                {success && <Grid item xs={12}><p className='text-success'>{success}</p></Grid>}
                <Grid item xs={12}>
                  <div className='flex gap-4'>
                    <Button variant='contained' type='submit'>
                      Changer le mot de passe
                    </Button>
                    <Button variant='tonal' color='secondary' type='reset' onClick={() => {
                         setCurrentPassword('')
                         setNewPassword('')
                         setConfirmPassword('')
                    }}>
                      Réinitialiser
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Authentification à deux facteurs' subheader='Ajoutez une sécurité supplémentaire à votre compte' />
          <CardContent>
            <Typography className='font-medium' color='text.primary'>
              L'authentification à deux facteurs n'est pas activée.
            </Typography>
            <Typography className='mb-6'>
              L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire à votre compte en vous demandant plus qu'un simple mot de passe pour vous connecter.
            </Typography>
            <Button variant='contained' onClick={() => alert('Fonctionnalité en cours de développement')}>
               Activer l'authentification à deux facteurs (Bientôt)
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SecurityTab
