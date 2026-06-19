import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MatchCard } from '@/components/match/MatchCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatKickoffDate, formatKickoffTime } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const { data: venue } = await supabase
    .from('venues')
    .select('*, area:areas(*), genre:genres(*)')
    .eq('id', id)
    .single()
  if (!venue) return {}
  return {
    title: `${venue.name} | Tokyo World Cup Viewing Guide`,
    description: `${venue.area.name}にある${venue.genre.name}「${venue.name}」のワールドカップ放映情報`,
  }
}

export default async function VenueDetailPage({ params }: Props) {
  const { id } = await params

  const [{ data: venue }, { data: venueMatchesData }] = await Promise.all([
    supabase.from('venues').select('*, area:areas(*), genre:genres(*)').eq('id', id).single(),
    supabase
      .from('venue_matches')
      .select('match:matches(*, venue_matches(count))')
      .eq('venue_id', id),
  ])

  if (!venue) notFound()

  const now = new Date()
  const upcomingMatches = (venueMatchesData ?? [])
    .map((vm: any) => vm.match)
    .filter(Boolean)
    .map((m: any) => ({ ...m, venue_count: m.venue_matches?.[0]?.count ?? 0 }))
    .filter((m: any) => new Date(m.kickoff_at) > now)
    .sort((a: any, b: any) => new Date(a.kickoff_at).getTime() - new Date(b.kickoff_at).getTime())

  return (
    <div className="space-y-8">
      {/* パンくず */}
      <nav className="text-sm text-gray-500">
        <Link href="/" className="hover:underline">ホーム</Link>
        <span className="mx-2">/</span>
        <Link href="/venues" className="hover:underline">店舗一覧</Link>
        <span className="mx-2">/</span>
        <span>{venue.name}</span>
      </nav>

      {/* 店舗画像 */}
      {venue.image_url && (
        <div className="relative h-64 w-full rounded-2xl overflow-hidden">
          <Image
            src={venue.image_url}
            alt={venue.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* 店舗基本情報 */}
      <section className="bg-white border rounded-2xl p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{venue.name}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary">{venue.area.name}</Badge>
              <Badge variant="secondary">{venue.genre.name}</Badge>
              {venue.is_reservation_available && (
                <Badge variant="outline" className="text-green-700 border-green-400">
                  予約可
                </Badge>
              )}
              {venue.is_featured && (
                <Badge className="bg-amber-500 text-white">おすすめ</Badge>
              )}
            </div>
          </div>
        </div>

        {venue.description && (
          <p className="text-gray-600 text-sm leading-relaxed">{venue.description}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm">
          <div>
            <span className="text-gray-500 block mb-0.5">住所</span>
            <span className="font-medium">{venue.address}</span>
          </div>
          {venue.nearest_station && (
            <div>
              <span className="text-gray-500 block mb-0.5">最寄駅</span>
              <span className="font-medium">{venue.nearest_station}</span>
            </div>
          )}
        </div>

        {/* Google Map */}
        {venue.latitude && venue.longitude && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${venue.latitude},${venue.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
          >
            📍 Google Mapで見る
          </a>
        )}

        {/* アクションボタン */}
        <div className="flex flex-wrap gap-3 pt-2">
          {venue.reservation_url && (
            <a href={venue.reservation_url} target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-700 hover:bg-green-800">予約する</Button>
            </a>
          )}
          {venue.official_site_url && (
            <a href={venue.official_site_url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">公式サイト</Button>
            </a>
          )}
        </div>
      </section>

      {/* 放映予定試合 */}
      <section>
        <h2 className="text-lg font-bold mb-4">
          放映予定の試合
          <span className="ml-2 text-green-700">{upcomingMatches.length}件</span>
        </h2>

        {upcomingMatches.length === 0 ? (
          <p className="text-gray-500 text-sm">放映予定の試合はありません</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
