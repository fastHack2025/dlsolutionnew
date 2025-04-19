'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useUser } from '@clerk/nextjs'
import { v4 as uuidv4 } from 'uuid'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const templates: Record<string, string> = {
  "Script YouTube": "Voici un script d’introduction pour une vidéo YouTube sur NovaCore...",
  "Post LinkedIn": "🚀 Découvrez NovaCore, la solution IA complète pour automatiser vos tâches...",
  "Email de relance": "Bonjour {{nom}},\n\nJe vous écris pour faire suite à notre dernier échange...",
}

export default function StudioPage() {
  const { user } = useUser()
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [templateKey, setTemplateKey] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResult(`Résultat IA pour : ${prompt}`)
  }

  const handleCreateTemplate = async () => {
    if (!templateKey || !user?.id) return
    const content = templates[templateKey]
    const name = `${templateKey.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
    setLoading(true)

    await supabase.from('dev_files').insert({
      id: uuidv4(),
      user_id: user.id,
      name,
      content,
    })

    setLoading(false)
    alert('✅ Template généré avec succès !')
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">🎨 Studio IA – Générateur de fichiers</h1>

      <form onSubmit={handleGenerate} className="space-y-4 mb-8">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Saisir votre prompt IA ici..."
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Générer
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <strong>Résultat :</strong>
          <p>{result}</p>
        </div>
      )}

      <div className="mt-12 border-t pt-6">
        <h2 className="text-lg font-semibold mb-2">📦 Générer un template IA</h2>

        <div className="flex gap-4 items-center">
          <select
            onChange={(e) => setTemplateKey(e.target.value)}
            className="border rounded p-2"
            defaultValue=""
          >
            <option value="" disabled>Choisir un template</option>
            {Object.keys(templates).map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>

          <button
            onClick={handleCreateTemplate}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Génération...' : '+ Générer'}
          </button>
        </div>
      </div>
    </div>
  )
}
