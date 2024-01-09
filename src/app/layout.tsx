import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ML Research Explorer',
  description: 'An interactive tool for exploring the latest research and advancements in machine learning.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/mlrc-paper-background.svg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
