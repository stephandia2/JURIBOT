'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

const plans = [
  {
    name: 'Gratuit',
    price: 0,
    yearlyPrice: 0,
    description: 'Pour découvrir JurisBot',
    features: [
      '3 sources de veille',
      '10 articles/mois',
      'Génération IA basique',
      'Support email'
    ],
    buttonText: 'Plan actuel',
    buttonVariant: 'outlined' as const,
    current: true
  },
  {
    name: 'Pro',
    price: 29,
    yearlyPrice: 290,
    description: 'Pour les professionnels',
    features: [
      'Sources illimitées',
      'Articles illimités',
      'Génération IA avancée',
      'Publication LinkedIn auto',
      'Analytiques détaillées',
      'Support prioritaire'
    ],
    buttonText: 'Passer au Pro',
    buttonVariant: 'contained' as const,
    popular: true,
    current: false
  },
  {
    name: 'Entreprise',
    price: 99,
    yearlyPrice: 990,
    description: 'Pour les équipes',
    features: [
      'Tout du plan Pro',
      'Multi-utilisateurs (5)',
      'API access',
      'SSO / SAML',
      'Onboarding personnalisé',
      'Account manager dédié'
    ],
    buttonText: 'Contacter',
    buttonVariant: 'outlined' as const,
    current: false
  }
]

export default function DashboardPricingPage() {
  const [yearly, setYearly] = useState(false)

  return (
    <Box className="p-6">
      <Box className="text-center mb-8">
        <Typography variant="h4" sx={{ color: '#5D596C', fontWeight: 600, mb: 1 }}>
          Nos Tarifs
        </Typography>
        <Typography color="text.secondary" className="mb-4">
          Choisissez le plan qui correspond à vos besoins
        </Typography>
        
        {/* Toggle */}
        <Box className="flex items-center justify-center gap-2">
          <Typography sx={{ color: !yearly ? '#7367F0' : '#5D596C', fontWeight: 500 }}>
            Mensuel
          </Typography>
          <FormControlLabel
            control={
              <Switch 
                checked={yearly}
                onChange={(e) => setYearly(e.target.checked)}
                sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#7367F0' } }}
              />
            }
            label=""
          />
          <Typography sx={{ color: yearly ? '#7367F0' : '#5D596C', fontWeight: 500 }}>
            Annuel
          </Typography>
          <Chip 
            label="Économisez 25%" 
            size="small" 
            sx={{ bgcolor: 'rgba(40, 199, 111, 0.12)', color: '#28C76F', fontWeight: 500 }}
          />
        </Box>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.name}>
            <Card 
              sx={{ 
                borderRadius: 2, 
                boxShadow: plan.popular 
                  ? '0 4px 25px rgba(115, 103, 240, 0.25)' 
                  : '0 2px 10px rgba(0,0,0,0.08)',
                border: plan.popular ? '2px solid #7367F0' : '1px solid #eee',
                position: 'relative',
                height: '100%'
              }}
            >
              {plan.popular && (
                <Chip 
                  label="Populaire" 
                  sx={{ 
                    position: 'absolute', 
                    top: 16, 
                    right: 16,
                    bgcolor: '#7367F0',
                    color: 'white',
                    fontWeight: 600
                  }}
                />
              )}
              <CardContent className="p-6">
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#5D596C', mb: 1 }}>
                  {plan.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="mb-4">
                  {plan.description}
                </Typography>
                
                <Box className="flex items-baseline mb-6">
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#7367F0' }}>
                    {yearly ? plan.yearlyPrice : plan.price}€
                  </Typography>
                  <Typography color="text.secondary" sx={{ ml: 1 }}>
                    /{yearly ? 'an' : 'mois'}
                  </Typography>
                </Box>

                <Divider className="mb-4" />

                <Box className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <Box key={index} className="flex items-center gap-2">
                      <i className="tabler-check text-lg" style={{ color: '#28C76F' }} />
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  ))}
                </Box>

                <Button 
                  fullWidth 
                  variant={plan.buttonVariant}
                  disabled={plan.current}
                  sx={{ 
                    py: 1.5,
                    ...(plan.buttonVariant === 'contained' && {
                      bgcolor: '#7367F0',
                      '&:hover': { bgcolor: '#685DD8' }
                    }),
                    ...(plan.buttonVariant === 'outlined' && {
                      borderColor: '#7367F0',
                      color: '#7367F0'
                    })
                  }}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Current Plan Info */}
      <Card sx={{ mt: 6, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
        <CardContent className="p-6">
          <Box className="flex items-center justify-between">
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#5D596C' }}>
                Votre plan actuel : Gratuit
              </Typography>
              <Typography color="text.secondary">
                Vous utilisez 2/3 sources et 7/10 articles ce mois-ci
              </Typography>
            </Box>
            <Button 
              variant="contained"
              sx={{ bgcolor: '#7367F0', '&:hover': { bgcolor: '#685DD8' } }}
            >
              Voir les détails d'utilisation
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
