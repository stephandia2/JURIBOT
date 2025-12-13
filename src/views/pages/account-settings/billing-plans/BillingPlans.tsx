'use client'

// React Imports
import { useState } from 'react'
import type { ChangeEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'
import UpgradePlan from '@components/dialogs/upgrade-plan'
import GetPlanComponent from '@components/dialogs/upgrade-plan/GetPlanComponent'

const BillingPlans = () => {
  // States
  const [open, setOpen] = useState(false)
  const [openAddressCard, setOpenAddressCard] = useState(false)

  const handleClose = () => {
    setOpen(false)
    setOpenAddressCard(false)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Plan actuel' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-col gap-1'>
                    <Typography className='font-medium' color='text.primary'>
                      Votre plan actuel est Standard
                    </Typography>
                    <Typography>Un simple démarrage pour tout le monde</Typography>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <Typography className='font-medium' color='text.primary'>
                      Actif jusqu'au 09 Dec 2021
                    </Typography>
                    <Typography>Nous vous enverrons une notification lors de l'expiration de votre abonnement</Typography>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <Typography className='font-medium' color='text.primary'>
                      <span className='font-bold'>$199 par mois</span>
                      <span className='ml-1 text-primary bg-primaryLight px-2 py-0.5 rounded-sm text-xs'>
                        Populaire
                      </span>
                    </Typography>
                    <Typography>Plan Standard pour petites et moyennes entreprises</Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <Alert severity='warning' icon={false} className='mb-6'>
                  <AlertTitle className='font-medium text-warning'>Mise en garde</AlertTitle>
                  <Typography className='text-warning'>Nous avons besoin de votre attention ! Votre plan nécessite une mise à jour</Typography>
                </Alert>
                <div className='flex flex-col gap-2 mb-6'>
                  <div className='flex justify-between font-medium text-textPrimary'>
                    <Typography color='inherit'>Jours</Typography>
                    <Typography color='inherit'>24 sur 30 jours</Typography>
                  </div>
                  <LinearProgress variant='determinate' value={75} className='bs-2 rounded-sm' />
                  <Typography variant='caption'>6 jours restants jusqu'à ce que votre plan nécessite une mise à jour</Typography>
                </div>
                <div className='flex gap-4 flex-wrap'>
                  <OpenDialogOnElementClick
                    element={Button}
                    elementProps={{ variant: 'contained', children: 'Mettre à niveau le plan' }}
                    dialog={UpgradePlan}
                    dialogProps={{ data: [] }} // Need to pass plans data here
                  />
                  <Button variant='tonal' color='error' onClick={() => setOpen(true)}>
                    Annuler l'abonnement
                  </Button>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Méthodes de paiement' action={<Button variant='contained' startIcon={<i className='tabler-plus' />} onClick={() => setOpenAddressCard(true)}>Ajouter une carte</Button>} />
          <CardContent>
            <form className='flex flex-col gap-4'>
               {/* Placeholders for payment methods */}
               <div className='flex flex-col gap-4 border rounded p-4'>
                   <div className='flex justify-between items-center'>
                       <div className='flex items-center gap-4'>
                           <img src='/images/logos/mastercard.png' alt='mastercard' height={30} />
                           <div className='flex flex-col'>
                               <Typography className='font-medium' color='text.primary'>Tom McBride</Typography>
                               <Typography variant='body2'>**** **** **** 9856</Typography>
                           </div>
                       </div>
                       <div className='flex gap-2'>
                           <Button variant='tonal' size='small'>Modifier</Button>
                           <IconButton color='secondary'><i className='tabler-trash' /></IconButton>
                       </div>
                   </div>
               </div>
                <div className='flex flex-col gap-4 border rounded p-4'>
                   <div className='flex justify-between items-center'>
                       <div className='flex items-center gap-4'>
                           <img src='/images/logos/visa.png' alt='visa' height={30} />
                           <div className='flex flex-col'>
                               <Typography className='font-medium' color='text.primary'>Mildred Wagner</Typography>
                               <Typography variant='body2'>**** **** **** 5896</Typography>
                           </div>
                       </div>
                       <div className='flex gap-2'>
                           <Button variant='tonal' size='small'>Modifier</Button>
                           <IconButton color='secondary'><i className='tabler-trash' /></IconButton>
                       </div>
                   </div>
               </div>
            </form>
          </CardContent>
        </Card>
      </Grid>
      
      {/* Dialogs would be more complex implementations */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant='h5' className='mb-4'>Confirmer l'annulation</Typography>
          <Typography>Êtes-vous sûr de vouloir annuler votre abonnement ? Cette action est irréversible.</Typography>
        </DialogContent>
        <DialogActions className='justify-center pb-6 px-6'>
          <Button variant='contained' color='error' onClick={handleClose}>Oui, annuler</Button>
          <Button variant='tonal' color='secondary' onClick={handleClose}>Non, garder</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default BillingPlans
