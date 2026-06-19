import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatKickoffDate, formatKickoffTime } from '@/lib/utils'
import { FlagImage } from '@/components/match/FlagImage'
import { supabase } from '@/lib/supabase'

type Props = {
  params: Promise<{ id: string }>
}

export default async function MatchDetailPage({ params }: Props) {
  const { id } = await params
  const { data: match } = await supabase.from('matches').select('*').eq('id', id).single()
  if (!match) notFound()

  const isLive = match.status === 'live'
  const isFinished = match.status === 'finished'

  return (
    <div className="space-y-8">
      <nav className="text-sm text-gray-500">
        <Link href="/" className="hover:underline">ホーム</Link>
        <span className="mx-2">/</span>
        <Link href="/matches" className="hover:underline">試合日程</Link>
        <span className="mx-2">/</span>
        <span>{match.home_team} vs {match.away_team}</span>
      </nav>

      <section className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-sm text-gray-500">{match.competition}</span>
          <Badge variant="outline">{match.stage}</Badge>
          {match.is_japan_national && <Badge className="bg-blue-600 text-white">日本代表</Badge>}
          {isLive && <Badge className="bg-red-600 text-white animate-pulse">LIVE</Badge>}
          {isFinished && <Badge variant="secondary">終了</Badge>}
        </div>

        <div className="flex items-center justify-center gap-8 py-6">
          <div className="text-center">
            <div className="flex justify-center mb-3"><FlagImage teamName={match.home_team} size={72} /></div>
            <div className="text-lg font-bold">{match.home_team}</div>
          </div>
          <div className="text-center">
            {isFinished || isLive ? (
              <div className="text-4xl font-black text-gray-800">
                {match.home_score ?? 0} - {match.away_score ?? 0}
              </div>
            ) : (
              <div className="text-3xl font-bold text-gray-300">vs</div>
            )}
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-3"><FlagImage teamName={match.away_team} size={72} /></div>
            <div className="text-lg font-bold">{match.away_team}</div>
          </div>
        </div>

        <div className="border-t pt-4 mt-2 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">日時</span>
            <p className="font-medium mt-0.5">{formatKickoffDate(match.kickoff_at)} {formatKickoffTime(match.kickoff_at)}</p>
          </div>
          <div>
            <span className="text-gray-500">ステージ</span>
            <p className="font-medium mt-0.5">{match.stage}</p>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
        <p className="font-bold text-blue-900 mb-2">この試合を観戦できるスポットを探す</p>
        <p className="text-sm text-blue-700 mb-4">東京都内のサッカー観戦向き店舗を検索できます</p>
        <Link href="/venues">
          <Button className="bg-blue-900 hover:bg-blue-800 text-white font-bold">
            🏟️ 店舗を探す
          </Button>
        </Link>
      </section>
    </div>
  )
}
