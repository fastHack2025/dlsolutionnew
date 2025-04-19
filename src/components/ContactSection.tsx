'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ContactSection() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('✅ Message envoyé avec succès !')
    setEmail('')
    setMessage('')
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Contactez-nous
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Une question, un besoin, un partenariat ? Écrivez-nous directement !
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-xl shadow-md">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Adresse Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="exemple@dlsolutions.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Écrivez votre message ici..."
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-black"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md text-lg font-medium hover:bg-gray-900 transition"
          >
            Envoyer
          </button>
        </form>
      </div>
    </section>
  )
}
