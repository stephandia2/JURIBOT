'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// Icons
import { IconCreditCard, IconCheck, IconRocket, IconCrown, IconReceipt } from '@tabler/icons-react'

const BillingView = () => {
  return (
    <Grid container spacing={6}>
      {/* Header */}
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Facturation et Abonnement'
            subheader='Gerez votre plan et vos moyens de paiement'
            avatar={<IconCreditCard size={24} />}
          />
        </Card>
      </Grid>

      {/* Current Plan */}
      <Grid item xs={12} md={6}>
        <Card className='h-full'>
          <CardHeader title='Plan Actuel' />
          <CardContent>
            <Box className='bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-4'>
              <Box className='flex items-center gap-2 mb-2'>
                <IconRocket size={24} />
                <Typography variant='h5' className='font-bold'>
                  Pro
                </Typography>
                <Chip label='Actif' size='small' className='bg-white/20 text-white ml-auto' />
              </Box>
              <Typography variant='h4' className='font-bold'>
                29 Euro<span className='text-lg font-normal'>/mois</span>
              </Typography>
              <Typography variant='body2' className='opacity-80 mt-1'>
                Renouvellement le 15 janvier 2025
              </Typography>
            </Box>

            <List dense>
              {[
                'Veille juridique illimitee',
                '50 posts IA par mois',
                'Carrousels PDF',
                'Statistiques avancees',
                'Support prioritaire'
              ].map((feature, index) => (
                <ListItem key={index} disablePadding className='py-1'>
                  <ListItemIcon className='min-w-[32px]'>
                    <IconCheck size={18} className='text-green-500' />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>

            <Box className='flex gap-2 mt-4'>
              <Button variant='outlined' color='primary'>
                Changer de plan
              </Button>
              <Button variant='text' color='error'>
                Annuler
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Payment Method */}
      <Grid item xs={12} md={6}>
        <Card className='h-full'>
          <CardHeader title='Moyen de Paiement' />
          <CardContent>
            <Box className='border border-gray-200 rounded-lg p-4 mb-4'>
              <Box className='flex items-center gap-3'>
                <Box className='bg-blue-100 p-2 rounded'>
                  <IconCreditCard size={24} className='text-blue-600' />
                </Box>
                <Box className='flex-grow'>
                  <Typography variant='body1' className='font-medium'>
                    **** **** **** 4242
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Expire 12/2026
                  </Typography>
                </Box>
                <Chip label='Par defaut' size='small' color='primary' variant='outlined' />
              </Box>
            </Box>

            <Button variant='outlined' fullWidth startIcon={<IconCreditCard size={18} />}>
              Ajouter un moyen de paiement
            </Button>
          </CardContent>
        </Card>

        {/* Invoices */}
        <Card className='mt-6'>
          <CardHeader title='Historique des factures' avatar={<IconReceipt size={20} />} />
          <CardContent>
            <List dense>
              {[
                { date: 'Dec 2024', amount: '29 Euro', status: 'Payee' },
                { date: 'Nov 2024', amount: '29 Euro', status: 'Payee' },
                { date: 'Oct 2024', amount: '29 Euro', status: 'Payee' }
              ].map((invoice, index) => (
                <Box key={index}>
                  <ListItem disablePadding className='py-2'>
                    <ListItemText primary={invoice.date} secondary={invoice.amount} />
                    <Chip label={invoice.status} size='small' color='success' variant='outlined' />
                  </ListItem>
                  {index < 2 && <Divider />}
                </Box>
              ))}
            </List>
            <Button variant='text' fullWidth className='mt-2'>
              Voir toutes les factures
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Upgrade Banner */}
      <Grid item xs={12}>
        <Card className='bg-gradient-to-r from-amber-400 to-orange-500'>
          <CardContent>
            <Box className='flex items-center justify-between flex-wrap gap-4'>
              <Box className='flex items-center gap-3'>
                <IconCrown size={32} className='text-white' />
                <Box>
                  <Typography variant='h6' className='text-white font-bold'>
                    Passez a Enterprise
                  </Typography>
                  <Typography variant='body2' className='text-white/80'>
                    API illimitee, SSO, et support dedie
                  </Typography>
                </Box>
              </Box>
              <Button variant='contained' className='bg-white text-orange-600 hover:bg-gray-100'>
                Contacter les ventes
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default BillingView
