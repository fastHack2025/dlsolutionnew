'use client'

import { useTheme } from '@/contexts/theme'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const { dark, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className="p-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
      aria-label="Changer le thème"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
