// 📁 src/app/register/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirm) {
      alert('Les mots de passe ne correspondent pas.')
      return
    }

    // Simulation d'enregistrement
    localStorage.setItem('isLoggedIn', 'true')
    alert('Compte créé avec succès.')
    router.push('/dashboard')
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <form
        onSubmit={handleRegister}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold">Créer un compte</h2>
          <p className="text-sm text-gray-500">Rejoignez l’espace entreprise DL Solutions</p>
        </div>

        <input
          type="email"
          placeholder="Adresse email professionnelle"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-black"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-black"
        />

        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-black"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900"
        >
          S’inscrire
        </button>

        <p className="text-sm text-center text-gray-600">
          Déjà un compte ?{' '}
          <Link href="/login" className="text-black font-semibold hover:underline">
            Se connecter
          </Link>
        </p>

        <p className="text-xs text-gray-400 text-center">
          En vous inscrivant, vous acceptez nos conditions d’utilisation.
        </p>
      </form>
    </section>
  )
}
