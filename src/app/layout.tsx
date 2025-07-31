import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AdVerseAI',
  description: 'It works!',
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
