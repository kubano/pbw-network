import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PBW NETWORK | Modern Web Solutions',
  description: 'Showcasing innovative web development projects and architectural solutions by PBW NETWORK.',
  keywords: 'web development, architecture, design, modern web solutions, pbw network',
  authors: [{ name: 'PBW NETWORK' }],
  openGraph: {
    title: 'PBW NETWORK',
    description: 'Showcasing innovative web development projects and architectural solutions',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {children}
      </body>
    </html>
  )
}
