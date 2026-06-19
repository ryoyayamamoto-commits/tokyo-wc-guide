import { VenueCard } from '@/components/venue/VenueCard'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export const metadata = {
  title: '店舗一覧 | Tokyo WC Guide',
  description: '東京都内のサッカー観戦スポット一覧',
}

const AREAS = ['渋谷', '新宿', '池袋', '六本木', '恵比寿', '上野', '秋葉原', '品川', '東京駅']

type Props = {
  searchParams: Promise<{ area?: string; sort?: string }>
}

export default async function VenuesPage({ searchParams }: Props) {
  const { area, sort } = await searchParams

  let query = supabase.from('venues').select('*').eq('is_active', true)
  if (area) query = query.eq('area', area)

  const ascending = sort === 'name'
  query = sort === 'name'
    ? query.order('name')
    : query.order('soccer_friendly_score', { ascending: false })

  const { data } = await query
  const venues = data ?? []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">店舗一覧</h1>
        <p className="text-gray-500 text-sm">東京都内のサッカー観戦スポット</p>
      </div>

      {/* エリア絞り込み */}
      <section>
        <p className="text-sm font-medium text-gray-600 mb-2">エリア</p>
        <div className="flex flex-wrap gap-2">
          <Link href={sort ? `/venues?sort=${sort}` : '/venues'}
            className={`px-4 py-1.5 rounded-full text-sm border transition-all ${!area ? 'bg-blue-900 text-white border-blue-900' : 'bg-white hover:border-blue-400'}`}>
            すべて
          </Link>
          {AREAS.map((a) => (
            <Link key={a} href={`/venues?area=${encodeURIComponent(a)}${sort ? `&sort=${sort}` : ''}`}
              className={`px-4 py-1.5 rounded-full text-sm border transition-all ${area === a ? 'bg-blue-900 text-white border-blue-900' : 'bg-white hover:border-blue-400'}`}>
              {a}
            </Link>
          ))}
        </div>
      </section>

      {/* ソート */}
      <section>
        <p className="text-sm font-medium text-gray-600 mb-2">並び順</p>
        <div className="flex gap-2">
          <Link href={area ? `/venues?area=${encodeURIComponent(area)}` : '/venues'}
            className={`px-4 py-1.5 rounded-full text-sm border transition-all ${sort !== 'name' ? 'bg-blue-900 text-white border-blue-900' : 'bg-white hover:border-blue-400'}`}>
            観戦向きスコア順
          </Link>
          <Link href={`/venues?${area ? `area=${encodeURIComponent(area)}&` : ''}sort=name`}
            className={`px-4 py-1.5 rounded-full text-sm border transition-all ${sort === 'name' ? 'bg-blue-900 text-white border-blue-900' : 'bg-white hover:border-blue-400'}`}>
            名前順
          </Link>
        </div>
      </section>

      <p className="text-sm text-gray-500">{venues.length}件の店舗が見つかりました</p>

      {venues.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p>該当する店舗が見つかりませんでした</p>
          <Link href="/venues" className="text-blue-700 text-sm hover:underline mt-2 inline-block">絞り込みを解除する</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)}
        </div>
      )}
    </div>
  )
}
