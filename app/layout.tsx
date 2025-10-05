import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import localFont from 'next/font/local'
import './globals.css'


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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
