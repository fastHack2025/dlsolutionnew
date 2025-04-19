import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'
import { createClient } from '@supabase/supabase-js'

const notion = new Client({ auth: process.env.NOTION_SECRET })
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST() {
  const { data: logs } = await supabase
    .from('access_denied_logs')
    .select('*')
    .order('timestamp', { ascending: false })

  if (!logs) return NextResponse.json({ error: 'No data' }, { status: 400 })

  for (const log of logs) {
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID! },
      properties: {
        Email: { title: [{ text: { content: log.email || '-' } }] },
        Chemin: { rich_text: [{ text: { content: log.path } }] },
        Raison: { rich_text: [{ text: { content: log.reason } }] },
        Date: { date: { start: log.timestamp } },
      },
    })
  }

  return NextResponse.json({ status: 'exported', count: logs.length })
}
