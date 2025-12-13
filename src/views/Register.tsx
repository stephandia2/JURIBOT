'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { SystemMode } from '@core/types'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Utils Imports
import { createClient } from '@/utils/supabase/client'

// Styled Custom Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 600,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const Register = ({ mode }: { mode: SystemMode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPrivacyPolicyAccepted, setIsPrivacyPolicyAccepted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-register-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-register-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-register-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-register-light-border.png'

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!isPrivacyPolicyAccepted) {
      setError("Vous devez accepter la politique de confidentialité et les conditions d'utilisation.")
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })

      if (error) {
        setError(error.message)
      } else {
        // Optionnel : rediriger vers une page de confirmation d'email ou connexion
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError('Une erreur inattendue est survenue.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignUp = async (provider: 'google' | 'github' | 'twitter') => {
    // Implementer la logique pour sign up socialement
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    
    if (error) {
        setError(error.message)
    }
  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <RegisterIllustration src={characterIllustration} alt='character-illustration' />
        {!hidden && (
          <MaskImg
            alt='mask'
            src={authBackground}
            className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
          />
        )}
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <div className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </div>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>L'aventure commence ici 🚀</Typography>
            <Typography>Gérez efficacement votre veille juridique avec JurisBot !</Typography>
          </div>
          {error && <Alert severity='error'>{error}</Alert>}
          <form noValidate autoComplete='off' onSubmit={handleRegister} className='flex flex-col gap-5'>
            <CustomTextField
              autoFocus
              fullWidth
              label="Nom d'utilisateur"
              placeholder='johndoe'
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
            <CustomTextField
              fullWidth
              label='Email'
              placeholder='user@email.com'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <CustomTextField
              fullWidth
              label='Mot de passe'
              placeholder='············'
              type={isPasswordShown ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isPrivacyPolicyAccepted}
                  onChange={e => setIsPrivacyPolicyAccepted(e.target.checked)}
                />
              }
              label={
                <>
                  <span>J&#39;accepte la </span>
                  <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                    politique de confidentialité
                  </Link>
                  <span> & les </span>
                  <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                    conditions
                  </Link>
                </>
              }
            />
            <Button fullWidth variant='contained' type='submit' disabled={loading}>
                 {loading ? <CircularProgress size={24} color='inherit' /> : 'S\'inscrire'}
            </Button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>Vous avez déjà un compte ?</Typography>
              <Typography component={Link} href='/login' color='primary'>
                Connectez-vous au lieu de
              </Typography>
            </div>
            <Divider className='gap-2 text-textPrimary'>ou</Divider>
            <div className='flex justify-center items-center gap-1.5'>
              <IconButton className='text-facebook' size='small'>
                <i className='tabler-brand-facebook-filled' />
              </IconButton>
              <IconButton className='text-twitter' size='small' onClick={() => handleSocialSignUp('twitter')}>
                <i className='tabler-brand-twitter-filled' />
              </IconButton>
              <IconButton className='text-textPrimary' size='small' onClick={() => handleSocialSignUp('github')}>
                <i className='tabler-brand-github-filled' />
              </IconButton>
              <IconButton className='text-error' size='small' onClick={() => handleSocialSignUp('google')}>
                <i className='tabler-brand-google-filled' />
              </IconButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
