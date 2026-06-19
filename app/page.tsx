import Link from 'next/link'
import { MatchCard } from '@/components/match/MatchCard'
import { VenueCard } from '@/components/venue/VenueCard'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

const AREAS = ['渋谷','新宿','池袋','六本木','恵比寿','上野','秋葉原','品川','東京駅']

export default async function HomePage() {
  const now = new Date().toISOString()
  const weekLater = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

  const [{ data: matchesData }, { data: venuesData }] = await Promise.all([
    supabase.from('matches').select('*').gte('kickoff_at', now).lte('kickoff_at', weekLater).order('kickoff_at').limit(6),
    supabase.from('venues').select('*').eq('is_active', true).order('soccer_friendly_score', { ascending: false }).limit(6),
  ])

  const matches = matchesData ?? []
  const venues = venuesData ?? []

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white px-6 py-10 md:py-14">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-red-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4 backdrop-blur-sm tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            LIVE VIEWING · TOKYO 2026
          </div>
          <h1 className="text-xl sm:text-3xl md:text-5xl font-black tracking-tight mb-3 leading-snug">
            観たい試合を選ぶだけ。
            <span className="block text-blue-300">
              東京の観戦スポットが<br className="sm:hidden" />見つかる。
            </span>
          </h1>
          <p className="text-blue-200 text-base mb-8 leading-relaxed">
            スポーツバー・パブなど東京都内の観戦スポットを<br className="hidden md:block" />
            ワールドカップ日程と合わせて探せるサービスです。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/matches">
              <Button size="lg" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-base px-8 shadow-lg border-0">
                ⚽ 試合日程を見る
              </Button>
            </Link>
            <Link href="/venues">
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-900 hover:bg-blue-50 font-bold text-base px-8 shadow-lg border-0">
                🏟️ 店舗から探す
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black tracking-tight">近日開催の試合</h2>
            <p className="text-sm text-gray-500 mt-0.5">今後7日以内に開催される試合</p>
          </div>
          <Link href="/matches" className="text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors">すべて見る →</Link>
        </div>
        {matches.length === 0 ? (
          <p className="text-gray-500 text-sm">近日開催の試合はありません</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((match) => <MatchCard key={match.id} match={match} />)}
          </div>
        )}
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-black tracking-tight">エリアから探す</h2>
          <p className="text-sm text-gray-500 mt-0.5">気になるエリアの観戦スポットをチェック</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {AREAS.map((area) => (
            <Link key={area} href={`/venues?area=${encodeURIComponent(area)}`}
              className="px-6 py-2.5 rounded-full border-2 bg-white hover:bg-blue-50 hover:border-blue-600 hover:text-blue-900 transition-all text-sm font-bold shadow-sm">
              {area}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black tracking-tight">おすすめ店舗</h2>
            <p className="text-sm text-gray-500 mt-0.5">サッカー観戦向きスコア上位</p>
          </div>
          <Link href="/venues" className="text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors">すべて見る →</Link>
        </div>
        {venues.length === 0 ? (
          <p className="text-gray-500 text-sm">店舗データを取得中です</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)}
          </div>
        )}
      </section>
    </div>
  )
}
