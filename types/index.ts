export type Match = {
  id: string
  external_id: string
  competition: string
  stage: string
  home_team: string
  away_team: string
  home_team_flag: string | null
  away_team_flag: string | null
  kickoff_at: string
  status: 'scheduled' | 'live' | 'finished'
  home_score: number | null
  away_score: number | null
  is_japan_national: boolean
  created_at: string
  updated_at: string
}

export type Venue = {
  id: string
  osm_id: string | null
  name: string
  address: string | null
  area: string | null
  latitude: number | null
  longitude: number | null
  website_url: string | null
  google_maps_url: string | null
  phone: string | null
  opening_hours: string | null
  soccer_friendly_score: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type SyncLog = {
  id: string
  type: string
  status: string
  records: number | null
  message: string | null
  created_at: string
}
