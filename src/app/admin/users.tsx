'use client'

import { useEffect, useState } from 'react'
import { UserResource } from '@clerk/types'
import { useUser, useOrganization } from '@clerk/nextjs'

export default function AdminUsers() {
  const { user } = useUser()
  const org = useOrganization()
  const [users, setUsers] = useState<UserResource[]>([])

  useEffect(() => {
    if (org) fetchUsers()
  }, [org])

  const fetchUsers = async () => {
    const res = await fetch('/api/admin/users')
    const data = await res.json()
    setUsers(data)
  }

  const updateRole = async (userId: string, newRole: string) => {
    const res = await fetch('/api/admin/roles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role: newRole }),
    })
    if (res.ok) fetchUsers()
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">🔐 Gestion des utilisateurs</h1>
      <table className="w-full bg-white rounded shadow overflow-hidden text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Rôle</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-b">
              <td className="p-3">{u.emailAddresses?.[0]?.emailAddress}</td>
              <td className="p-3">{u.publicMetadata?.role || 'user'}</td>
              <td className="p-3">
                {u.publicMetadata?.role !== 'admin' && (
                  <button
                    onClick={() => updateRole(u.id, 'admin')}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Rendre Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
