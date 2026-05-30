import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import {
  Playfair_Display,
  Cormorant_Garamond,
  Poppins,
  Inter,
} from 'next/font/google'

import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title:
    'Memories & all - Personalized Magazines for Your Memories',

  description:
    'Turn your memories into stunning personalized magazines. Custom designs for birthdays, anniversaries, weddings, travel diaries, and special occasions.',

  keywords:
    'personalized magazines, custom magazines, memory books, photo magazines, anniversary gifts, wedding albums',

  generator: 'charmi',

  openGraph: {
    title:
      'Memories & all - Personalized Magazines for Your Memories',

    description:
      'Transform your precious moments into beautiful, tactile keepsakes.',

    type: 'website',
  },

  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`
        ${playfair.variable}
        ${cormorant.variable}
        ${poppins.variable}
        ${inter.variable}
        bg-background scroll-smooth
      `}
    >
      <body className="font-inter antialiased text-foreground">
        {children}

        {process.env.NODE_ENV === 'production' && (
          <Analytics />
        )}
      </body>
    </html>
  )
}