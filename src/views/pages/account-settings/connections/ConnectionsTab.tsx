'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'

// Utils Imports
import { createClient } from '@/utils/supabase/client'

type Connection = {
    provider: string
    isConnected: boolean
    icon: string
    title: string
    description: string
}

const initialConnections: Connection[] = [
    {
        provider: 'google',
        isConnected: false,
        icon: 'tabler-brand-google',
        title: 'Google',
        description: 'Calendrier et contacts'
    },
    {
        provider: 'slack',
        isConnected: false,
        icon: 'tabler-brand-slack',
        title: 'Slack',
        description: 'Communication'
    },
    {
        provider: 'github',
        isConnected: false,
        icon: 'tabler-brand-github',
        title: 'GitHub',
        description: 'Gérer vos dépôts git'
    },
    {
        provider: 'mailchimp',
        isConnected: true,
        icon: 'tabler-brand-mailchimp',
        title: 'Mailchimp',
        description: 'Service de marketing par courriel'
    }
]

const initialSocialAccounts = [
    {
        name: 'Facebook',
        isConnected: false,
        icon: 'tabler-brand-facebook',
        url: 'https://facebook.com/jurisbot'
    },
    {
        name: 'Twitter',
        isConnected: true,
        icon: 'tabler-brand-twitter',
        url: 'https://twitter.com/jurisbot'
    },
    {
        name: 'Instagram',
        isConnected: true,
        icon: 'tabler-brand-instagram',
        url: 'https://instagram.com/jurisbot'
    }
]

const ConnectionsTab = () => {
    // States
    const [connectedAccounts, setConnectedAccounts] = useState(initialConnections)
    const [socialAccounts, setSocialAccounts] = useState(initialSocialAccounts)

    // Supabase (placeholder for future implementation)
    const supabase = createClient()

    const handleConnectionToggle = (provider: string) => {
        setConnectedAccounts(prev => prev.map(account => 
            account.provider === provider ? { ...account, isConnected: !account.isConnected } : account
        ))
        // TODO: Update in Supabase
    }

    const handleSocialToggle = (name: string) => {
        setSocialAccounts(prev => prev.map(account =>
            account.name === name ? { ...account, isConnected: !account.isConnected } : account
        ))
         // TODO: Update in Supabase
    }
    
    // TODO: remove link logic not implemented

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title='Comptes connectés' subheader='Affichez le contenu de vos comptes tiers' />
          <CardContent className='flex flex-col gap-4'>
            {connectedAccounts.map((account, index) => (
                <div key={index} className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <i className={`${account.icon} text-3xl`} />
                        <div>
                            <Typography className='font-medium' color='text.primary'>{account.title}</Typography>
                            <Typography variant='body2'>{account.description}</Typography>
                        </div>
                    </div>
                    <Switch checked={account.isConnected} onChange={() => handleConnectionToggle(account.provider)} />
                </div>
            ))}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title='Comptes sociaux' subheader='Affichez le contenu de vos comptes sociaux' />
          <CardContent className='flex flex-col gap-4'>
              {socialAccounts.map((account, index) => (
                   <div key={index} className='flex items-center justify-between'>
                       <div className='flex items-center gap-3'>
                            <div className='flex justify-center items-center bg-actionHover rounded w-[38px] h-[38px]'>
                               <i className={`${account.icon} text-xl`} />
                            </div>
                           <div>
                               <Typography className='font-medium' color='text.primary'>{account.name}</Typography>
                               {account.isConnected ? (
                                   <a href={account.url} target='_blank' rel='noopener noreferrer' className='text-sm text-primary'>
                                       @jurisbot
                                   </a>
                               ) : (
                                   <Typography variant='body2'>Non connecté</Typography>
                               )}
                           </div>
                       </div>
                       <Button variant='tonal' color={account.isConnected ? 'error' : 'secondary'} size='small' onClick={() => handleSocialToggle(account.name)}>
                           <i className={`tabler-${account.isConnected ? 'trash' : 'link'} mr-2`} />
                           {account.isConnected ? 'Déconnecter' : 'Connecter'}
                       </Button>
                   </div>
              ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ConnectionsTab
