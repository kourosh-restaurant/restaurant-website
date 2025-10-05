import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
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
      path: '../public/fonts/IRANSansXV.ttf',
      weight: '400'
    },
    // {
    //   path: '../public/fonts/woff/dana-bold.woff',
    //   weight: '700'
    // }
  ],
  variable: '--font-IRANSansXV'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir='rtl'>
      <body className={`font-sans ${IRANSansXV.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
