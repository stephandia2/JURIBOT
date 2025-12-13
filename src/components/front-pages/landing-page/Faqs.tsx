'use client'

import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'

import styles from './styles.module.css'

const FaqsData = [
  {
    id: 'panel1',
    question: 'JuridBot est-il compatible avec mes sources actuelles ?',
    answer: 'Oui, vous pouvez ajouter n\'importe quel flux RSS, newsletter ou site web juridique. Notre système est conçu pour parser et analyser une grande variété de formats.'
  },
  {
    id: 'panel2',
    question: 'Puis-je essayer avant d\'acheter ?',
    active: true,
    answer: 'Absolument. Nous offrons une période d\'essai gratuite de 14 jours, sans carte bancaire requise, pour vous permettre de tester toutes les fonctionnalités Pro.'
  },
  {
    id: 'panel3',
    question: 'L\'IA remplace-t-elle mon expertise ?',
    answer: 'Non, l\'IA agit comme un assistant qui prépare le terrain. Elle effectue la veille et rédige des brouillons, mais vous gardez le contrôle total sur la validation et la publication du contenu.'
  },
  {
    id: 'panel4',
    question: 'Mes données sont-elles sécurisées ?',
    answer: 'La sécurité est notre priorité. Toutes vos données sont chiffrées et hébergées sur des serveurs sécurisés en France, en conformité avec le RGPD.'
  }
]

const Faqs = () => {
  return (
    <section id='faq' className={`py-[100px] bg-white ${styles.sectionStartRadius}`}>
      <div className='flex flex-col gap-16 container mx-auto px-6'>
        <div className='flex flex-col gap-y-4 items-center justify-center'>
          <Chip size='small' variant='outlined' color='primary' label='FAQ' />
          <div className='flex flex-col items-center gap-y-1 justify-center flex-wrap'>
            <Typography color='text.primary' variant='h4' className='text-center'>
              Questions{' '}
              <span className='relative z-[1] font-extrabold'>
                <img
                  src='/images/front-pages/landing-page/bg-shape.png'
                  alt='bg-shape'
                  className='absolute bottom-0 z-[-1] h-[40%] w-[132%] -left-[8%] top-[17px]'
                />
                Fréquentes
              </span>
            </Typography>
            <Typography className='text-center text-gray-500'>
              Trouvez rapidement des réponses à vos questions.
            </Typography>
          </div>
        </div>
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
          <Grid container spacing={6} alignItems="flex-start">
            <Grid item xs={12} lg={5} className='text-center'>
              <img
                src='/images/front-pages/landing-page/boy-sitting-with-laptop.png'
                alt='boy with laptop'
                className='w-[80%] max-w-[320px] mx-auto'
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <Box>
                {FaqsData.map((data, index) => {
                  return (
                    <Accordion 
                      key={index} 
                      defaultExpanded={data.active} 
                      sx={{ 
                        mb: 2, 
                        boxShadow: 'none', 
                        '&:before': { display: 'none' }, 
                        border: '1px solid #E7E3FC', 
                        borderRadius: '8px !important',
                        overflow: 'hidden'
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<i className='tabler-chevron-down' />}
                        aria-controls={data.id + '-content'}
                        id={data.id + '-header'}
                        sx={{ 
                          fontWeight: 500,
                          '& .MuiAccordionSummary-content': {
                            overflow: 'hidden'
                          }
                        }}
                      >
                        <Typography sx={{ fontWeight: 500, wordBreak: 'break-word' }}>
                          {data.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography sx={{ color: 'text.secondary', wordBreak: 'break-word' }}>
                          {data.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  )
                })}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </section>
  )
}

export default Faqs
