'use client'

import { useState, useEffect } from 'react'
import { useUser } from "@clerk/nextjs"
import { createClient } from '@supabase/supabase-js'
import toast from 'react-hot-toast'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const categories = ["Réseaux", "Articles", "Scripts"]

export default function StudioPage() {
  const { user } = useUser()
  const [prompt, setPrompt] = useState("")
  const [category, setCategory] = useState(categories[0])
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    if (user) fetchHistory()
  }, [user])

  const fetchHistory = async () => {
    const { data } = await supabase
      .from("ia_studio")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false })
    setHistory(data || [])
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return toast.error("Entrez un prompt.")
    setLoading(true)

    const res = await fetch("/api/ia/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    })

    const data = await res.json()
    const result = data.result || "Aucune réponse générée."
    setOutput(result)

    const { error } = await supabase.from("ia_studio").insert({
      user_id: user?.id,
      category,
      prompt,
      result,
    })

    if (error) {
      toast.error("Erreur de sauvegarde Supabase.")
    } else {
      toast.success("Résultat enregistré 🎉")
      fetchHistory()
    }

    setLoading(false)
  }

  const toggleFavorite = async (id: string, current: boolean) => {
    await supabase.from("ia_studio").update({ favorite: !current }).eq("id", id)
    fetchHistory()
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">🧠 Studio IA</h1>
      <p className="text-gray-600 mb-6">Générez du contenu intelligent selon votre besoin.</p>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-4 py-2"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ex : Génère un post Instagram pour un produit capillaire"
          className="w-full p-4 border rounded focus:outline-none"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Génération..." : "✨ Générer IA"}
        </button>
      </div>

      {output && (
        <div className="mt-6 bg-gray-50 border rounded p-4">
          <h2 className="text-lg font-semibold mb-2">💡 Résultat généré :</h2>
          <pre className="text-sm whitespace-pre-wrap">{output}</pre>
        </div>
      )}

      <hr className="my-8" />

      <h2 className="text-xl font-bold mb-4">🕘 Historique IA</h2>
      <div className="space-y-4">
        {history.map((item) => (
          <div key={item.id} className="border p-4 rounded bg-white shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                {item.category}
              </span>
              <button
                onClick={() => toggleFavorite(item.id, item.favorite)}
                className="text-yellow-500 text-sm"
              >
                {item.favorite ? "★ Favori" : "☆ Marquer"}
              </button>
            </div>
            <p className="text-sm mb-1 text-gray-500">
              <strong>Prompt :</strong> {item.prompt}
            </p>
            <p className="text-sm whitespace-pre-wrap">
              <strong>Résultat :</strong> {item.result}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
