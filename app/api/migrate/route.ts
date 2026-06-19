import { createServiceClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const secret = request.headers.get('x-cron-secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const db = createServiceClient()

  const updates = [
    { filter: { name: 'HUB 渋谷道玄坂店' }, data: { has_large_screen: true, has_reservation: false, has_all_you_can_drink: true, is_near_station: true, has_english_menu: true } },
    { filter: { name: 'HUB 新宿歌舞伎町店' }, data: { has_large_screen: true, has_reservation: false, has_all_you_can_drink: true, is_near_station: true, has_english_menu: true } },
    { filter: { name: 'HUB 池袋東口店' }, data: { has_large_screen: true, has_reservation: false, has_all_you_can_drink: true, is_near_station: true, has_english_menu: true } },
    { filter: { name: 'HUB 六本木店' }, data: { has_large_screen: true, has_reservation: false, has_all_you_can_drink: true, is_near_station: true, has_english_menu: true } },
    { filter: { name: 'HUB 上野店' }, data: { has_large_screen: true, has_reservation: false, has_all_you_can_drink: true, is_near_station: true, has_english_menu: true } },
    { filter: { name: 'HUB 秋葉原店' }, data: { has_large_screen: true, has_reservation: false, has_all_you_can_drink: true, is_near_station: true, has_english_menu: true } },
    { filter: { name: 'HUB 東京八重洲地下街店' }, data: { has_large_screen: true, has_reservation: false, has_all_you_can_drink: true, is_near_station: true, has_english_menu: true } },
    { filter: { name: 'HUB 有楽町店' }, data: { has_large_screen: true, has_reservation: false, has_all_you_can_drink: true, is_near_station: true, has_english_menu: true } },
    { filter: { name: 'The FooTNiK 恵比寿店' }, data: { has_large_screen: true, has_reservation: true, has_all_you_can_drink: false, is_near_station: true, has_english_menu: true } },
    { filter: { name: 'The FooTNiK 大崎店' }, data: { has_large_screen: true, has_reservation: true, has_all_you_can_drink: false, is_near_station: true, has_english_menu: true } },
    { filter: { name: 'Hobgoblin Roppongi' }, data: { has_large_screen: true, has_reservation: true, has_all_you_can_drink: false, is_near_station: true, has_english_menu: true } },
    { filter: { name: 'Hobgoblin Akihabara' }, data: { has_large_screen: true, has_reservation: true, has_all_you_can_drink: false, is_near_station: true, has_english_menu: true } },
    { filter: { name: 'スポカフェ 池袋' }, data: { has_large_screen: true, has_reservation: true, has_all_you_can_drink: true, is_near_station: true, has_english_menu: false } },
    { filter: { name: 'スリーモンキーズカフェ 新宿本店' }, data: { has_large_screen: true, has_reservation: true, has_all_you_can_drink: true, is_near_station: true, has_english_menu: false } },
    { filter: { name: 'Dining & Bar ESTADIO 渋谷' }, data: { has_large_screen: true, has_reservation: true, has_all_you_can_drink: false, is_near_station: true, has_english_menu: false } },
    { filter: { name: 'Los Cabos 新宿本店' }, data: { has_large_screen: true, has_reservation: true, has_all_you_can_drink: true, is_near_station: true, has_english_menu: false } },
    { filter: { name: 'Taproom Nakameguro (Baird Brewing)' }, data: { has_large_screen: true, has_reservation: false, has_all_you_can_drink: false, is_near_station: false, has_english_menu: true } },
    { filter: { name: 'The Aldgate 渋谷' }, data: { has_large_screen: true, has_reservation: true, has_all_you_can_drink: false, is_near_station: true, has_english_menu: true } },
    { filter: { name: 'Shibuya Failte アイリッシュパブ' }, data: { has_large_screen: true, has_reservation: true, has_all_you_can_drink: true, is_near_station: true, has_english_menu: false } },
    { filter: { name: 'Sector 7G 新宿歌舞伎町' }, data: { has_large_screen: true, has_reservation: true, has_all_you_can_drink: true, is_near_station: true, has_english_menu: true } },
    { filter: { name: 'Nano Nishi-Shinjuku サッカーバー' }, data: { has_large_screen: true, has_reservation: false, has_all_you_can_drink: false, is_near_station: false, has_english_menu: true } },
    { filter: { name: 'パブリックスタンド 池袋西口ロマンス通り店' }, data: { has_large_screen: false, has_reservation: false, has_all_you_can_drink: true, is_near_station: true, has_english_menu: false } },
    { filter: { name: 'The Public Six 六本木' }, data: { has_large_screen: true, has_reservation: true, has_all_you_can_drink: false, is_near_station: true, has_english_menu: true } },
    { filter: { name: 'Bee One 銀座' }, data: { has_large_screen: true, has_reservation: false, has_all_you_can_drink: false, is_near_station: true, has_english_menu: false } },
    { filter: { name: 'Stick & Spoon 御徒町' }, data: { has_large_screen: false, has_reservation: false, has_all_you_can_drink: false, is_near_station: true, has_english_menu: false } },
    { filter: { name: 'Dining & Bar Kitsune 渋谷' }, data: { has_large_screen: true, has_reservation: true, has_all_you_can_drink: true, is_near_station: true, has_english_menu: false } },
    { filter: { name: 'Sports Bar HERO 渋谷' }, data: { has_large_screen: true, has_reservation: true, has_all_you_can_drink: true, is_near_station: true, has_english_menu: false } },
    { filter: { name: 'FIELDS 渋谷' }, data: { has_large_screen: true, has_reservation: false, has_all_you_can_drink: false, is_near_station: true, has_english_menu: false } },
    { filter: { name: 'SGROSSO TOKYO 渋谷' }, data: { has_large_screen: true, has_reservation: true, has_all_you_can_drink: false, is_near_station: true, has_english_menu: false } },
    { filter: { name: 'BUZZ Darts & Sports 新宿' }, data: { has_large_screen: true, has_reservation: true, has_all_you_can_drink: true, is_near_station: true, has_english_menu: false } },
    { filter: { name: 'Amusement Bar POPLUS 新宿' }, data: { has_large_screen: true, has_reservation: true, has_all_you_can_drink: true, is_near_station: true, has_english_menu: false } },
    { filter: { name: 'Bar & Curry Noi 青山' }, data: { has_large_screen: true, has_reservation: false, has_all_you_can_drink: false, is_near_station: true, has_english_menu: false } },
    { filter: { name: 'The Public Red 赤坂' }, data: { has_large_screen: true, has_reservation: true, has_all_you_can_drink: false, is_near_station: true, has_english_menu: true } },
  ]

  let updated = 0
  for (const { filter, data } of updates) {
    const scoreData = {
      ...data,
      soccer_friendly_score:
        (data.has_large_screen ? 20 : 0) +
        (data.has_reservation ? 20 : 0) +
        (data.has_all_you_can_drink ? 20 : 0) +
        (data.is_near_station ? 20 : 0) +
        (data.has_english_menu ? 20 : 0),
    }
    const { error } = await db.from('venues').update(scoreData).eq('name', filter.name)
    if (!error) updated++
  }

  return NextResponse.json({ success: true, updated })
}
