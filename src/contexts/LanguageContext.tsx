'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { createClient } from '@/utils/supabase'
import { dictionaries, Language } from '@/utils/i18n'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof dictionaries['en'] // Type based on 'en' structure
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr') // Default to French
  const supabase = createClient()

  const fetchLanguage = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('language')
        .eq('id', user.id)
        .single()

      if (data?.language) {
        // Simple mapping: 'Français' -> 'fr', 'Anglais' -> 'en'
        const langMap: Record<string, Language> = {
          'Français': 'fr',
          'Anglais': 'en',
          'French': 'fr',
          'English': 'en'
        }
        setLanguage(langMap[data.language] || 'fr')
      }
    }
  }

  useEffect(() => {
    fetchLanguage()

    // Listen for profile updates
    const handleUserUpdate = () => {
      fetchLanguage()
    }

    window.addEventListener('user:updated', handleUserUpdate)
    return () => window.removeEventListener('user:updated', handleUserUpdate)
  }, [])

  const value = {
    language,
    setLanguage,
    t: dictionaries[language]
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
