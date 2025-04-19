'use client'

import { useState } from "react"
import toast from "react-hot-toast"

const formats = ["Instagram", "Facebook", "LinkedIn", "Tweet"]

export default function SocialPage() {
  const [format, setFormat] = useState("Instagram")
  const [prompt, setPrompt] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return toast.error("Entrez un prompt.")
    setLoading(true)

    const res = await fetch("/api/ia/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: `Rédige un post ${format} : ${prompt}` }),
    })

    const data = await res.json()
    setOutput(data.result || "Aucune réponse IA.")
    setLoading(false)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">📱 Réseaux Sociaux IA</h1>
      <p className="text-gray-600 mb-6">Crée automatiquement des posts adaptés à chaque plateforme.</p>

      <div className="flex flex-col gap-4 mb-4">
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="border rounded px-4 py-2"
        >
          {formats.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>

        <textarea
          rows={3}
          placeholder="Ex : Lancer un nouveau produit beauté"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-4 border rounded"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Génération..." : "✨ Générer le post IA"}
        </button>
      </div>

      {output && (
        <div className="bg-gray-50 p-4 border rounded mt-6">
          <h2 className="font-semibold mb-2">📝 Résultat généré :</h2>
          <pre className="whitespace-pre-wrap text-sm">{output}</pre>
          <button
            onClick={() => {
              navigator.clipboard.writeText(output)
              toast.success("Copié !")
            }}
            className="mt-2 text-sm text-blue-600 underline"
          >
            Copier le texte
          </button>
        </div>
      )}
    </div>
  )
}
