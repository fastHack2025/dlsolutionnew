// 📁 src/app/login/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (email === 'admin@dls.com' && password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true')
      router.push('/dashboard')
    } else {
      alert('Identifiants incorrects')
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold">Connexion</h2>
          <p className="text-sm text-gray-500">Accès réservé aux membres de DL Solutions</p>
        </div>

        <input
          type="email"
          placeholder="Email professionnel"
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

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900"
        >
          Se connecter
        </button>

        <p className="text-sm text-center text-gray-600">
          Pas encore de compte ?{' '}
          <Link href="/register" className="text-black font-semibold hover:underline">
            Créer un compte
          </Link>
        </p>

        <p className="text-xs text-gray-400 text-center">
          En continuant, vous acceptez nos conditions d’utilisation.
        </p>
      </form>
    </section>
  )
}
