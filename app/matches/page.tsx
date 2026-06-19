import { MatchCard } from '@/components/match/MatchCard'
import { supabase } from '@/lib/supabase'

export const metadata = {
  title: '試合一覧 | Tokyo World Cup Viewing Guide',
  description: 'ワールドカップ全試合の観戦スポット一覧',
}

export default async function MatchesPage() {
  const { data } = await supabase
    .from('matches')
    .select('*, venue_matches(count)')
    .order('kickoff_at')

  const allMatches = (data ?? []).map((m: any) => ({
    ...m,
    venue_count: m.venue_matches?.[0]?.count ?? 0,
  }))

  const japanMatches = allMatches.filter((m: any) => m.is_japan_national)
  const otherMatches = allMatches.filter((m: any) => !m.is_japan_national)

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold mb-1">試合一覧</h1>
        <p className="text-gray-500 text-sm">観たい試合を選んで、観戦できる店舗を探しましょう</p>
      </div>

      {japanMatches.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            🇯🇵 <span>日本代表戦</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {japanMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {otherMatches.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-4">🌍 その他の試合</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {allMatches.length === 0 && (
        <p className="text-gray-500 text-sm">試合データがありません</p>
      )}
    </div>
  )
}
