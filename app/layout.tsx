import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import localFont from 'next/font/local'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CartProvider } from '@/context/CartContext'
import { LanguageProvider } from '@/lib/language-context'


export const metadata: Metadata = {
  title: 'koroush Restourant App',
  description: 'Restourant that make food with love.',
  authors: [
    { name: 'Hosein Ghasemizade' }
  ],
}

const IRANSansXV = localFont({
  src: [
    {
      path: './fonts/IRANSansX-Regular.woff',
      weight: '400'
    },
    {
      path: './fonts/IRANSansX-Bold.woff',
      weight: '700'
    }
  ],
  variable: '--font-IRANSansXV',
  display: 'swap'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir='rtl'>
      <body className={`${IRANSansXV.variable}`}>
        <CartProvider>
          <LanguageProvider>
            {children}
            <Analytics />
            <Footer />
          </LanguageProvider>
        </CartProvider>
      </body>
    </html>
  )
}
