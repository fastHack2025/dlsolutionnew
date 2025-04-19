'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface LogEntry {
  message: string
  [key: string]: unknown
}

export default function AdminLogsPage() {
  const router = useRouter()
  const [logs, setLogs] = useState<LogEntry[]>([])

  const fetchLogs = useCallback(async () => {
    const res = await fetch('/api/logs')
    const data: LogEntry[] = await res.json()
    setLogs(data)
  }, [])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs, router])

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Logs Admin</h1>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log.message}</li>
        ))}
      </ul>
    </main>
  )
}
