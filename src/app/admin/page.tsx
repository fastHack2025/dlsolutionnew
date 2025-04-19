'use client'

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminDashboard() {
  const { user } = useUser()
  const router = useRouter()

  const [clientCount, setClientCount] = useState(0)
  const [avgScore, setAvgScore] = useState(0)
  const [promptCount, setPromptCount] = useState(0)
  const [postCount, setPostCount] = useState(0)
  const [lastExportDate, setLastExportDate] = useState<string | null>(null)

  useEffect(() => {
    if (user && user.publicMetadata?.role !== "admin") router.push("/")
    if (user?.publicMetadata?.role === "admin") fetchStats()
  }, [user])

  const fetchStats = async () => {
    const { count: clients } = await supabase
      .from("crm_clients")
      .select("*", { count: "exact", head: true })

    const { data: scores } = await supabase
      .from("crm_clients")
      .select("score")

    const { count: prompts } = await supabase
      .from("ia_studio")
      .select("*", { count: "exact", head: true })

    const { data: socialPosts } = await supabase
      .from("ia_studio")
      .select("category")
      .ilike("category", "Réseaux")

    setClientCount(clients || 0)
    setPromptCount(prompts || 0)
    setPostCount(socialPosts?.length || 0)

    const average = scores && scores.length > 0
      ? Math.round(scores.reduce((acc, cur) => acc + cur.score, 0) / scores.length)
      : 0

    setAvgScore(average)
    setLastExportDate(new Date().toLocaleDateString())
  }

  const Card = ({
    title,
    value,
    description,
    action,
    link,
  }: {
    title: string
    value: string | number
    description: string
    action: string
    link: string
  }) => (
    <div className="bg-white border rounded shadow p-6 hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold my-2">{value}</p>
      <p className="text-sm text-gray-500">{description}</p>
      <button
        onClick={() => router.push(link)}
        className="mt-4 text-blue-600 text-sm underline"
      >
        {action}
      </button>
    </div>
  )

  if (!user || user.publicMetadata?.role !== "admin") {
    return <p className="p-8 text-red-600">⛔ Accès réservé aux administrateurs</p>
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">🧭 Dashboard Admin NovaCore</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="👥 Clients CRM"
          value={clientCount}
          description={`Score IA moyen : ${avgScore}/100`}
          action="Voir le CRM"
          link="/crm"
        />
        <Card
          title="🤖 Prompts IA générés"
          value={promptCount}
          description="Tous modules confondus"
          action="Voir le Studio IA"
          link="/studio"
        />
        <Card
          title="📱 Posts réseaux sociaux"
          value={postCount}
          description="Catégorie 'Réseaux' uniquement"
          action="Voir Réseaux IA"
          link="/social"
        />
        <Card
          title="📤 Dernier export CRM"
          value={lastExportDate || "Aucun"}
          description="Historique PDF"
          action="Exporter"
          link="/crm"
        />
        <Card
          title="💳 Paiements"
          value="Stripe / CinetPay"
          description="Gestion abonnements à venir"
          action="Voir Paiement"
          link="/pricing"
        />
        {user?.publicMetadata?.role === "admin" && (
          <Card
            title="🔐 Accès Admin"
            value="OK"
            description="Vous êtes administrateur"
            action="Gérer"
            link="/admin/users"
          />
        )}
      </div>
    </div>
  )
}
