import { type Venue } from '@/types'

const OVERPASS_SERVERS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
]

// 東京の主要エリア中心座標
const AREAS = [
  { name: '渋谷', lat: 35.6580, lon: 139.7016, r: 0.018 },
  { name: '新宿', lat: 35.6896, lon: 139.7006, r: 0.018 },
  { name: '池袋', lat: 35.7295, lon: 139.7109, r: 0.018 },
  { name: '六本木', lat: 35.6627, lon: 139.7318, r: 0.014 },
  { name: '恵比寿', lat: 35.6467, lon: 139.7101, r: 0.012 },
  { name: '上野', lat: 35.7141, lon: 139.7774, r: 0.015 },
  { name: '秋葉原', lat: 35.6984, lon: 139.7731, r: 0.014 },
  { name: '品川', lat: 35.6284, lon: 139.7387, r: 0.016 },
  { name: '東京駅', lat: 35.6812, lon: 139.7671, r: 0.014 },
]

function determineArea(lat: number, lon: number): string {
  let nearest = { name: '東京', dist: Infinity }
  for (const area of AREAS) {
    const dist = Math.sqrt(Math.pow(lat - area.lat, 2) + Math.pow(lon - area.lon, 2))
    if (dist < area.r && dist < nearest.dist) {
      nearest = { name: area.name, dist }
    }
  }
  return nearest.name
}

const SPORTS_KEYWORDS = [
  'sports', 'sport', 'football', 'soccer', 'hub', 'footnik',
  'サッカー', 'フットボール', 'スポーツ',
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function calcScore(tags: Record<string, string>): number {
  let score = 0
  const name = (tags.name ?? '').toLowerCase()
  const nameEn = (tags['name:en'] ?? '').toLowerCase()
  const combined = `${name} ${nameEn}`

  if (SPORTS_KEYWORDS.some(k => combined.includes(k))) score += 35
  if (tags.sport === 'soccer' || tags.sport === 'football') score += 25
  if (tags.amenity === 'pub') score += 15
  if (tags.amenity === 'bar') score += 5
  if (tags.website) score += 10
  if (tags.opening_hours) score += 5
  if (tags['name:en']) score += 5

  return Math.min(score, 100)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseElement(el: any): Omit<Venue, 'id' | 'created_at' | 'updated_at'> | null {
  try {
    const tags = el.tags ?? {}
    if (!tags.name) return null

    const lat = el.lat ?? el.center?.lat
    const lon = el.lon ?? el.center?.lon
    if (!lat || !lon) return null

    const area = determineArea(lat, lon)
    const osmId = `${el.type}/${el.id}`
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`

    const address = tags['addr:full'] ?? tags['addr:street']
      ? `${tags['addr:street'] ?? ''} ${tags['addr:housenumber'] ?? ''}`.trim()
      : null

    return {
      osm_id: osmId,
      name: tags.name,
      address,
      area,
      latitude: lat,
      longitude: lon,
      website_url: tags.website ?? tags['contact:website'] ?? null,
      google_maps_url: googleMapsUrl,
      phone: tags.phone ?? tags['contact:phone'] ?? null,
      opening_hours: tags.opening_hours ?? null,
      soccer_friendly_score: calcScore(tags),
      is_active: true,
    }
  } catch {
    return null
  }
}

export async function fetchTokyoSportsBars(): Promise<Omit<Venue, 'id' | 'created_at' | 'updated_at'>[]> {
  // 東京全域のバウンディングボックス
  const bbox = '35.50,139.50,35.85,139.95'

  const query = `
[out:json][timeout:30];
(
  node["amenity"~"bar|pub"]["name"~"sports|sport|football|soccer|hub|footnik|サッカー|フットボール|スポーツ",i](${bbox});
  way["amenity"~"bar|pub"]["name"~"sports|sport|football|soccer|hub|footnik|サッカー|フットボール|スポーツ",i](${bbox});
  node["sport"~"soccer|football"]["amenity"~"bar|pub|restaurant"](${bbox});
);
out center;
`

  let res: Response | null = null
  let lastError = ''
  for (const server of OVERPASS_SERVERS) {
    try {
      res = await fetch(server, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'User-Agent': 'tokyo-wc-guide/1.0',
        },
        body: new URLSearchParams({ data: query }).toString(),
        signal: AbortSignal.timeout(25000),
      })
      if (res.ok) break
      lastError = `${server}: ${res.status}`
    } catch (e) {
      lastError = `${server}: ${e}`
    }
  }
  if (!res || !res.ok) throw new Error(`All Overpass servers failed. Last: ${lastError}`)

  const data = await res.json()
  const elements = data.elements ?? []

  const venues = elements
    .map(parseElement)
    .filter((v: Omit<Venue, 'id' | 'created_at' | 'updated_at'> | null): v is Omit<Venue, 'id' | 'created_at' | 'updated_at'> => v !== null)

  // 重複除去（同名・同エリア）
  const seen = new Set<string>()
  return venues.filter((v: Omit<Venue, 'id' | 'created_at' | 'updated_at'>) => {
    const key = `${v.name}-${v.area}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}
