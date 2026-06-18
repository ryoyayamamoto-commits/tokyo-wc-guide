// Supabaseテーブルの生の型
export type Area = {
  id: string
  name: string
  slug: string
  sort_order: number
  created_at?: string
}

export type Genre = {
  id: string
  name: string
  slug: string
  sort_order?: number
  created_at?: string
}

export type Venue = {
  id: string
  name: string
  area_id?: string
  genre_id?: string
  address: string
  nearest_station: string | null
  latitude?: number | null
  longitude?: number | null
  image_url: string | null
  official_site_url: string | null
  reservation_url: string | null
  is_reservation_available: boolean
  is_featured: boolean
  description: string | null
  created_at?: string
  updated_at?: string
}

export type Match = {
  id: string
  competition_name: string
  round: string
  home_team: string
  away_team: string
  home_team_flag: string | null
  away_team_flag: string | null
  kickoff_at: string
  broadcast_channel: string | null
  is_japan_national: boolean
  created_at?: string
  updated_at?: string
}

export type VenueMatch = {
  id: string
  venue_id: string
  match_id: string
  note: string | null
  created_at: string
}

// JOINした複合型
export type VenueWithRelations = Venue & {
  area: Area
  genre: Genre
}

export type VenueWithMatchCount = VenueWithRelations & {
  match_count: number
}

export type MatchWithVenueCount = Match & {
  venue_count: number
}
