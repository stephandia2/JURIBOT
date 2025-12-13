'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'

import FrontHeader from '@/components/front-pages/FrontHeader'
import FrontFooter from '@/components/front-pages/FrontFooter'

const faqCategories = [
  {
    title: 'Général',
    faqs: [
      { question: 'JuridBot est-il compatible avec mes sources actuelles ?', answer: 'Oui, vous pouvez ajouter n\'importe quel flux RSS, newsletter ou site web juridique. Notre système est conçu pour parser et analyser une grande variété de formats.' },
      { question: 'Puis-je essayer avant d\'acheter ?', answer: 'Absolument. Nous offrons une période d\'essai gratuite de 14 jours, sans carte bancaire requise, pour vous permettre de tester toutes les fonctionnalités Pro.' },
      { question: 'L\'IA remplace-t-elle mon expertise ?', answer: 'Non, l\'IA agit comme un assistant qui prépare le terrain. Elle effectue la veille et rédige des brouillons, mais vous gardez le contrôle total sur la validation et la publication du contenu.' }
    ]
  },
  {
    title: 'Facturation',
    faqs: [
      { question: 'Quels moyens de paiement acceptez-vous ?', answer: 'Nous acceptons les cartes bancaires (Visa, Mastercard, American Express) ainsi que PayPal. Les paiements sont sécurisés via Stripe.' },
      { question: 'Puis-je changer de plan à tout moment ?', answer: 'Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement et la facturation est ajustée au prorata.' },
      { question: 'Comment obtenir une facture ?', answer: 'Toutes vos factures sont disponibles dans votre espace client. Elles sont également envoyées automatiquement par email après chaque paiement.' }
    ]
  },
  {
    title: 'Sécurité',
    faqs: [
      { question: 'Mes données sont-elles sécurisées ?', answer: 'La sécurité est notre priorité. Toutes vos données sont chiffrées et hébergées sur des serveurs sécurisés en France, en conformité avec le RGPD.' },
      { question: 'Qui a accès à mes données ?', answer: 'Seuls vous et les membres de votre équipe que vous avez autorisés ont accès à vos données. Notre équipe technique n\'y accède que pour le support, avec votre accord.' },
      { question: 'Comment supprimer mon compte ?', answer: 'Vous pouvez supprimer votre compte à tout moment depuis les paramètres. Toutes vos données seront supprimées définitivement dans un délai de 30 jours.' }
    ]
  }
]

export default function FAQPage() {
  return (
    <Box className='min-h-screen bg-white'>
      <FrontHeader />

      {/* Hero Section */}
      <Box 
        className='pt-32 pb-20 text-center'
        sx={{ background: 'linear-gradient(138.18deg, #eae8fd 0%, #fce5e6 94.44%)' }}
      >
        <Container maxWidth='lg'>
          <Chip size='small' variant='outlined' color='primary' label='FAQ' className='mb-4' />
          <Typography variant='h3' className='font-bold text-[#5D596C] mb-4'>
            Questions fréquentes
          </Typography>
          <Typography className='text-gray-600 max-w-2xl mx-auto'>
            Trouvez rapidement des réponses à vos questions les plus courantes.
          </Typography>
        </Container>
      </Box>

      {/* FAQ Sections */}
      <Container maxWidth='lg' className='py-20'>
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          <Grid container spacing={6}>
            {faqCategories.map((category, catIndex) => (
              <Grid item xs={12} key={catIndex}>
                <Typography variant='h5' sx={{ fontWeight: 700, color: '#5D596C', mb: 3 }}>
                  {category.title}
                </Typography>
                {category.faqs.map((faq, faqIndex) => (
                  <Accordion 
                    key={faqIndex} 
                    defaultExpanded={catIndex === 0 && faqIndex === 0}
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
                      sx={{ 
                        '& .MuiAccordionSummary-content': {
                          overflow: 'hidden'
                        }
                      }}
                    >
                      <Typography sx={{ fontWeight: 500, color: '#5D596C', wordBreak: 'break-word' }}>
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ color: '#6B6B80', wordBreak: 'break-word', lineHeight: 1.7 }}>
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <FrontFooter />
    </Box>
  )
}
