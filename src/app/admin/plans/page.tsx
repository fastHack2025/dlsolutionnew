// ✅ src/app/admin/plans/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPlansPage() {
  const router = useRouter()

  useEffect(() => {
    const planAccess = true
    if (!planAccess) {
      router.push('/unauthorized')
    }
  }, [router]) // ✅ Ajouté

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Gestion des plans</h1>
      {/* plans ici */}
    </div>
  )
}
