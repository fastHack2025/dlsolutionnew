'use client'

export default function DashboardHeader() {
  return (
    <header className="w-full bg-white border-b px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Tableau de bord</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Bienvenue, Admin</span>
        <img
          src="https://res.cloudinary.com/dko5sommz/image/upload/v1744370550/logo-novacore_iqi2pd.png"
          alt="Profil"
          className="w-8 h-8 rounded-full object-cover border"
        />
      </div>
    </header>
  )
}
