'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import LinearProgress from '@mui/material/LinearProgress'
import Chip from '@mui/material/Chip'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Context Imports
import { useLanguage } from '@/contexts/LanguageContext'

const BillingPlansTab = () => {
  const { t } = useLanguage()

  return (
    <Grid container spacing={6}>
      {/* Current Plan */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader title={t.billing.title} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12, md: 6 }}>
                <div className='flex flex-col gap-4'>
                  <div>
                    <Typography className='font-medium' color='text.primary'>
                      {t.billing.plan_text_1}
                    </Typography>
                    <Typography variant='body2'>{t.billing.plan_sub_1}</Typography>
                  </div>
                  <div>
                    <Typography className='font-medium' color='text.primary'>
                      {t.billing.plan_text_2}
                    </Typography>
                    <Typography variant='body2'>{t.billing.plan_sub_2}</Typography>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Typography variant='h4'>{t.billing.price}</Typography>
                    <Chip label={t.billing.popular} color='primary' size='small' variant='tonal' />
                  </div>
                  <Typography variant='body2'>{t.billing.plan_desc}</Typography>
                  <div className='flex gap-4'>
                    <Button variant='contained'>{t.billing.btn_upgrade}</Button>
                    <Button variant='tonal' color='error'>
                      {t.billing.btn_cancel}
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Alert severity='warning' icon={<i className='tabler-alert-triangle' />}>
                  <AlertTitle>{t.billing.alert_title}</AlertTitle>
                  {t.billing.alert_text}
                </Alert>
                <div className='flex justify-between items-center mt-4 mb-2'>
                  <Typography className='font-medium'>{t.billing.days}</Typography>
                  <Typography className='font-medium'>{t.billing.days_left}</Typography>
                </div>
                <LinearProgress variant='determinate' value={40} className='rounded-full bs-2' />
                <Typography variant='body2' className='mt-2'>
                  {t.billing.days_remaining}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Payment Methods */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader title={t.billing.payment_title} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12, md: 6 }}>
                <form className='flex flex-col gap-5'>
                  <div className='flex gap-4'>
                    {/* Radio Mock */}
                    <div className='flex items-center gap-2'>
                      <input type='radio' checked readOnly className='w-4 h-4 text-primary' />
                      <label>{t.billing.card_radio}</label>
                    </div>
                  </div>
                  <CustomTextField fullWidth label={t.billing.card_number} placeholder='1356 3215 6548 7898' />
                  <div className='flex gap-4'>
                    <CustomTextField fullWidth label={t.billing.name} placeholder='Jean Dupont' />
                    <CustomTextField label={t.billing.exp_date} placeholder='MM/AA' />
                    <CustomTextField label={t.billing.cvv} placeholder='654' />
                  </div>
                  <div className='flex items-center gap-2'>
                    <input type='checkbox' id='save-card' />
                    <label htmlFor='save-card'>{t.billing.save_card}</label>
                  </div>
                  <Button variant='contained' className='w-fit'>
                    {t.common.save}
                  </Button>
                </form>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography className='mbe-4 font-medium'>{t.billing.my_cards}</Typography>
                <div className='flex flex-col gap-4'>
                  <div className='flex justify-between items-center p-4 border rounded bg-actionHover'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-6 bg-red-500 rounded flex items-center justify-center text-white text-xs'>
                        Master
                      </div>
                      <div>
                        <div className='flex items-center gap-2'>
                          <Typography className='font-medium'>Tom McBride</Typography>
                          <Chip label={t.billing.primary} size='small' color='primary' variant='tonal' />
                        </div>
                        <Typography variant='caption'>**** **** 9856</Typography>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <Button size='small' variant='tonal'>
                        {t.common.edit}
                      </Button>
                      <Button size='small' variant='tonal' color='error'>
                        {t.common.delete}
                      </Button>
                    </div>
                  </div>
                  <div className='flex justify-between items-center p-4 border rounded'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs'>
                        VISA
                      </div>
                      <div>
                        <Typography className='font-medium'>Mildred Wagner</Typography>
                        <Typography variant='caption'>**** **** 5678</Typography>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <Button size='small' variant='tonal'>
                        {t.common.edit}
                      </Button>
                      <Button size='small' variant='tonal' color='error'>
                        {t.common.delete}
                      </Button>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default BillingPlansTab
