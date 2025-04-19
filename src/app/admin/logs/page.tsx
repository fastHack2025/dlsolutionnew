'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface DownloadLog {
  id: string
  user_id: string
  name: string
  email: string
  plan: string
  downloads: number
  timestamp: string
}

export default function AdminLogsPage() {
  const { user } = useUser()
  const router = useRouter()
  const [logs, setLogs] = useState<DownloadLog[]>([])
  const [range, setRange] = useState<'7' | '30' | 'all'>('30')

  useEffect(() => {
    if (!user) return

    if (user.publicMetadata?.role !== 'admin') {
      // Log refus dans Supabase
      supabase.from('access_denied_logs').insert({
        user_id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        reason: 'Tentative d’accès non autorisée à /admin/logs',
        path: '/admin/logs',
        timestamp: new Date().toISOString()
      })
      router.push('/')
    } else {
      fetchLogs()
    }
  }, [user, range])

  const fetchLogs = async () => {
    let query = supabase.from('download_logs').select('*')

    if (range !== 'all') {
      const from = dayjs().subtract(Number(range), 'day').toISOString()
      query = query.gte('timestamp', from)
    }

    const { data } = await query.order('timestamp', { ascending: false })
    if (data) setLogs(data as DownloadLog[])
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">📥 Historique des téléchargements PDF</h1>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value as '7' | '30' | 'all')}
          className="border px-2 py-1 rounded text-sm"
        >
          <option value="7">7 derniers jours</option>
          <option value="30">30 derniers jours</option>
          <option value="all">Tout</option>
        </select>
      </div>

      {logs.length === 0 ? (
        <p className="text-gray-500">Aucune activité pour la période sélectionnée.</p>
      ) : (
        <table className="w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border px-4 py-2">Utilisateur</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Plan</th>
              <th className="border px-4 py-2">Téléchargements</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="border px-4 py-2 font-semibold">{log.name}</td>
                <td className="border px-4 py-2">{log.email}</td>
                <td className="border px-4 py-2">{log.plan}</td>
                <td className="border px-4 py-2 text-center">{log.downloads}</td>
                <td className="border px-4 py-2">
                  {new Date(log.timestamp).toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
