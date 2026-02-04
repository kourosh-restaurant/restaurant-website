'use client'

import { ReactNode } from 'react'
import { useLanguage } from '@/lib/language-context'
import { AppHeader } from '@/components/app-header'

export default function CourierLayout({ children }: { children: ReactNode }) {
  const { isRTL } = useLanguage()

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <AppHeader showCart={false} />
      <main className="container px-4 py-6">
        {children}
      </main>
    </div>
  )
}
