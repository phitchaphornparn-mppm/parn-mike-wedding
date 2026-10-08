import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PARN & MIKE - 2 HEARTS · 1 JOURNEY',
  description: 'Wedding Guest Experience Platform',
  icons: {
    icon: 'https://i.postimg.cc/nLMpsKvH/ser-clae-w-(Bulk-1)-re-ynche-y.png',
    shortcut: 'https://i.postimg.cc/nLMpsKvH/ser-clae-w-(Bulk-1)-re-ynche-y.png',
    apple: 'https://i.postimg.cc/nLMpsKvH/ser-clae-w-(Bulk-1)-re-ynche-y.png',
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
