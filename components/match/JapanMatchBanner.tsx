import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FlagImage } from '@/components/match/FlagImage'
import { formatKickoffDate, formatKickoffTime } from '@/lib/utils'
import { type Match } from '@/types'

type Props = {
  match: Match
  isToday: boolean
}

export function JapanMatchBanner({ match, isToday }: Props) {
  const opponent = match.home_team === 'Japan' ? match.away_team : match.home_team

  if (isToday) {
    return (
      <section className="rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-6 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          <span className="text-sm font-bold tracking-wider uppercase">Today · 日本代表戦</span>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <FlagImage teamName="Japan" size={40} />
            <span className="font-black text-xl">日本</span>
          </div>
          <span className="text-2xl font-black opacity-60">vs</span>
          <div className="flex items-center gap-2">
            <FlagImage teamName={opponent} size={40} />
            <span className="font-black text-xl">{opponent}</span>
          </div>
        </div>
        <p className="text-red-100 text-sm mb-4">
          {formatKickoffDate(match.kickoff_at)} {formatKickoffTime(match.kickoff_at)} キックオフ
        </p>
        <Link href="/venues">
          <Button className="bg-white text-red-600 hover:bg-red-50 font-bold border-0 shadow">
            🏟️ 今日の観戦スポットを探す
          </Button>
        </Link>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border-2 border-blue-200 bg-blue-50 px-6 py-5">
      <p className="text-xs font-bold text-blue-500 tracking-wider uppercase mb-2">次の日本代表戦</p>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-2">
          <FlagImage teamName="Japan" size={32} />
          <span className="font-black text-blue-900">日本</span>
        </div>
        <span className="text-gray-400 font-bold">vs</span>
        <div className="flex items-center gap-2">
          <FlagImage teamName={opponent} size={32} />
          <span className="font-black text-blue-900">{opponent}</span>
        </div>
        <span className="ml-auto text-sm text-blue-700 font-bold whitespace-nowrap">
          {formatKickoffDate(match.kickoff_at)} {formatKickoffTime(match.kickoff_at)}
        </span>
      </div>
      <div className="flex gap-2">
        <Link href={`/matches/${match.id}`}>
          <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 font-bold">
            試合詳細
          </Button>
        </Link>
        <Link href="/venues">
          <Button size="sm" className="bg-blue-900 hover:bg-blue-800 text-white font-bold border-0">
            🏟️ 観戦スポットを探す
          </Button>
        </Link>
      </div>
    </section>
  )
}
