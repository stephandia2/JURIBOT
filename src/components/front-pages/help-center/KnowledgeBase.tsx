'use client'

import Link from 'next/link'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

const allArticles = [
  {
    title: 'Démarrage',
    icon: 'tabler-rocket',
    articles: [
      { title: 'Comment créer un compte ?' },
      { title: 'Configurer mes sources' },
      { title: 'Lier mon compte LinkedIn' },
    ]
  },
  {
    title: 'Fonctionnalités IA',
    icon: 'tabler-brain',
    articles: [
      { title: 'Comment fonctionne l\'analyse ?' },
      { title: 'Personnaliser le ton des posts' },
      { title: 'Gérer les limites de génération' },
    ]
  },
  {
    title: 'Facturation',
    icon: 'tabler-credit-card',
    articles: [
      { title: 'Changer de plan' },
      { title: 'Moyens de paiement acceptés' },
      { title: 'Obtenir une facture' },
    ]
  },
  {
    title: 'Compte & Sécurité',
    icon: 'tabler-lock',
    articles: [
      { title: 'Réinitialiser mon mot de passe' },
      { title: 'Supprimer mon compte' },
      { title: 'Politique de confidentialité' },
    ]
  },
  {
    title: 'Support',
    icon: 'tabler-lifebuoy',
    articles: [
      { title: 'Contacter le support' },
      { title: 'Signaler un bug' },
      { title: 'Proposer une fonctionnalité' },
    ]
  }
]

const KnowledgeBase = () => {
  return (
    <section className='flex flex-col gap-6 py-[50px] container mx-auto px-6'>
      <Typography variant='h4' className='text-center font-bold text-[#5D596C]'>
        Base de Connaissances
      </Typography>
      <Grid container spacing={4}>
        {allArticles.map((article, index) => {
          return (
            <Grid item xs={12} lg={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent className='flex flex-col items-start gap-6'>
                  <div className='flex gap-3 items-center'>
                    <Box className='w-8 h-8 rounded-lg bg-[#7367F0]/10 flex items-center justify-center text-[#7367F0]'>
                      <i className={`${article.icon} text-xl`} />
                    </Box>
                    <Typography variant='h6' className="text-[#5D596C] font-bold">{article.title}</Typography>
                  </div>
                  <div className='flex flex-col gap-2 w-full'>
                    {article.articles.map((data, index) => {
                      return (
                        <div key={index} className='flex justify-between items-center gap-2 group cursor-pointer'>
                          <Typography
                            className='truncate text-gray-500 group-hover:text-[#7367F0] transition-colors'
                          >
                            {data.title}
                          </Typography>
                          <i className='tabler-chevron-right text-gray-300 text-lg' />
                        </div>
                      )
                    })}
                  </div>
                  <Link
                    href='#'
                    className='flex items-center gap-x-2 text-[#7367F0] mt-auto'
                  >
                    <span className='font-medium'>Voir tous les articles</span>
                    <i className='tabler-arrow-right text-lg' />
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </section>
  )
}

export default KnowledgeBase
