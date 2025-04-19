'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Hero avec vidéo animée Cloudinary */}
      <section className="relative w-full h-[75vh] overflow-hidden flex items-center justify-center bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          src="https://res.cloudinary.com/dko5sommz/video/upload/v1744417105/assistant_IT_hwlbqq.mp4"
        />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Bienvenue sur NovaCore 🚀</h1>
          <p className="text-lg sm:text-xl text-gray-200">
            L’interface intelligente pour propulser votre business avec l’IA.
          </p>
        </div>
      </section>

      {/* Contenu d'accueil */}
      <main className="px-6 py-12 max-w-4xl mx-auto">
        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-4">📦 Modules disponibles</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-200">
            <li>CRM IA intelligent</li>
            <li>Studio de génération de contenus</li>
            <li>Planification Réseaux Sociaux</li>
            <li>Export et statistiques automatiques</li>
          </ul>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-4">🧭 Commencez maintenant</h2>
          <a
            href="/login"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Se connecter
          </a>
        </section>
      </main>

      <Footer />
    </>
  )
}
