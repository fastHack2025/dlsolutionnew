'use client'

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { createClient } from "@supabase/supabase-js"
import toast from "react-hot-toast"
import jsPDF from "jspdf"
import "jspdf-autotable"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function calculateScore(status: string, createdAt: string): number {
  let score = 50

  if (status === "Client actif") score += 25
  if (status === "Relancé ✅") score += 15
  if (status === "En veille") score -= 10
  if (status === "Prospect") score += 5

  const daysSinceCreation = Math.floor(
    (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24)
  )

  if (daysSinceCreation < 7) score += 10
  else if (daysSinceCreation > 30) score -= 10

  return Math.max(0, Math.min(score, 100))
}

export default function CRMPage() {
  const { user } = useUser()
  const [clients, setClients] = useState<any[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("Prospect")

  useEffect(() => {
    if (user) fetchClients()
  }, [user])

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from("crm_clients")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false })

    if (error) toast.error("Erreur chargement clients")
    else setClients(data || [])
  }

  const addClient = async () => {
    if (!name.trim()) return toast.error("Nom requis")

    const createdAt = new Date().toISOString()
    const newScore = calculateScore(status, createdAt)

    const { error } = await supabase.from("crm_clients").insert({
      user_id: user?.id,
      name,
      email,
      status,
      score: newScore,
      created_at: createdAt,
    })

    if (error) toast.error("Erreur ajout client")
    else {
      toast.success("Client ajouté")
      setName("")
      setEmail("")
      fetchClients()
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    const client = clients.find((c) => c.id === id)
    if (!client) return

    const updatedScore = calculateScore(newStatus, client.created_at)

    const { error } = await supabase
      .from("crm_clients")
      .update({ status: newStatus, score: updatedScore })
      .eq("id", id)

    if (!error) fetchClients()
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    doc.text("Liste des clients", 14, 16)
    doc.autoTable({
      startY: 20,
      head: [["Nom", "Email", "Statut", "Score"]],
      body: clients.map(c => [c.name, c.email || "—", c.status, c.score]),
    })
    doc.save("crm_novacore.pdf")
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">📇 CRM IA - Clients</h1>

      <div className="bg-white p-4 border rounded mb-6">
        <h2 className="font-semibold mb-2">➕ Ajouter un client</h2>
        <input
          type="text"
          placeholder="Nom complet"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-4 py-2 mr-2 mb-2"
        />
        <input
          type="email"
          placeholder="Email (optionnel)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-4 py-2 mr-2 mb-2"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-4 py-2 mr-2 mb-2"
        >
          <option value="Prospect">Prospect</option>
          <option value="Client actif">Client actif</option>
          <option value="En veille">En veille</option>
        </select>
        <button
          onClick={addClient}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Ajouter
        </button>
      </div>

      <button
        onClick={exportToPDF}
        className="mb-6 bg-gray-800 text-white px-4 py-2 rounded"
      >
        📄 Exporter en PDF
      </button>

      <div className="space-y-4">
        {clients.map(client => (
          <div key={client.id} className="border p-4 rounded flex justify-between items-start bg-white shadow-sm">
            <div>
              <h3 className="text-lg font-semibold">{client.name}</h3>
              <p className="text-sm text-gray-500">{client.email || "—"}</p>
              <p className="text-sm mt-1">
                Statut : <span className="font-semibold text-blue-600">{client.status}</span>
              </p>
              <p className="text-sm">Score IA : <strong>{client.score} / 100</strong></p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => updateStatus(client.id, "Relancé ✅")}
                className="text-sm bg-green-600 text-white px-4 py-1 rounded"
              >
                Relancer
              </button>
              <button
                onClick={() => updateStatus(client.id, "En veille")}
                className="text-sm bg-yellow-500 text-white px-4 py-1 rounded"
              >
                Marquer en veille
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
