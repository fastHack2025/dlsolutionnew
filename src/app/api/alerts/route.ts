import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import emailjs from '@emailjs/nodejs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const SECURE_TOKEN = process.env.ALERT_SECRET_TOKEN || 'novacore2025'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token || token !== SECURE_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

    const { data, error } = await supabase
      .from('plan_orders')
      .select('plan, created_at')
      .gte('created_at', since)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const stats = data.reduce<Record<string, number>>((acc, row) => {
      acc[row.plan] = (acc[row.plan] || 0) + 1
      return acc
    }, {})

    const seuil = 3

    // ✅ FIX ESLINT ici : suppression de `_` non utilisé
    const plansAlertes = Object.entries(stats).filter(([, count]) => count >= seuil)

    if (plansAlertes.length === 0) {
      return NextResponse.json({ message: '✅ Aucune alerte détectée.' })
    }

    const alertMessage = plansAlertes
      .map(([plan, count]) => `- ${plan}: ${count} demandes`)
      .join('\n')

    const emailResponse = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        from_name: 'NovaCore Alerts',
        from_email: 'alerts@novacore.app',
        message: `📢 ALERTE : Volume élevé de demandes détecté dans les dernières 24h.\n\n${alertMessage}`,
        plan: '[ALERTE SYSTÈME]'
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )

    return NextResponse.json({
      alert: true,
      plans: plansAlertes,
      emailStatus: emailResponse.status
    })
  } catch (err: unknown) {
    return NextResponse.json(
      {
        error: 'Erreur serveur',
        details: err instanceof Error ? err.message : String(err)
      },
      { status: 500 }
    )
  }
}
