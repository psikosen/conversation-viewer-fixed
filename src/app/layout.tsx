import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })
const inter = Inter({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  title: 'Conversation Viewer',
  description: 'A neuromorphic design application for viewing conversations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} theme-light`}>
      <body className="font-body bg-app-gradient text-white antialiased">
        {/* Background decorative layers */}
        <div className="app-bg-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
