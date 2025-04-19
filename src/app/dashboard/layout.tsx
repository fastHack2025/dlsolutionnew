'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/contexts/theme'
import { Toaster } from 'react-hot-toast'
import Sidebar from '@/components/dashboard/Sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ThemeProvider>
        <div className="flex min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white transition-colors">
          <Sidebar />
          <div className="flex-1">
            <DashboardHeader />
            <main className="p-4">{children}</main>
          </div>
        </div>
        <Toaster position="top-right" />
      </ThemeProvider>
    </ClerkProvider>
  )
}
