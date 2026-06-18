import Link from 'next/link'
import Image from 'next/image'
import { type VenueWithMatchCount } from '@/types'

type Props = {
  venue: VenueWithMatchCount
}

export function VenueCard({ venue }: Props) {
  return (
    <Link href={`/venues/${venue.id}`}>
      <div className="group border-2 rounded-2xl overflow-hidden hover:border-blue-600 hover:shadow-xl transition-all duration-200 bg-white">

        {/* 画像 */}
        <div className="relative h-44 w-full overflow-hidden bg-gray-100">
          {venue.image_url ? (
            <Image
              src={venue.image_url}
              alt={venue.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl bg-blue-950">
              🏟️
            </div>
          )}

          {/* オーバーレイバッジ */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className="bg-blue-950/80 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
              {venue.area.name}
            </span>
            <span className="bg-black/50 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
              {venue.genre.name}
            </span>
          </div>

          {/* 予約可バッジ */}
          {venue.is_reservation_available && (
            <div className="absolute top-3 right-3">
              <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                予約可
              </span>
            </div>
          )}
        </div>

        {/* 情報 */}
        <div className="p-4">
          <h3 className="font-black text-sm leading-tight text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
            {venue.name}
          </h3>

          {venue.nearest_station && (
            <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
              <span>📍</span>
              {venue.nearest_station}
            </p>
          )}

          {/* 放映試合数 */}
          <div className="border-t-2 pt-3 flex items-center justify-between">
            <span className="text-xs text-gray-500">放映予定</span>
            <span className="text-lg font-black text-blue-700">
              {venue.match_count}
              <span className="text-xs font-medium ml-0.5">試合</span>
            </span>
          </div>
        </div>

      </div>
    </Link>
  )
}
