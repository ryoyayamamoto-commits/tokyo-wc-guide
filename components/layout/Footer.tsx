export function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
        <p>© 2026 Tokyo World Cup Viewing Guide</p>
        <p className="mt-1">東京都内のワールドカップ観戦スポットを探すならここ</p>
      </div>
    </footer>
  )
}import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { type MatchWithVenueCount } from '@/types'
import { formatKickoffDate, formatKickoffTime } from '@/lib/utils'

type Props = {
  match: MatchWithVenueCount
}

export function MatchCard({ match }: Props) {
  return (
    <Link href={`/matches/${match.id}`}>
      <div className="border rounded-xl p-4 hover:shadow-md hover:border-green-400 transition-all bg-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">{match.competition_name}</span>
          {match.is_japan_national && (
            <Badge className="bg-blue-600 text-white text-xs">日本代表</Badge>
          )}
        </div>
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="text-center">
            <div className="text-2xl">{match.home_team_flag}</div>
            <div className="text-sm font-semibold mt-1">{match.home_team}</div>
          </div>
          <div className="text-gray-400 font-bold text-lg">vs</div>
          <div className="text-center">
            <div className="text-2xl">{match.away_team_flag}</div>
            <div className="text-sm font-semibold mt-1">{match.away_team}</div>
          </div>
        </div>
        <div className="border-t pt-2 mt-2 flex items-center justify-between text-xs text-gray-500">
          <span>
            {formatKickoffDate(match.kickoff_at)} {formatKickoffTime(match.kickoff_at)}
          </span>
          <span className="font-medium text-green-700">
            {match.venue_count}店舗で放映
          </span>
        </div>
      </div>
    </Link>
  )
}