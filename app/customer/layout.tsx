'use client'

import { ReactNode, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { AppHeader } from '@/components/app-header'
import { CartSheet } from '@/components/cart-sheet'

export default function CustomerLayout({ children }: { children: ReactNode }) {
  const { isRTL } = useLanguage()
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <AppHeader showCart onCartClick={() => setCartOpen(true)} />
      <main className="container px-4 py-6">
        {children}
      </main>
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  )
}
