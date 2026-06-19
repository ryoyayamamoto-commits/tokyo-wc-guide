import Link from 'next/link'
import { MatchCard } from '@/components/match/MatchCard'
import { VenueCard } from '@/components/venue/VenueCard'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

export default async function HomePage() {
  const now = new Date().toISOString()
  const weekLater = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

  const [{ data: areasData }, { data: matchesData }, { data: venuesData }] = await Promise.all([
    supabase.from('areas').select('*').order('sort_order'),
    supabase
      .from('matches')
      .select('*, venue_matches(count)')
      .gte('kickoff_at', now)
      .lte('kickoff_at', weekLater)
      .order('kickoff_at')
      .limit(6),
    supabase
      .from('venues')
      .select('*, area:areas(*), genre:genres(*), venue_matches(count)')
      .eq('is_featured', true)
      .limit(6),
  ])

  const areas = areasData ?? []
  const matches = (matchesData ?? []).map((m: any) => ({
    ...m,
    venue_count: m.venue_matches?.[0]?.count ?? 0,
  }))
  const venues = (venuesData ?? []).map((v: any) => ({
    ...v,
    match_count: v.venue_matches?.[0]?.count ?? 0,
  }))

  return (
    <div className="space-y-16">

      {/* ヒーロー */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white px-6 py-10 md:py-14">
        {/* 背景装飾 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-red-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4 backdrop-blur-sm tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            LIVE VIEWING · TOKYO 2026
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 leading-tight">
            観たい試合を選ぶだけ。
            <span className="block text-blue-300 whitespace-nowrap">東京の観戦スポットが見つかる。</span>
          </h1>

          <p className="text-blue-200 text-base mb-8 leading-relaxed">
            スポーツバー・パブ・居酒屋など東京都内の観戦スポットを<br className="hidden md:block" />
            試合から逆引きで探せるサービスです。
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/matches">
              <Button size="lg" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-base px-8 shadow-lg border-0">
                ⚽ 試合から探す
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

      {/* 近日試合 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black tracking-tight">近日開催の試合</h2>
            <p className="text-sm text-gray-500 mt-0.5">今後7日以内に開催される試合</p>
          </div>
          <Link href="/matches" className="text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors">
            すべて見る →
          </Link>
        </div>
        {matches.length === 0 ? (
          <p className="text-gray-500 text-sm">近日開催の試合はありません</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </section>

      {/* 人気エリア */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-black tracking-tight">エリアから探す</h2>
          <p className="text-sm text-gray-500 mt-0.5">気になるエリアの観戦スポットをチェック</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {areas.map((area) => (
            <Link
              key={area.id}
              href={`/venues?area_id=${area.id}`}
              className="px-6 py-2.5 rounded-full border-2 bg-white hover:bg-blue-50 hover:border-blue-600 hover:text-blue-900 transition-all text-sm font-bold shadow-sm"
            >
              {area.name}
            </Link>
          ))}
        </div>
      </section>

      {/* おすすめ店舗 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black tracking-tight">おすすめ店舗</h2>
            <p className="text-sm text-gray-500 mt-0.5">編集部が厳選した観戦スポット</p>
          </div>
          <Link href="/venues" className="text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors">
            すべて見る →
          </Link>
        </div>
        {venues.length === 0 ? (
          <p className="text-gray-500 text-sm">おすすめ店舗はありません</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}
      </section>

    </div>
  )
}
