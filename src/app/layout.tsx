import './globals.css'
import type { Metadata } from 'next'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
