import { VenueCard } from '@/components/venue/VenueCard'
import Link from 'next/link'
import { venues, areas, genres } from '@/lib/data'

export const metadata = {
  title: '店舗一覧 | Tokyo World Cup Viewing Guide',
  description: '東京都内のワールドカップ観戦スポット一覧',
}

type Props = {
  searchParams: Promise<{ area_id?: string; genre_id?: string }>
}

export default async function VenuesPage({ searchParams }: Props) {
  const { area_id, genre_id } = await searchParams

  let filtered = [...venues]
  if (area_id) filtered = filtered.filter((v) => v.area.id === area_id)
  if (genre_id) filtered = filtered.filter((v) => v.genre.id === genre_id)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">店舗一覧</h1>
        <p className="text-gray-500 text-sm">東京都内のワールドカップ観戦スポット</p>
      </div>

      {/* エリア絞り込み */}
      <section>
        <p className="text-sm font-medium text-gray-600 mb-2">エリア</p>
        <div className="flex flex-wrap gap-2">
          <Link
            href={genre_id ? `/venues?genre_id=${genre_id}` : '/venues'}
            className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
              !area_id
                ? 'bg-green-700 text-white border-green-700'
                : 'bg-white hover:border-green-400'
            }`}
          >
            すべて
          </Link>
          {areas.map((area) => {
            const href = genre_id
              ? `/venues?area_id=${area.id}&genre_id=${genre_id}`
              : `/venues?area_id=${area.id}`
            return (
              <Link
                key={area.id}
                href={href}
                className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
                  area_id === area.id
                    ? 'bg-green-700 text-white border-green-700'
                    : 'bg-white hover:border-green-400'
                }`}
              >
                {area.name}
              </Link>
            )
          })}
        </div>
      </section>

      {/* ジャンル絞り込み */}
      <section>
        <p className="text-sm font-medium text-gray-600 mb-2">ジャンル</p>
        <div className="flex flex-wrap gap-2">
          <Link
            href={area_id ? `/venues?area_id=${area_id}` : '/venues'}
            className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
              !genre_id
                ? 'bg-green-700 text-white border-green-700'
                : 'bg-white hover:border-green-400'
            }`}
          >
            すべて
          </Link>
          {genres.map((genre) => {
            const href = area_id
              ? `/venues?area_id=${area_id}&genre_id=${genre.id}`
              : `/venues?genre_id=${genre.id}`
            return (
              <Link
                key={genre.id}
                href={href}
                className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
                  genre_id === genre.id
                    ? 'bg-green-700 text-white border-green-700'
                    : 'bg-white hover:border-green-400'
                }`}
              >
                {genre.name}
              </Link>
            )
          })}
        </div>
      </section>

      {/* 件数 */}
      <p className="text-sm text-gray-500">{filtered.length}件の店舗が見つかりました</p>

      {/* 店舗グリッド */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p>該当する店舗が見つかりませんでした</p>
          <Link
            href="/venues"
            className="text-green-700 text-sm hover:underline mt-2 inline-block"
          >
            絞り込みを解除する
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      )}
    </div>
  )
}
