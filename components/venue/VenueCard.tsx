import Link from 'next/link'
import { type Venue } from '@/types'

type Props = {
  venue: Venue
}

const CRITERIA = [
  { key: 'has_large_screen', label: '大画面' },
  { key: 'has_reservation', label: '予約可' },
  { key: 'has_all_you_can_drink', label: '飲み放題' },
  { key: 'is_near_station', label: '駅近' },
  { key: 'has_english_menu', label: '英語対応' },
] as const

export function VenueCard({ venue }: Props) {
  const score = venue.soccer_friendly_score
  const scoreColor = score >= 80 ? 'text-green-700' : score >= 60 ? 'text-yellow-600' : 'text-gray-400'

  return (
    <Link href={`/venues/${venue.id}`}>
      <div className="group border-2 rounded-2xl overflow-hidden hover:border-blue-600 hover:shadow-xl transition-all duration-200 bg-white">
        <div className="bg-gradient-to-r from-blue-950 to-blue-800 px-4 py-2.5">
          <p className="text-xs text-blue-200 font-medium truncate">
            {venue.area ?? '東京'} · スポーツバー
          </p>
        </div>
        <div className="p-4">
          <h3 className="font-black text-sm leading-tight text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
            {venue.name}
          </h3>
          {venue.address && (
            <p className="text-xs text-gray-500 mb-3 flex items-center gap-1 truncate">
              <span>📍</span>{venue.address}
            </p>
          )}
          <div className="flex flex-wrap gap-1 mb-3">
            {CRITERIA.map(({ key, label }) => {
              const active = (venue as Record<string, unknown>)[key] === true
              return (
                <span key={key} className={`text-xs px-2 py-0.5 rounded-full font-medium ${active ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-400 line-through'}`}>
                  {label}
                </span>
              )
            })}
          </div>
          <div className="border-t-2 pt-3 flex items-center justify-between">
            <span className="text-xs text-gray-500">観戦スコア</span>
            <span className={`text-lg font-black ${scoreColor}`}>
              {score}<span className="text-xs font-medium ml-0.5">pt</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
