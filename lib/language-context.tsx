'use client'

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react'

type Language = 'en' | 'fa'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (en: string | null | undefined, fa: string | null | undefined) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved === 'en' || saved === 'fa') {
      setLanguageState(saved)
    }
    setMounted(true)
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }, [])

  const t = useCallback((en: string | null | undefined, fa: string | null | undefined): string => {
    if (language === 'fa' && fa) return fa
    return en || fa || ''
  }, [language])

  const isRTL = language === 'fa'

  if (!mounted) {
    return null
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
