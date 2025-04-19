import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  const body = await req.json()

  const { user_id, name, email, plan, downloads, timestamp } = body

  const { error } = await supabase.from('download_logs').insert([
    {
      user_id,
      name,
      email,
      plan,
      downloads,
      timestamp: timestamp || new Date().toISOString()
    }
  ])

  if (error) {
    console.error('Erreur insertion log:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ status: 'ok', saved: true })
}
