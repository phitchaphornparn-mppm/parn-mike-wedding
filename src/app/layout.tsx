import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PARN & MIKE - 2 HEARTS · 1 JOURNEY',
  description: 'Wedding Guest Experience Platform',
  icons: {
    icon: 'https://i.postimg.cc/9QhBFJH2/PM-Wedding-Card.png',
    shortcut: 'https://i.postimg.cc/9QhBFJH2/PM-Wedding-Card.png',
    apple: 'https://i.postimg.cc/9QhBFJH2/PM-Wedding-Card.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
