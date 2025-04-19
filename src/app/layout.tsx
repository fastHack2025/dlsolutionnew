'use client'

import './globals.css'
import { ThemeProvider } from '@/contexts/theme'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
