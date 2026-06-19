import { type Match } from '@/types'
import { getTeamFlag } from '@/lib/flags'

const ESPN_BASE = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world'

function parseStatus(espnStatus: string): Match['status'] {
  if (espnStatus.includes('LIVE') || espnStatus.includes('IN_PROGRESS')) return 'live'
  if (espnStatus.includes('FINAL') || espnStatus.includes('FULL_TIME')) return 'finished'
  return 'scheduled'
}

function isJapanMatch(home: string, away: string): boolean {
  return home === 'Japan' || away === 'Japan'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseEvent(event: any): Omit<Match, 'id' | 'created_at' | 'updated_at'> | null {
  try {
    const comp = event.competitions?.[0]
    if (!comp) return null

    const home = comp.competitors?.find((c: any) => c.homeAway === 'home')
    const away = comp.competitors?.find((c: any) => c.homeAway === 'away')
    if (!home || !away) return null

    const homeName = home.team?.displayName ?? ''
    const awayName = away.team?.displayName ?? ''
    const statusName = comp.status?.type?.name ?? 'STATUS_SCHEDULED'
    const stage = comp.notes?.[0]?.headline ?? event.season?.slug ?? 'Group Stage'

    return {
      external_id: event.id,
      competition: 'FIFA World Cup 2026',
      stage,
      home_team: homeName,
      away_team: awayName,
      home_team_flag: getTeamFlag(homeName),
      away_team_flag: getTeamFlag(awayName),
      kickoff_at: comp.date,
      status: parseStatus(statusName),
      home_score: home.score ? parseInt(home.score) : null,
      away_score: away.score ? parseInt(away.score) : null,
      is_japan_national: isJapanMatch(homeName, awayName),
    }
  } catch {
    return null
  }
}

export async function fetchWorldCupMatches(): Promise<Omit<Match, 'id' | 'created_at' | 'updated_at'>[]> {
  // WC2026: June 11 - July 19, 2026
  const url = `${ESPN_BASE}/scoreboard?dates=20260611-20260719&limit=100`

  const res = await fetch(url, {
    next: { revalidate: 3600 },
    headers: { 'User-Agent': 'tokyo-wc-guide/1.0' },
  })

  if (!res.ok) {
    throw new Error(`ESPN API error: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  const events = data.events ?? []

  return events
    .map(parseEvent)
    .filter((m: Omit<Match, 'id' | 'created_at' | 'updated_at'> | null): m is Omit<Match, 'id' | 'created_at' | 'updated_at'> => m !== null)
}
