'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PricingPage() {
  return (
    <>
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-4">💳 Tarification NovaCore</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
          Choisissez l’offre qui correspond à vos besoins. Paiement sécurisé par Stripe ou CinetPay.
        </p>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {/* Offre Pro */}
          <div className="border rounded-lg p-6 shadow bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-semibold mb-2">🚀 Offre Pro</h2>
            <p className="text-sm text-gray-500 mb-4">Pour les entreprises dynamiques</p>
            <ul className="text-sm space-y-2 mb-6 text-gray-700 dark:text-gray-200">
              <li>✔️ Accès CRM IA + Studio</li>
              <li>✔️ 30 prompts/mois</li>
              <li>✔️ 1 utilisateur</li>
              <li>✔️ Support par email</li>
            </ul>
            <div className="text-3xl font-bold mb-4">15 000 FCFA / mois</div>
            <div className="flex gap-3">
              <button className="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-900">
                Payer avec Stripe
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700">
                CinetPay
              </button>
            </div>
          </div>

          {/* Offre Entreprise */}
          <div className="border rounded-lg p-6 shadow bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-semibold mb-2">🏢 Offre Entreprise</h2>
            <p className="text-sm text-gray-500 mb-4">Pour équipes et projets ambitieux</p>
            <ul className="text-sm space-y-2 mb-6 text-gray-700 dark:text-gray-200">
              <li>✔️ Accès complet à NovaCore</li>
              <li>✔️ Prompts illimités</li>
              <li>✔️ Jusqu’à 10 utilisateurs</li>
              <li>✔️ Assistance prioritaire</li>
            </ul>
            <div className="text-3xl font-bold mb-4">40 000 FCFA / mois</div>
            <div className="flex gap-3">
              <button className="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-900">
                Payer avec Stripe
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700">
                CinetPay
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
