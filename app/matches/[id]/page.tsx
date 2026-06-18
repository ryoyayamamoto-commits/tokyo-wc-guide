import { notFound } from 'next/navigation'
import Link from 'next/link'
import { VenueCard } from '@/components/venue/VenueCard'
import { Badge } from '@/components/ui/badge'
import { formatKickoffDate, formatKickoffTime } from '@/lib/utils'
import { matches, areas, getVenuesForMatch } from '@/lib/data'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ area_id?: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const match = matches.find((m) => m.id === id)
  if (!match) return {}
  return {
    title: `${match.home_team} vs ${match.away_team} | Tokyo World Cup Viewing Guide`,
    description: `東京都内で${match.home_team} vs ${match.away_team}を観戦できるスポーツバー・パブ一覧`,
  }
}

export default async function MatchDetailPage({ params, searchParams }: Props) {
  const { id } = await params
  const { area_id } = await searchParams

  const match = matches.find((m) => m.id === id)
  if (!match) notFound()

  let venues = getVenuesForMatch(id)
  if (area_id) {
    venues = venues.filter((v) => v.area.id === area_id)
  }

  return (
    <div className="space-y-8">
      {/* パンくず */}
      <nav className="text-sm text-gray-500">
        <Link href="/" className="hover:underline">ホーム</Link>
        <span className="mx-2">/</span>
        <Link href="/matches" className="hover:underline">試合一覧</Link>
        <span className="mx-2">/</span>
        <span>{match.home_team} vs {match.away_team}</span>
      </nav>

      {/* 試合情報 */}
      <section className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-500">{match.competition_name}</span>
          <Badge variant="outline">{match.round}</Badge>
          {match.is_japan_national && (
            <Badge className="bg-blue-600 text-white">日本代表</Badge>
          )}
        </div>

        <div className="flex items-center justify-center gap-8 py-4">
          <div className="text-center">
            <div className="text-5xl mb-2">{match.home_team_flag}</div>
            <div className="text-lg font-bold">{match.home_team}</div>
          </div>
          <div className="text-3xl font-bold text-gray-300">vs</div>
          <div className="text-center">
            <div className="text-5xl mb-2">{match.away_team_flag}</div>
            <div className="text-lg font-bold">{match.away_team}</div>
          </div>
        </div>

        <div className="border-t pt-4 mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">日時</span>
            <p className="font-medium mt-0.5">
              {formatKickoffDate(match.kickoff_at)} {formatKickoffTime(match.kickoff_at)}
            </p>
          </div>
          {match.broadcast_channel && (
            <div>
              <span className="text-gray-500">放映チャンネル</span>
              <p className="font-medium mt-0.5">{match.broadcast_channel}</p>
            </div>
          )}
        </div>
      </section>

      {/* 観戦店舗 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">
            観戦できる店舗
            <span className="ml-2 text-green-700">{venues.length}件</span>
          </h2>
        </div>

        {/* エリア絞り込み */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Link
            href={`/matches/${id}`}
            className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
              !area_id
                ? 'bg-green-700 text-white border-green-700'
                : 'bg-white hover:border-green-400'
            }`}
          >
            すべて
          </Link>
          {areas.map((area) => (
            <Link
              key={area.id}
              href={`/matches/${id}?area_id=${area.id}`}
              className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
                area_id === area.id
                  ? 'bg-green-700 text-white border-green-700'
                  : 'bg-white hover:border-green-400'
              }`}
            >
              {area.name}
            </Link>
          ))}
        </div>

        {venues.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>該当する店舗が見つかりませんでした</p>
            <Link
              href={`/matches/${id}`}
              className="text-green-700 text-sm hover:underline mt-2 inline-block"
            >
              絞り込みを解除する
            </Link>
          </div>
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
