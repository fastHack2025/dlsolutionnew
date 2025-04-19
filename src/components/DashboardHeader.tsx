'use client'

import Image from 'next/image'

export default function DashboardHeader() {
  return (
    <header className="w-full bg-white border-b px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Tableau de bord</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Bienvenue, Admin</span>
        <Image
          src="https://res.cloudinary.com/dko5sommz/image/upload/v1744370550/logo-novacore_iqi2pd.png"
          alt="Profil"
          width={32}
          height={32}
          className="rounded-full object-cover border"
        />
      </div>
    </header>
  )
}
