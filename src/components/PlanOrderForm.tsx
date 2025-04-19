'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import emailjs from '@emailjs/browser'
import jsPDF from 'jspdf'
import { createClient } from '@supabase/supabase-js'
import { useUser } from '@clerk/nextjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function PlanOrderForm({ plan }: { plan: string }) {
  const { user } = useUser()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !user?.id) return toast.error('Champs manquants ou utilisateur non connecté')
    setLoading(true)

    const doc = new jsPDF()
    doc.setFontSize(14)
    doc.text(`Confirmation de souscription – ${plan}`, 14, 20)
    doc.setFontSize(12)
    doc.text(`Nom : ${name}`, 14, 35)
    doc.text(`Email : ${email}`, 14, 45)
    doc.text(`Message : ${message || 'Aucun'}`, 14, 60)
    doc.text('NovaCore by Dave & Luce Solutions', 14, 250)

    const pdfBlob = doc.output('blob')
    const reader = new FileReader()

    reader.onload = async function () {
      const base64PDF = (reader.result as string).split(',')[1]

      const templateParams = {
        from_name: name,
        from_email: email,
        plan,
        message,
        pdf_file: base64PDF,
      }

      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          templateParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        )
      } catch (err) {
        toast.error("Erreur EmailJS")
        setLoading(false)
        return
      }

      const { error } = await supabase.from('plan_orders').insert({
        user_id: user.id,
        name,
        email,
        message,
        plan,
      })

      if (error) {
        toast.error('Erreur Supabase : ' + error.message)
      } else {
        toast.success('Souscription envoyée et sauvegardée ✅')
        setName('')
        setEmail('')
        setMessage('')
      }

      setLoading(false)
    }

    reader.readAsDataURL(pdfBlob)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-10 text-left max-w-xl mx-auto">
      <h3 className="text-xl font-bold mb-4">Souscrire au plan : {plan}</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Nom complet *</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Email *</label>
          <input
            type="email"
            className="w-full border px-4 py-2 rounded bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Message / Objectif</label>
          <textarea
            className="w-full border px-4 py-2 rounded bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer ma demande'}
        </button>
      </div>
    </form>
  )
}
