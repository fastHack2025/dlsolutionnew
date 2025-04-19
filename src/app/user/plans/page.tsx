'use client'

import { useUser } from '@clerk/nextjs'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface PlanOrder {
  id: string
  plan: string
  created_at: string
  status: string
}

export default function UserPlansPage() {
  const { user } = useUser()
  const [orders, setOrders] = useState<PlanOrder[]>([])

  const fetchUserOrders = useCallback(async () => {
    if (!user?.id) return

    const { data, error } = await supabase
      .from('plan_orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (!error && data) setOrders(data)
  }, [user])

  useEffect(() => {
    fetchUserOrders()
  }, [fetchUserOrders])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">📦 Mes plans</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="border border-gray-200 p-4 rounded-md shadow-sm"
          >
            <p className="font-semibold">Plan : {order.plan}</p>
            <p className="text-sm text-gray-500">
              Commandé le {new Date(order.created_at).toLocaleDateString()}
            </p>
            <p className="text-sm">
              Statut :{' '}
              <span
                className={
                  order.status === 'validé'
                    ? 'text-green-600'
                    : 'text-yellow-600'
                }
              >
                {order.status}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
