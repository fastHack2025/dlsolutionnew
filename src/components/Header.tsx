'use client'

import Link from 'next/link'
import { useState } from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Modules IA', href: '/#modules' },
    { label: 'Tarification', href: '/pricing' },
    { label: 'Plans', href: '/plans' },
    { label: 'Contact', href: '/#contact' },
  ]

  return (
    <header className="bg-white dark:bg-gray-900 text-black dark:text-white border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo + titre */}
        <Link href="/" className="text-xl font-bold">
          NovaCore
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm hover:underline"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Menu Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile content */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
