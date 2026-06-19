import { NextResponse } from 'next/server'
import { fetchTokyoSportsBars } from '@/lib/overpass'
import { createServiceClient } from '@/lib/supabase'

export async function GET(req: Request) {
  const secret = req.headers.get('x-cron-secret')
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const db = createServiceClient()

  try {
    const venues = await fetchTokyoSportsBars()

    if (venues.length === 0) {
      await db.from('sync_logs').insert({
        type: 'venues', status: 'warn', records: 0,
        message: 'Overpass API returned 0 venues',
      })
      return NextResponse.json({ ok: true, records: 0, message: 'No venues found' })
    }

    const { error } = await db.from('venues').upsert(
      venues.map(v => ({ ...v, updated_at: new Date().toISOString() })),
      { onConflict: 'osm_id' }
    )

    if (error) throw error

    await db.from('sync_logs').insert({
      type: 'venues', status: 'success', records: venues.length,
      message: null,
    })

    return NextResponse.json({ ok: true, records: venues.length })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    await db.from('sync_logs').insert({
      type: 'venues', status: 'error', records: 0, message,
    })
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
