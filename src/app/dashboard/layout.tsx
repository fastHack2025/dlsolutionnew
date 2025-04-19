'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/contexts/theme'
import { Toaster } from 'react-hot-toast'
import Sidebar from '@/components/Sidebar' // corrigé pour reflet emplacement réel
import DashboardHeader from '@/components/dashboard/DashboardHeader'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <ThemeProvider>
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
          <Sidebar />

          <div className="flex-1 ml-64">
            <DashboardHeader />
            <main className="p-6">
              {children}
            </main>
          </div>

          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </ThemeProvider>
    </ClerkProvider>
  )
}