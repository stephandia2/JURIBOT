'use client'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const NeedHelp = () => {
  return (
    <section
      className='flex flex-col justify-center items-center gap-4 py-[50px] container mx-auto px-6'
    >
      <Typography variant='h4' className='text-center font-bold text-[#5D596C]'>
        Encore besoin d'aide ?
      </Typography>
      <Typography className='text-center text-gray-500 max-w-2xl'>
        Nos spécialistes sont toujours heureux de vous aider. Contactez-nous pendant les heures de bureau ou envoyez-nous un email 24/7.
      </Typography>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        <Button variant='contained' sx={{ backgroundColor: '#7367F0' }}>Visiter la communauté</Button>
        <Button variant='contained' sx={{ backgroundColor: '#7367F0' }}>Nous contacter</Button>
      </div>
    </section>
  )
}

export default NeedHelp
