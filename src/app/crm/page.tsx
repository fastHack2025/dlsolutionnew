// ✅ src/app/crm/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Client {
  id: string
  name: string
  email: string
  status: string
  score: number
  created_at: string
}

export default function CRMPage() {
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    const { data } = await supabase.from('crm_clients').select('*')
    if (data) setClients(data as Client[])
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">🧠 Clients</h1>
      <ul>
        {clients.map(c => (
          <li key={c.id}>{c.name} - {c.status}</li>
        ))}
      </ul>
    </div>
  )
}
