import { currentUser } from "@clerk/nextjs/server"

export default async function Dashboard() {
  const user = await currentUser()

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Bienvenue, {user?.firstName ?? "Utilisateur"} 👋</h1>
      <p className="text-gray-600 text-sm">Voici vos outils IA personnalisés selon votre profil.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <Card
          title="🧠 Studio IA"
          description="Créez des contenus, du code, des visuels et plus avec l'IA."
          href="/studio"
        />
        <Card
          title="📇 CRM IA"
          description="Suivez vos clients, messages et ventes avec l'IA."
          href="/crm"
        />
        <Card
          title="📱 Réseaux Sociaux IA"
          description="Générez, programmez et analysez vos posts automatiquement."
          href="/social"
        />
        <Card
          title="💳 Tarification & Abonnements"
          description="Voir les plans disponibles et gérer vos paiements."
          href="/pricing"
        />
        <Card
          title="📬 Messagerie"
          description="Consultez vos messages internes et clients."
          href="/messagerie"
        />
        <Card
          title="📊 Statistiques & Performances"
          description="Analyse IA de vos données et activités."
          href="/analytics"
        />
        {user?.publicMetadata?.role === "admin" && (
          <Card
            title="🔐 Admin Panel"
            description="Gérez les utilisateurs, modules IA et paiements."
            href="/admin"
          />
        )}
      </div>
    </div>
  )
}

function Card({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <a
      href={href}
      className="block border rounded-2xl p-6 shadow hover:shadow-md hover:bg-gray-50 transition duration-200"
    >
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
      <div className="mt-4 text-blue-600 text-sm font-medium">Accéder →</div>
    </a>
  )
}
