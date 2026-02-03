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
  title: 'Subash S Sapkota - Portfolio',
  description: 'Youth Leader & Marketing Professional - Building Communities, Driving Change',

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
  openGraph: {
    title: 'Subash S Sapkota - Portfolio',
    description: 'Youth Leader & Marketing Professional',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased text-navy">
        {children}
      </body>
    </html>
  )
}