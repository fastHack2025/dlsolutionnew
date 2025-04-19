import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { email, user_id, reason, path } = body

  try {
    // Envoi EmailJS
    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_USER_ID,
        template_params: {
          from_email: email,
          user_id,
          reason,
          path,
          timestamp: new Date().toISOString()
        }
      })
    })

    // Envoi Slack Webhook
    await fetch(process.env.SLACK_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `🚨 *Accès refusé sur NovaCore* \n• Email: ${email}\n• Page: ${path}\n• 🕒 ${new Date().toLocaleString()}`
      })
    })

    return NextResponse.json({ status: 'ok', sent: true })
  } catch (error) {
    console.error('❌ Erreur alerte Email ou Slack :', error)
    return NextResponse.json({ status: 'error', error }, { status: 500 })
  }
}
