// ✅ src/app/admin/security/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminSecurityPage() {
  const router = useRouter()

  useEffect(() => {
    const hasSecurityAccess = true
    if (!hasSecurityAccess) {
      router.push('/unauthorized')
    }
  }, [router]) // ✅ Ajouté

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Sécurité</h1>
      {/* gestion des logs, RLS, etc */}
    </div>
  )
}
