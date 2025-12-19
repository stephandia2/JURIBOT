// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Tableau de Bord',
    href: '/dashboard',
    icon: 'tabler-smart-home'
  },
  {
    label: 'Veille Juridique',
    icon: 'tabler-gavel',
    children: [
      {
        label: 'Flux des Sources',
        href: '/veille/Gsources'
      },
      {
        label: 'Gestion des Sources',
        href: '/veille/Gflux'
      }
    ]
  },
  {
    label: 'Editeur et Creation',
    icon: 'tabler-edit',
    children: [
      {
        label: 'Brouillons (IA)',
        href: '/editor/drafts'
      },
      {
        label: 'Planificateur',
        href: '/editor/planning'
      },
      {
        label: 'Archives',
        href: '/editor/archives'
      }
    ]
  },
  {
    label: 'Outils',
    icon: 'tabler-tools',
    children: [
      {
        label: 'Statistiques',
        href: '/tools/stats'
      },
      {
        label: 'Calendrier Editorial',
        href: '/tools/calendar'
      },
      {
        label: 'Favoris',
        href: '/tools/favorites'
      },
      {
        label: 'Studio Media',
        href: '/tools/media'
      }
    ]
  },
  {
    label: 'Configuration',
    icon: 'tabler-settings',
    children: [
      
      {
        label: 'sécurité',
        href: '/account-settings?tab=tags'
      },
      {
        label: 'Mots-cles et Tags',
        href: '/tags'
      }
    ]
  }
]

export default verticalMenuData
