// ✅ src/app/admin/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const isAuthorized = true // logique à toi
    if (!isAuthorized) {
      router.push('/unauthorized')
    }
  }, [router]) // ✅ Dépendance ajoutée

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {/* contenu admin */}
    </div>
  )
}
