import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

type Props = {
  params: Promise<{ id: string }>
}

export default async function VenueDetailPage({ params }: Props) {
  const { id } = await params
  const { data: venue } = await supabase.from('venues').select('*').eq('id', id).single()
  if (!venue) notFound()

  const score = venue.soccer_friendly_score
  const scoreColor = score >= 60 ? 'text-green-700' : score >= 40 ? 'text-yellow-600' : 'text-gray-500'

  return (
    <div className="space-y-8">
      <nav className="text-sm text-gray-500">
        <Link href="/" className="hover:underline">ホーム</Link>
        <span className="mx-2">/</span>
        <Link href="/venues" className="hover:underline">店舗一覧</Link>
        <span className="mx-2">/</span>
        <span>{venue.name}</span>
      </nav>

      <section className="bg-white border rounded-2xl p-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">{venue.name}</h1>
          <div className="flex flex-wrap gap-2">
            {venue.area && <Badge variant="secondary">{venue.area}</Badge>}
            <Badge variant="outline" className={`font-bold ${scoreColor}`}>
              観戦向きスコア {score}pt
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { key: 'has_large_screen', label: '📺 大画面あり' },
            { key: 'has_reservation', label: '📅 予約可' },
            { key: 'has_all_you_can_drink', label: '🍺 飲み放題' },
            { key: 'is_near_station', label: '🚉 駅近' },
            { key: 'has_english_menu', label: '🌍 英語対応' },
          ].map(({ key, label }) => {
            const active = (venue as Record<string, unknown>)[key] === true
            return (
              <span key={key} className={`text-sm px-3 py-1 rounded-full font-medium ${active ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-400 line-through'}`}>
                {label}
              </span>
            )
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {venue.address && (
            <div>
              <span className="text-gray-500 block mb-0.5">住所</span>
              <span className="font-medium">{venue.address}</span>
            </div>
          )}
          {venue.phone && (
            <div>
              <span className="text-gray-500 block mb-0.5">電話</span>
              <a href={`tel:${venue.phone}`} className="font-medium text-blue-600 hover:underline">{venue.phone}</a>
            </div>
          )}
          {venue.opening_hours && (
            <div className="sm:col-span-2">
              <span className="text-gray-500 block mb-0.5">営業時間</span>
              <span className="font-medium">{venue.opening_hours}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href={`https://tabelog.com/tokyo/rstLst/?vs=1&sk=${encodeURIComponent(venue.name)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">食べログで見る</Button>
          </a>
          {(venue.address || venue.google_maps_url) && (
            <a
              href={venue.address
                ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.address)}`
                : venue.google_maps_url!}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-blue-900 hover:bg-blue-800 text-white">
                📍 Google Mapで見る
              </Button>
            </a>
          )}
          {venue.website_url && (
            <a href={venue.website_url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">公式サイト</Button>
            </a>
          )}
        </div>
      </section>

      <section className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
        <p className="font-bold text-blue-900 mb-2">ワールドカップ試合日程も確認しよう</p>
        <Link href="/matches">
          <Button className="bg-red-600 hover:bg-red-700 text-white font-bold">
            ⚽ 試合日程を見る
          </Button>
        </Link>
      </section>
    </div>
  )
}
