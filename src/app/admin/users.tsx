'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserResource, useUser } from '@clerk/nextjs'

export default function UsersAdminPage() {
  const [users, setUsers] = useState<UserResource[]>([])
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    // Remplace par ton vrai fetch si besoin
    if (user) {
      setUsers([user])
    }
  }, [user])

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Utilisateurs</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th className="p-3">Email</th>
            <th className="p-3">Rôle</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="p-3">{u.emailAddresses?.[0]?.emailAddress}</td>
              <td className="p-3">
                {typeof u.publicMetadata?.role === 'string'
                  ? u.publicMetadata.role
                  : 'user'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
