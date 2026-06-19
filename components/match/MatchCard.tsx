import Link from 'next/link'
import { type Match } from '@/types'
import { formatKickoffDate, formatKickoffTime } from '@/lib/utils'
import { FlagImage } from '@/components/match/FlagImage'

type Props = {
  match: Match
  highlight?: boolean
}

export function MatchCard({ match, highlight }: Props) {
  const isLive = match.status === 'live'
  const isFinished = match.status === 'finished'

  return (
    <Link href={`/matches/${match.id}`}>
      <div className={`group relative border-2 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-200 bg-white ${highlight ? 'border-red-400 hover:border-red-600' : 'hover:border-blue-600'}`}>
        {match.is_japan_national && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              日本代表
            </span>
          </div>
        )}
        {isLive && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow animate-pulse">
              LIVE
            </span>
          </div>
        )}
        <div className="bg-gradient-to-r from-blue-950 to-blue-800 px-4 py-2.5">
          <p className="text-xs text-blue-200 font-medium tracking-wide truncate">
            {match.competition} · {match.stage}
          </p>
        </div>
        <div className="px-4 py-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 text-center">
              <div className="flex justify-center mb-2"><FlagImage teamName={match.home_team} size={48} /></div>
              <div className="font-black text-sm tracking-tight">{match.home_team}</div>
            </div>
            <div className="flex flex-col items-center gap-1 px-2">
              {isFinished || isLive ? (
                <div className="text-xl font-black text-gray-800">
                  {match.home_score ?? 0} - {match.away_score ?? 0}
                </div>
              ) : (
                <>
                  <span className="text-xs font-bold text-gray-400 tracking-widest">VS</span>
                  <div className="w-px h-8 bg-gray-200" />
                </>
              )}
            </div>
            <div className="flex-1 text-center">
              <div className="flex justify-center mb-2"><FlagImage teamName={match.away_team} size={48} /></div>
              <div className="font-black text-sm tracking-tight">{match.away_team}</div>
            </div>
          </div>
        </div>
        <div className="border-t-2 px-4 py-3 flex items-center justify-between bg-gray-50 group-hover:bg-blue-50 transition-colors">
          <div>
            <p className="text-xs text-gray-500 font-medium">{formatKickoffDate(match.kickoff_at)}</p>
            <p className="text-sm font-black text-gray-800">{formatKickoffTime(match.kickoff_at)} KO</p>
          </div>
          {isFinished && (
            <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">終了</span>
          )}
        </div>
      </div>
    </Link>
  )
}
