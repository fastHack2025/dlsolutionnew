'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface RefusLog {
  id: string
  user_id: string
  email: string
  reason: string
  path: string
  timestamp: string
}

export default function AdminSecurityPage() {
  const { user } = useUser()
  const router = useRouter()
  const [refusLogs, setRefusLogs] = useState<RefusLog[]>([])

  useEffect(() => {
    if (!user) return
    if (user.publicMetadata?.role !== 'admin') {
      router.push('/')
    } else {
      fetchRefus()
    }
  }, [user])

  const fetchRefus = async () => {
    const { data } = await supabase
      .from('access_denied_logs')
      .select('*')
      .order('timestamp', { ascending: false })

    if (data) setRefusLogs(data as RefusLog[])
  }

  const exportToCSV = () => {
    const headers = ['Email', 'Chemin', 'Raison', 'Date']
    const rows = refusLogs.map(log => [
      log.email,
      log.path,
      log.reason,
      new Date(log.timestamp).toLocaleString()
    ])
    const csvContent = [headers, ...rows]
      .map(row => row.map(val => `"${val}"`).join(','))
      .join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'nova_security_logs.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToNotion = async () => {
    const res = await fetch('/api/notion/export-security', { method: 'POST' })
    if (res.ok) alert('✅ Export Notion effectué')
    else alert('❌ Erreur export Notion')
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">🛡️ Dashboard Sécurité NovaCore</h1>
        <div className="flex flex-wrap gap-2">
          {refusLogs.length > 0 && (
            <>
              <button
                onClick={exportToCSV}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
              >
                📁 Exporter CSV
              </button>
              <button
                onClick={exportToNotion}
                className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800"
              >
                📤 Exporter vers Notion
              </button>
            </>
          )}
        </div>
      </div>

      {refusLogs.length === 0 ? (
        <p className="text-gray-500">Aucun refus détecté récemment.</p>
      ) : (
        <table className="w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Chemin</th>
              <th className="border px-4 py-2">Raison</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {refusLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="border px-4 py-2">{log.email}</td>
                <td className="border px-4 py-2">{log.path}</td>
                <td className="border px-4 py-2">{log.reason}</td>
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
