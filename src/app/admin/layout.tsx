'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { LayoutDashboard, LineChart, Users, Menu, X } from "lucide-react"
import { ThemeProvider } from "@/contexts/admin_theme_toggle"
import ThemeToggleButton from "@/components/admin/ThemeToggleButton"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
  { label: "Analytics IA", href: "/admin/analytics", icon: <LineChart size={18} /> },
  { label: "Utilisateurs", href: "/admin/users", icon: <Users size={18} /> },
]

function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      {/* Mobile Header */}
      <div className="sm:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white z-50 flex items-center justify-between p-4">
        <h2 className="text-lg font-bold">NovaCore Admin</h2>
        <div className="flex items-center gap-2">
          <ThemeToggleButton />
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`sm:block ${open ? 'block' : 'hidden'} sm:relative fixed z-40 top-[60px] left-0 sm:top-0 bg-gray-900 text-white w-64 p-6 space-y-6`}>
        <h2 className="hidden sm:block text-2xl font-bold">NovaCore Admin</h2>
        <ThemeToggleButton />
        <nav className="flex flex-col gap-4">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm px-3 py-2 rounded flex items-center gap-2 ${
                pathname === item.href ? "bg-blue-600" : "hover:bg-gray-800"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 pt-[60px] sm:pt-0 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LayoutShell>{children}</LayoutShell>
    </ThemeProvider>
  )
}
