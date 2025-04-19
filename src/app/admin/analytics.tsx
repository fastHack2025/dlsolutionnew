'use client'

import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AnalyticsPage() {
  const [promptStats, setPromptStats] = useState<number[]>([])
  const [scoreStats, setScoreStats] = useState<number[]>([])
  const [labels, setLabels] = useState<string[]>([])

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    const today = new Date()
    const days = [...Array(7).keys()].map(i => {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      return d.toISOString().split('T')[0]
    }).reverse()

    setLabels(days)

    const promptCounts = await Promise.all(
      days.map(async (date) => {
        const { count } = await supabase
          .from('ia_studio')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', `${date}T00:00:00`)
          .lte('created_at', `${date}T23:59:59`)
        return count || 0
      })
    )
    setPromptStats(promptCounts)

    const scoreData = await supabase
      .from('crm_clients')
      .select('score, created_at')

    const avgByDate = days.map(date => {
      const filtered = scoreData.data?.filter(d =>
        d.created_at.startsWith(date)
      ) || []
      const avg = filtered.length
        ? Math.round(filtered.reduce((acc, c) => acc + c.score, 0) / filtered.length)
        : 0
      return avg
    })

    setScoreStats(avgByDate)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">📊 Analytics IA – NovaCore</h1>

      <div className="mb-8 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Prompts générés / 7 derniers jours</h2>
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: 'Prompts IA',
                data: promptStats,
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
              },
            ],
          }}
          options={{ responsive: true }}
        />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Score IA moyen / 7 derniers jours</h2>
        <Line
          data={{
            labels,
            datasets: [
              {
                label: 'Score IA moyen',
                data: scoreStats,
                fill: false,
                borderColor: 'rgb(34,197,94)',
                tension: 0.3,
              },
            ],
          }}
          options={{ responsive: true }}
        />
      </div>
    </div>
  )
}
