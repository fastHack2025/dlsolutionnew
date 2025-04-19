'use client'

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { FileText } from 'lucide-react'

const plans = [
  {
    name: 'Essentiel PRO',
    price: '750 000 FCFA / 3 mois',
    details: [
      'Audit de l’existant',
      'CRM simple ou calendrier de contenu',
      '1 coaching personnalisé',
      '1 suivi stratégique/mois',
    ],
  },
  {
    name: 'Business+',
    price: '1 000 000 FCFA / 3 mois',
    details: [
      'Tout le plan Essentiel',
      'CRM complet + KPI IA',
      'Intégration NovaCore + Studio IA',
      'Coaching mensuel + ajustements',
    ],
  },
  {
    name: 'Transformation 360°',
    price: '1 500 000 FCFA / 3 mois',
    details: [
      'Tout le plan Business+',
      'Identité visuelle + QR + Flyers',
      'Planning IA + visuels (12–20)',
      'Diagnostic CX complet + publications auto',
    ],
  },
]

export default function ExportPlansPDF() {
  const handleExport = () => {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text('Plans Dave & Luce / NovaCore', 14, 20)
    doc.setFontSize(12)

    plans.forEach((plan, idx) => {
      const y = 30 + idx * 60
      doc.setTextColor(33, 37, 41)
      doc.text(`${plan.name} – ${plan.price}`, 14, y)

      doc.autoTable({
        startY: y + 5,
        theme: 'grid',
        styles: { fontSize: 10 },
        head: [['Inclus dans ce plan']],
        body: plan.details.map((line) => [line]),
        margin: { left: 14, right: 14 },
      })
    })

    doc.save('plans_novacore.pdf')
  }

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded text-sm"
    >
      <FileText size={16} /> Exporter en PDF
    </button>
  )
}
