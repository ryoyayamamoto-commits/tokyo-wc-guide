import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { type MatchWithVenueCount } from '@/types'
import { formatKickoffDate, formatKickoffTime } from '@/lib/utils'

type Props = {
  match: MatchWithVenueCount
}

export function MatchCard({ match }: Props) {
  return (
    <Link href={`/matches/${match.id}`}>
      <div className="group relative border-2 rounded-2xl overflow-hidden hover:border-blue-600 hover:shadow-xl transition-all duration-200 bg-white">

        {/* 日本代表バッジ */}
        {match.is_japan_national && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              🇯🇵 日本代表
            </span>
          </div>
        )}

        {/* 上部：大会名・ラウンド */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-800 px-4 py-2.5">
          <p className="text-xs text-green-200 font-medium tracking-wide">
            {match.competition_name} · {match.round}
          </p>
        </div>

        {/* 中部：対戦カード */}
        <div className="px-4 py-5">
          <div className="flex items-center justify-between gap-2">
            {/* ホーム */}
            <div className="flex-1 text-center">
              <div className="text-4xl mb-1">{match.home_team_flag}</div>
              <div className="font-black text-sm tracking-tight">{match.home_team}</div>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center gap-1 px-2">
              <span className="text-xs font-bold text-gray-400 tracking-widest">VS</span>
              <div className="w-px h-8 bg-gray-200" />
            </div>

            {/* アウェイ */}
            <div className="flex-1 text-center">
              <div className="text-4xl mb-1">{match.away_team_flag}</div>
              <div className="font-black text-sm tracking-tight">{match.away_team}</div>
            </div>
          </div>
        </div>

        {/* 下部：日時・放映店舗数 */}
        <div className="border-t-2 px-4 py-3 flex items-center justify-between bg-gray-50 group-hover:bg-blue-50 transition-colors">
          <div>
            <p className="text-xs text-gray-500 font-medium">
              {formatKickoffDate(match.kickoff_at)}
            </p>
            <p className="text-sm font-black text-gray-800">
              {formatKickoffTime(match.kickoff_at)} KO
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">観戦スポット</p>
            <p className="text-lg font-black text-blue-700">
              {match.venue_count}<span className="text-xs font-medium ml-0.5">店舗</span>
            </p>
          </div>
        </div>

      </div>
    </Link>
  )
}
