'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

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
  created_at: string
}

export default function AdminPlansPage() {
  const { user } = useUser()
  const router = useRouter()
  const [orders, setOrders] = useState<PlanOrder[]>([])
  const [filterPlan, setFilterPlan] = useState('')
  const [filterDate, setFilterDate] = useState('')

  useEffect(() => {
    if (user && user.publicMetadata?.role !== 'admin') {
      router.push('/')
    }
    fetchOrders()
  }, [user])

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('plan_orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) setOrders(data as PlanOrder[])
  }

  const filteredOrders = orders.filter(order => {
    const matchesPlan = filterPlan ? order.plan === filterPlan : true
    const matchesDate = filterDate ? order.created_at.startsWith(filterDate) : true
    return matchesPlan && matchesDate
  })

  const exportToCSV = () => {
    const headers = ['Nom', 'Email', 'Plan', 'Message', 'Date']
    const rows = filteredOrders.map(o => [o.name, o.email, o.plan, o.message, new Date(o.created_at).toLocaleString()])
    const csvContent = [headers, ...rows].map(e => e.map(val => `"${val}"`).join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'souscriptions_novacore.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const plansStats = filteredOrders.reduce<Record<string, number>>((acc, curr) => {
    acc[curr.plan] = (acc[curr.plan] || 0) + 1
    return acc
  }, {})

  const chartData = {
    labels: Object.keys(plansStats),
    datasets: [
      {
        label: 'Souscriptions par plan',
        data: Object.values(plansStats),
        backgroundColor: '#2563eb',
      },
    ],
  }

  const uniquePlans = [...new Set(orders.map(o => o.plan))]

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">📊 Souscriptions aux plans</h1>
        <div className="flex flex-wrap gap-4">
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="border rounded px-3 py-1 text-sm dark:bg-gray-900 dark:text-white"
          >
            <option value="">Filtrer par plan</option>
            {uniquePlans.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <input
            type="month"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border rounded px-3 py-1 text-sm dark:bg-gray-900 dark:text-white"
          />
          {filteredOrders.length > 0 && (
            <button
              onClick={exportToCSV}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
            >
              📥 Exporter en CSV
            </button>
          )}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-500">Aucune demande ne correspond aux filtres actuels.</p>
      ) : (
        <>
          <div className="mb-10 bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">📈 Statistiques filtrées</h2>
            <Bar data={chartData} height={100} />
          </div>

          <table className="w-full table-auto border-collapse text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="border px-4 py-2 text-left">Nom</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Plan</th>
                <th className="border px-4 py-2">Message</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="border px-4 py-2">{order.name}</td>
                  <td className="border px-4 py-2">{order.email}</td>
                  <td className="border px-4 py-2">{order.plan}</td>
                  <td className="border px-4 py-2">{order.message}</td>
                  <td className="border px-4 py-2">
                    {new Date(order.created_at).toLocaleString('fr-FR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
