'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useUser } from '@clerk/nextjs'
import jsPDF from 'jspdf'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface PlanOrder {
  id: string
  name: string
  email: string
  message: string
  plan: string
  status?: string
  downloads?: number
  created_at: string
}

export default function UserPlansPage() {
  const { user } = useUser()
  const [orders, setOrders] = useState<PlanOrder[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedMessage, setEditedMessage] = useState('')

  useEffect(() => {
    if (user?.id) fetchUserOrders()
  }, [user])

  const fetchUserOrders = async () => {
    const { data } = await supabase
      .from('plan_orders')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false })

    if (data) setOrders(data as PlanOrder[])
  }

  const downloadPDF = async (order: PlanOrder) => {
    const doc = new jsPDF()
    doc.setFontSize(14)
    doc.text(`Confirmation de souscription – ${order.plan}`, 14, 20)
    doc.setFontSize(12)
    doc.text(`Nom : ${order.name}`, 14, 35)
    doc.text(`Email : ${order.email}`, 14, 45)
    doc.text(`Message : ${order.message || '–'}`, 14, 55)
    doc.text(`Statut : ${order.status}`, 14, 70)
    doc.text('NovaCore by Dave & Luce Solutions', 14, 250)
    doc.save(`Confirmation_${order.plan}_${order.name}.pdf`)

    const updatedDownloads = (order.downloads || 0) + 1

    await supabase.from('plan_orders').update({
      downloads: updatedDownloads
    }).eq('id', order.id)

    await fetch('/api/webhooks/pdf-download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user?.id,
        name: order.name,
        email: order.email,
        plan: order.plan,
        timestamp: new Date().toISOString(),
        downloads: updatedDownloads,
      })
    })

    fetchUserOrders()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Confirmer la suppression ?')) return
    await supabase.from('plan_orders').delete().eq('id', id)
    fetchUserOrders()
  }

  const handleUpdate = async (id: string) => {
    if (!editedMessage.trim()) return
    await supabase.from('plan_orders').update({ message: editedMessage }).eq('id', id)
    setEditingId(null)
    setEditedMessage('')
    fetchUserOrders()
  }

  const exportToCSV = () => {
    const headers = ['Plan', 'Message', 'Date', 'Téléchargements']
    const rows = orders.map(o => [
      o.plan,
      o.message,
      new Date(o.created_at).toLocaleString(),
      o.downloads || 0
    ])
    const csvContent = [headers, ...rows].map(e => e.map(v => `"${v}"`).join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'mes_souscriptions_novacore.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const renderStatusBadge = (status?: string) => {
    const base = 'text-xs px-2 py-1 rounded-full font-medium'
    switch (status) {
      case 'Validé':
        return <span className={`bg-green-100 text-green-800 ${base}`}>✔ Validé</span>
      case 'En attente':
        return <span className={`bg-yellow-100 text-yellow-800 ${base}`}>⏳ En attente</span>
      case 'Refusé':
        return <span className={`bg-red-100 text-red-800 ${base}`}>❌ Refusé</span>
      default:
        return <span className={`bg-gray-100 text-gray-700 ${base}`}>–</span>
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">📋 Mes souscriptions NovaCore</h1>
        {orders.length > 0 && (
          <button
            onClick={exportToCSV}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
          >
            📥 Exporter en CSV
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500">Aucune demande enregistrée pour l’instant.</p>
      ) : (
        <table className="w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border px-4 py-2">Plan</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Statut</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="border px-4 py-2 font-semibold">{order.plan}</td>
                <td className="border px-4 py-2">
                  {editingId === order.id ? (
                    <input
                      value={editedMessage}
                      onChange={(e) => setEditedMessage(e.target.value)}
                      className="w-full border px-2 py-1 text-sm"
                    />
                  ) : (
                    order.message || '–'
                  )}
                </td>
                <td className="border px-4 py-2 text-center">
                  {renderStatusBadge(order.status)}
                </td>
                <td className="border px-4 py-2">
                  {new Date(order.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                  {order.downloads ? (
                    <div className="text-xs text-gray-500">
                      📄 {order.downloads} téléchargement(s)
                    </div>
                  ) : null}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  {editingId === order.id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(order.id)}
                        className="text-green-600 hover:underline"
                      >
                        💾 Enregistrer
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null)
                          setEditedMessage('')
                        }}
                        className="text-gray-500 hover:underline"
                      >
                        Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(order.id)
                          setEditedMessage(order.message || '')
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="text-red-600 hover:underline"
                      >
                        🗑 Supprimer
                      </button>
                      {order.status === 'Validé' && (
                        <button
                          onClick={() => downloadPDF(order)}
                          className="text-purple-600 hover:underline"
                        >
                          📄 Télécharger PDF
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
