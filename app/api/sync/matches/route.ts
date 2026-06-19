import { NextResponse } from 'next/server'
import { fetchWorldCupMatches } from '@/lib/espn'
import { createServiceClient } from '@/lib/supabase'

export async function GET(req: Request) {
  // Cron認証
  const secret = req.headers.get('x-cron-secret')
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const db = createServiceClient()

  try {
    const matches = await fetchWorldCupMatches()

    if (matches.length === 0) {
      await db.from('sync_logs').insert({
        type: 'matches', status: 'warn', records: 0,
        message: 'ESPN API returned 0 matches',
      })
      return NextResponse.json({ ok: true, records: 0, message: 'No matches found' })
    }

    const { error } = await db.from('matches').upsert(
      matches.map(m => ({ ...m, updated_at: new Date().toISOString() })),
      { onConflict: 'external_id' }
    )

    if (error) throw error

    await db.from('sync_logs').insert({
      type: 'matches', status: 'success', records: matches.length,
      message: null,
    })

    return NextResponse.json({ ok: true, records: matches.length })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    await db.from('sync_logs').insert({
      type: 'matches', status: 'error', records: 0, message,
    })
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
