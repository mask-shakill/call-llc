import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CommPro — Call Center Dashboard',
  description: 'Premium communication platform for business',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
