'use client'

import { useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

const faqCategories = [
  {
    title: 'Premiers pas',
    icon: 'tabler-rocket',
    color: '#7367F0',
    questions: [
      {
        question: 'Comment ajouter une source de veille ?',
        answer: 'Allez dans "Sources" dans le menu de gauche, cliquez sur "Ajouter une source" et entrez l\'URL du site juridique que vous souhaitez surveiller. JurisBot analysera automatiquement le contenu.'
      },
      {
        question: 'Comment fonctionne la génération de posts LinkedIn ?',
        answer: 'Une fois qu\'un article est détecté, JurisBot l\'analyse avec l\'IA et génère automatiquement un post LinkedIn professionnel. Vous pouvez le modifier avant de le publier.'
      },
      {
        question: 'Puis-je modifier les posts générés ?',
        answer: 'Oui ! Chaque post peut être édité avant publication. Vous avez un contrôle total sur le contenu final.'
      }
    ]
  },
  {
    title: 'Compte & Facturation',
    icon: 'tabler-credit-card',
    color: '#28C76F',
    questions: [
      {
        question: 'Comment changer de plan ?',
        answer: 'Accédez à la page Tarifs depuis votre menu utilisateur et sélectionnez le plan souhaité. La mise à niveau est immédiate.'
      },
      {
        question: 'Comment annuler mon abonnement ?',
        answer: 'Vous pouvez annuler à tout moment depuis les Paramètres. Votre accès continue jusqu\'à la fin de la période payée.'
      },
      {
        question: 'Quels moyens de paiement acceptez-vous ?',
        answer: 'Nous acceptons les cartes Visa, Mastercard, et les prélèvements SEPA pour les paiements annuels.'
      }
    ]
  },
  {
    title: 'Fonctionnalités',
    icon: 'tabler-settings',
    color: '#FF9F43',
    questions: [
      {
        question: 'Combien de sources puis-je ajouter ?',
        answer: 'Le plan gratuit inclut 3 sources. Le plan Pro offre des sources illimitées.'
      },
      {
        question: 'La publication LinkedIn est-elle automatique ?',
        answer: 'Le plan Pro permet la publication automatique. Vous pouvez aussi choisir de valider manuellement chaque post.'
      },
      {
        question: 'Puis-je programmer la publication des posts ?',
        answer: 'Oui, avec le plan Pro vous pouvez programmer vos posts à l\'heure souhaitée.'
      }
    ]
  },
  {
    title: 'Support & Aide',
    icon: 'tabler-help-circle',
    color: '#EA5455',
    questions: [
      {
        question: 'Comment contacter le support ?',
        answer: 'Vous pouvez nous contacter via l\'email support@jurisbot.fr ou depuis la page Contact.'
      },
      {
        question: 'Quel est le délai de réponse du support ?',
        answer: 'Nous répondons sous 24h pour le plan Gratuit, et sous 4h pour les plans Pro et Entreprise.'
      }
    ]
  }
]

export default function DashboardFaqPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <Box className="p-6">
      <Box className="text-center mb-8">
        <Typography variant="h4" sx={{ color: '#5D596C', fontWeight: 600, mb: 1 }}>
          Foire Aux Questions
        </Typography>
        <Typography color="text.secondary" className="mb-4">
          Trouvez rapidement les réponses à vos questions
        </Typography>
        
        {/* Search */}
        <Box className="max-w-md mx-auto">
          <TextField
            fullWidth
            placeholder="Rechercher une question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <i className="tabler-search" style={{ color: '#7367F0' }} />
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': { borderColor: '#7367F0' },
                '&.Mui-focused fieldset': { borderColor: '#7367F0' }
              }
            }}
          />
        </Box>
      </Box>

      <Grid container spacing={4}>
        {filteredCategories.map((category) => (
          <Grid item xs={12} md={6} key={category.title}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.08)', height: '100%' }}>
              <CardContent className="p-6">
                <Box className="flex items-center gap-3 mb-4">
                  <Box 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    sx={{ bgcolor: `${category.color}20` }}
                  >
                    <i className={`${category.icon} text-xl`} style={{ color: category.color }} />
                  </Box>
                  <Typography variant="h6" sx={{ color: '#5D596C', fontWeight: 600 }}>
                    {category.title}
                  </Typography>
                </Box>

                {category.questions.map((faq, index) => (
                  <Accordion 
                    key={index}
                    expanded={expanded === `${category.title}-${index}`}
                    onChange={handleChange(`${category.title}-${index}`)}
                    sx={{ 
                      boxShadow: 'none',
                      '&:before': { display: 'none' },
                      borderBottom: index < category.questions.length - 1 ? '1px solid #eee' : 'none'
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<i className="tabler-chevron-down" />}
                      sx={{ px: 0 }}
                    >
                      <Typography sx={{ fontWeight: 500, color: '#5D596C' }}>
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 0, pt: 0 }}>
                      <Typography 
                        color="text.secondary" 
                        sx={{ 
                          lineHeight: 1.7,
                          wordBreak: 'break-word'
                        }}
                      >
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Contact Support */}
      <Card sx={{ mt: 6, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
        <CardContent className="p-6">
          <Box className="flex items-center justify-between flex-wrap gap-4">
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#5D596C' }}>
                Vous ne trouvez pas la réponse ?
              </Typography>
              <Typography color="text.secondary">
                Notre équipe est disponible pour vous aider
              </Typography>
            </Box>
            <Button 
              variant="contained"
              startIcon={<i className="tabler-mail" />}
              sx={{ bgcolor: '#7367F0', '&:hover': { bgcolor: '#685DD8' } }}
            >
              Contacter le support
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
