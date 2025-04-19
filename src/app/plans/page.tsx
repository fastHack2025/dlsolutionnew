'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ExportPlansPDF from '@/components/ExportPlansPDF'
import PlanOrderForm from '@/components/PlanOrderForm'
import { useState } from 'react'

const plans = [
  {
    title: 'Essentiel PRO',
    price: '750 000 FCFA',
    duration: '/ 3 mois',
    audience: 'Solo / Début d’activité',
    items: [
      'Audit et diagnostic de l’existant',
      'Mise en place d’un CRM simple OU calendrier de contenu',
      '1 session de formation ou accompagnement personnalisé',
      '1 suivi mensuel + ajustements',
    ],
    highlight: false,
  },
  {
    title: 'Business+',
    price: '1 000 000 FCFA',
    duration: '/ 3 mois',
    audience: 'PME / Agences / Entreprises',
    items: [
      'Tout le Plan Essentiel',
      'CRM complet + KPI + automatisation IA',
      'Intégration NovaCore IA + outils avancés',
      'Coaching mensuel + ajustements stratégiques',
    ],
    highlight: true,
  },
  {
    title: 'Transformation 360°',
    price: '1 500 000 FCFA',
    duration: '/ 3 mois',
    audience: 'Grands comptes / Vision globale',
    items: [
      'Tout le Plan Business+',
      'Identité visuelle + QR code + flyers',
      'Planning IA + visuels mensuels (12–20)',
      'Publications auto + diagnostic CX complet',
    ],
    highlight: false,
  },
]

export default function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <>
      <Header />
      <main className="py-20 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">💼 Nos Plans Stratégiques</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-16">
          Que vous soyez indépendant ou entreprise en pleine croissance, Dave & Luce vous propose des solutions sur mesure pour transformer votre communication et votre expérience client avec l’IA.
        </p>

        <div className="grid gap-10 md:grid-cols-3">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-xl border bg-white dark:bg-gray-900 shadow-lg p-6 text-left transition-all duration-300 ${
                plan.highlight ? 'border-blue-500 scale-105' : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{plan.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{plan.audience}</p>
              <div className="text-3xl font-extrabold text-blue-600 mb-2">{plan.price}</div>
              <div className="text-sm text-gray-500 mb-4">{plan.duration}</div>
              <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-2 mb-6">
                {plan.items.map((item, i) => (
                  <li key={i}>✔️ {item}</li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedPlan(plan.title)}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
              >
                Choisir ce plan
              </button>
              {selectedPlan === plan.title && <PlanOrderForm plan={plan.title} />}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <ExportPlansPDF />
        </div>
      </main>
      <Footer />
    </>
  )
}
