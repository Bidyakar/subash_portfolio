import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Subash S Sapkota - Portfolio',
  description: 'Youth Leader & Marketing Professional - Building Communities, Driving Change',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
