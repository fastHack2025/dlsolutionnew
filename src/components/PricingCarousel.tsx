'use client'

import { useState } from 'react'

export default function PricingCarousel() {
  const [selected, setSelected] = useState('pro')

  return (
    <section id="pricing" className="py-20 px-4 sm:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Tarification NovaCore</h2>
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setSelected('pro')}
            className={`px-6 py-2 rounded-full ${
              selected === 'pro' ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            Pro (Stripe)
          </button>
          <button
            onClick={() => setSelected('entreprise')}
            className={`px-6 py-2 rounded-full ${
              selected === 'entreprise' ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            Entreprise (CinetPay)
          </button>
        </div>

        <div className="p-6 rounded-xl shadow-md bg-gray-50 max-w-xl mx-auto">
          {selected === 'pro' ? (
            <>
              <h3 className="text-2xl font-semibold mb-2">Formule Pro</h3>
              <p className="text-gray-600 mb-4">Paiement via Stripe (mensuel)</p>
              <button className="bg-black text-white px-6 py-2 rounded">
                S’abonner avec Stripe
              </button>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-semibold mb-2">Formule Entreprise</h3>
              <p className="text-gray-600 mb-4">Paiement via CinetPay (mensuel)</p>
              <button className="bg-black text-white px-6 py-2 rounded">
                S’abonner avec CinetPay
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
