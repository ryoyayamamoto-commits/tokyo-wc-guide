import { MatchCard } from '@/components/match/MatchCard'
import { supabase } from '@/lib/supabase'

export const metadata = {
  title: '試合日程 | Tokyo WC Guide',
  description: 'FIFA World Cup 2026 全試合日程',
}

type Props = {
  searchParams: Promise<{ q?: string }>
}

export default async function MatchesPage({ searchParams }: Props) {
  const { q } = await searchParams

  let query = supabase.from('matches').select('*').order('kickoff_at')
  if (q) {
    query = query.or(`home_team.ilike.%${q}%,away_team.ilike.%${q}%`)
  }

  const { data } = await query
  const allMatches = data ?? []
  const japanMatches = allMatches.filter((m) => m.is_japan_national)
  const otherMatches = allMatches.filter((m) => !m.is_japan_national)

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold mb-1">試合日程</h1>
        <p className="text-gray-500 text-sm">FIFA World Cup 2026 全試合スケジュール</p>
      </div>

      <form method="get">
        <input
          name="q"
          defaultValue={q}
          placeholder="チーム名で検索..."
          className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

      {japanMatches.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span>🇯🇵</span><span>日本代表戦</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {japanMatches.map((match) => <MatchCard key={match.id} match={match} />)}
          </div>
        </section>
      )}

      {otherMatches.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-4">🌍 その他の試合</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherMatches.map((match) => <MatchCard key={match.id} match={match} />)}
          </div>
        </section>
      )}

      {allMatches.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p>{q ? `"${q}" に一致する試合が見つかりませんでした` : '試合データを取得中です'}</p>
        </div>
      )}
    </div>
  )
}
