import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Subash S Sapkota | Youth Leader, Marketing Expert & Community Builder',
  description: 'Explore the portfolio of Subash S Sapkota, a dedicated Youth Leader and Marketing Professional. Driving change through community leadership, social work, and innovative marketing strategies.',
  metadataBase: new URL('https://subashssapkota.com.np'),

  // Favicon and App Icons
  icons: {
    icon: '/favicon.ico', // Place favicon.ico in /public
    shortcut: '/icon.png', // Place icon.png in /public
    apple: '/apple-touch-icon.png', // Place apple-touch-icon.png in /public
  },

  keywords: [
    'Subash S Sapkota',
    'Marketing Strategy',
    'Community Leadership',
    'Youth Empowerment',
    'Public Speaking',
    'Event Management',
    'Social Work',
    'Team Building',
    'Rotary Club of Matribhumi Baluwatar',
    'Sayathari Media Pvt. Ltd.',
    'Map Entrepreneurs Pvt. Ltd.',
    'Youthful Voice',
    'SSeries'
  ],

  // Social Media Preview (Meta Image)
  openGraph: {
    title: 'Subash S Sapkota | Youth Leader & Marketing Professional',
    description: 'Youth Leader & Marketing Professional - Dedicated to Building Communities and Driving Social Change through Leadership and Innovation.',
    url: 'https://subashssapkota.com.np',
    siteName: 'Subash S Sapkota',
    images: [
      {
        url: '/images/sssmeta.jpg',
        width: 1200,
        height: 630,
        alt: 'Subash Sapkota Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subash S Sapkota | Youth Leader & Marketing Professional',
    description: 'Explore the portfolio of Subash S Sapkota - Youth Leader, Marketing Expert, and Community Builder.',
    images: ['/images/sssmeta.jpg'],
  },

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-slate-900 bg-white">
        {children}
      </body>
    </html>
  )
}
