'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Accueil' },
  { href: '/dashboard/messages', label: 'Messages' },
  { href: '/dashboard/ia', label: 'Assistant IA' },
  { href: '/dashboard/devstudio', label: 'Studio Dev' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-black text-white flex flex-col p-6">
      <h2 className="text-xl font-bold mb-6">DL Solutions</h2>
      <nav className="space-y-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2 rounded ${
              pathname === link.href ? 'bg-white text-black' : 'hover:bg-gray-800'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
