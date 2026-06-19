-- Tokyo Sports Bars Seed Data
-- Run this in the Supabase SQL Editor

INSERT INTO venues (name, address, area, latitude, longitude, website_url, google_maps_url, phone, opening_hours, soccer_friendly_score, is_active)
VALUES

-- ========== 恵比寿 ==========
(
  'The FooTNiK 恵比寿店',
  '東京都渋谷区恵比寿1-11-2 朝日ビル1F',
  '恵比寿',
  35.6449, 139.7159,
  'https://footnik.com/',
  'https://www.google.com/maps/search/?api=1&query=35.6449,139.7159',
  '03-5795-0144',
  '月〜金 15:00〜翌1:00 / 土日祝 12:00〜翌1:00',
  90,
  true
),
(
  'Taproom Nakameguro (Baird Brewing)',
  '東京都目黒区上目黒2-1-3',
  '恵比寿',
  35.6440, 139.7052,
  'https://bairdbeer.com/en/taprooms/',
  'https://www.google.com/maps/search/?api=1&query=35.6440,139.7052',
  '03-3711-5191',
  '月〜木 17:00〜23:00 / 金 17:00〜翌0:00 / 土日 12:00〜翌0:00',
  65,
  true
),

-- ========== 渋谷 ==========
(
  'Dining & Bar ESTADIO 渋谷',
  '東京都渋谷区宇田川町28-3 みかわやビル2F',
  '渋谷',
  35.6603, 139.6985,
  'https://www.kamo-soccer.co.jp/estadio/',
  'https://www.google.com/maps/search/?api=1&query=35.6603,139.6985',
  '03-6455-2557',
  '月〜土 11:00〜23:30 / 日・祝 11:00〜22:30',
  85,
  true
),
(
  'The Aldgate 渋谷',
  '東京都渋谷区渋谷1-7-5 アミューズビル2F',
  '渋谷',
  35.6571, 139.7044,
  'http://www.the-aldgate.com/',
  'https://www.google.com/maps/search/?api=1&query=35.6571,139.7044',
  '03-3406-1980',
  '月〜金 18:00〜23:30 / 土日祝 17:00〜23:30',
  70,
  true
),
(
  'HUB 渋谷道玄坂店',
  '東京都渋谷区道玄坂2-6-17 渋東シネタワー3F',
  '渋谷',
  35.6591, 139.6978,
  'https://www.pub-hub.com/',
  'https://www.google.com/maps/search/?api=1&query=35.6591,139.6978',
  '03-3461-2744',
  '月〜木・日 11:30〜翌1:00 / 金土祝前 11:30〜翌3:00',
  80,
  true
),
(
  'Shibuya Failte アイリッシュパブ',
  '東京都渋谷区道玄坂1-5-2 渋谷SEDEビル5F',
  '渋谷',
  35.6595, 139.7020,
  'https://www.failte-shibuya.com/',
  'https://www.google.com/maps/search/?api=1&query=35.6595,139.7020',
  '050-3468-2567',
  '月〜土 17:30〜翌2:00 / 日祝 15:00〜23:00',
  72,
  true
),

-- ========== 新宿 ==========
(
  'HUB 新宿歌舞伎町店',
  '東京都新宿区歌舞伎町1-2-9 ハウスオブドラゴンビル3F',
  '新宿',
  35.6940, 139.7036,
  'https://www.pub-hub.com/',
  'https://www.google.com/maps/search/?api=1&query=35.6940,139.7036',
  '03-3205-0994',
  '月〜木・日 11:30〜翌1:00 / 金土祝前 11:30〜翌3:00',
  80,
  true
),
(
  'スリーモンキーズカフェ 新宿本店',
  '東京都新宿区新宿3-28-3 B1F',
  '新宿',
  35.6899, 139.6990,
  'https://www.3monkeys.jp/',
  'https://www.google.com/maps/search/?api=1&query=35.6899,139.6990',
  '03-5269-3737',
  '月〜木・日 17:00〜翌2:00 / 金土 17:00〜翌4:00',
  78,
  true
),
(
  'Los Cabos 新宿本店',
  '東京都新宿区新宿3-30-11 パセラリゾーツ新宿8F',
  '新宿',
  35.6891, 139.7003,
  'https://www.pasela.co.jp/shop/shinjuku/sport/',
  'https://www.google.com/maps/search/?api=1&query=35.6891,139.7003',
  '03-5315-8600',
  '月〜金 17:00〜翌5:00 / 土日祝 15:00〜翌5:00',
  75,
  true
),
(
  'Sector 7G 新宿歌舞伎町',
  '東京都新宿区歌舞伎町1-7-7 5F',
  '新宿',
  35.6944, 139.7016,
  NULL,
  'https://www.google.com/maps/search/?api=1&query=35.6944,139.7016',
  '03-6273-2330',
  '月〜木 18:00〜翌3:00 / 金土 18:00〜翌5:00 / 日 18:00〜翌1:00',
  68,
  true
),
(
  'Nano Nishi-Shinjuku サッカーバー',
  '東京都新宿区西新宿7-22-40',
  '新宿',
  35.6908, 139.6907,
  NULL,
  'https://www.google.com/maps/search/?api=1&query=35.6908,139.6907',
  NULL,
  '月〜土 18:00〜翌3:00 / 日 16:00〜翌1:00',
  72,
  true
),

-- ========== 池袋 ==========
(
  'HUB 池袋東口店',
  '東京都豊島区東池袋1-15-1 Brillia Tower池袋B1F',
  '池袋',
  35.7295, 139.7141,
  'https://www.pub-hub.com/',
  'https://www.google.com/maps/search/?api=1&query=35.7295,139.7141',
  '03-5960-3520',
  '月〜木・日 11:30〜翌1:00 / 金土祝前 11:30〜翌3:00',
  80,
  true
),
(
  'スポカフェ 池袋',
  '東京都豊島区南池袋1-24-1 ヒューマックスパビリオン6F',
  '池袋',
  35.7298, 139.7110,
  'https://www.spocafe.jp/',
  'https://www.google.com/maps/search/?api=1&query=35.7298,139.7110',
  '03-6907-2411',
  '月〜金 17:00〜翌2:00 / 土日祝 12:00〜翌2:00',
  85,
  true
),
(
  'パブリックスタンド 池袋西口ロマンス通り店',
  '東京都豊島区西池袋1-5-4',
  '池袋',
  35.7291, 139.7087,
  'https://publicstand.jp/',
  'https://www.google.com/maps/search/?api=1&query=35.7291,139.7087',
  '03-6914-2441',
  '24時間営業（年中無休）',
  65,
  true
),

-- ========== 六本木 ==========
(
  'Hobgoblin Roppongi',
  '東京都港区六本木3-16-33 六本木プラザビル1F',
  '六本木',
  35.6629, 139.7300,
  'https://www.hobgoblin.jp/',
  'https://www.google.com/maps/search/?api=1&query=35.6629,139.7300',
  '03-3568-1280',
  '月〜木 17:00〜翌0:00 / 金 17:00〜翌1:00 / 土 12:00〜翌1:00 / 日 12:00〜翌0:00',
  82,
  true
),
(
  'The Public Six 六本木',
  '東京都港区六本木5-2-1 ビンテージ芋洗坂1F',
  '六本木',
  35.6629, 139.7293,
  NULL,
  'https://www.google.com/maps/search/?api=1&query=35.6629,139.7293',
  '03-5411-0011',
  '月〜土 17:00〜翌4:00 / 日祝 14:00〜翌0:00',
  78,
  true
),
(
  'HUB 六本木店',
  '東京都港区六本木3-15-21 六本木プラザビル2F',
  '六本木',
  35.6636, 139.7315,
  'https://www.pub-hub.com/',
  'https://www.google.com/maps/search/?api=1&query=35.6636,139.7315',
  '03-5410-4980',
  '月〜木・日 11:30〜翌1:00 / 金土祝前 11:30〜翌3:00',
  80,
  true
),

-- ========== 上野 ==========
(
  'HUB 上野店',
  '東京都台東区上野6-8-1',
  '上野',
  35.7098, 139.7745,
  'https://www.pub-hub.com/',
  'https://www.google.com/maps/search/?api=1&query=35.7098,139.7745',
  '03-5826-5522',
  '月〜木・日 11:30〜翌1:00 / 金土祝前 11:30〜翌3:00',
  80,
  true
),
(
  'Stick & Spoon 御徒町',
  '東京都台東区上野5-5-5',
  '上野',
  35.7095, 139.7753,
  NULL,
  'https://www.google.com/maps/search/?api=1&query=35.7095,139.7753',
  NULL,
  '月〜土 17:00〜翌1:00 / 日 16:00〜翌0:00',
  60,
  true
),

-- ========== 秋葉原 ==========
(
  'HUB 秋葉原店',
  '東京都千代田区外神田4-7-7 第2東ビル2F',
  '秋葉原',
  35.6984, 139.7731,
  'https://www.pub-hub.com/',
  'https://www.google.com/maps/search/?api=1&query=35.6984,139.7731',
  '03-5297-2001',
  '月〜木・日 11:30〜翌1:00 / 金土祝前 11:30〜翌3:00',
  80,
  true
),
(
  'Hobgoblin Akihabara',
  '東京都千代田区神田練塀町44-4 秋葉原クロスフィールド1F',
  '秋葉原',
  35.6984, 139.7742,
  'https://www.hobgoblin.jp/',
  'https://www.google.com/maps/search/?api=1&query=35.6984,139.7742',
  '03-5209-1671',
  '月〜木 11:30〜翌0:00 / 金土祝前 11:30〜翌1:00 / 日祝 11:30〜23:00',
  75,
  true
),

-- ========== 品川 ==========
(
  'The FooTNiK 大崎店',
  '東京都品川区大崎1-2-12 ThinkPark Tower1F',
  '品川',
  35.6204, 139.7280,
  'https://footnik.com/',
  'https://www.google.com/maps/search/?api=1&query=35.6204,139.7280',
  '03-6420-0965',
  '月〜金 11:00〜翌1:00 / 土日祝 10:00〜翌1:00',
  90,
  true
),

-- ========== 東京駅 ==========
(
  'HUB 東京八重洲地下街店',
  '東京都中央区八重洲2-1 八重洲地下街',
  '東京駅',
  35.6812, 139.7700,
  'https://www.pub-hub.com/',
  'https://www.google.com/maps/search/?api=1&query=35.6812,139.7700',
  '03-3274-7700',
  '月〜木・日 11:30〜翌1:00 / 金土祝前 11:30〜翌3:00',
  80,
  true
),
(
  'Bee One 銀座',
  '東京都中央区銀座6-3-2 ギャラリーセンタービルB1F',
  '東京駅',
  35.6737, 139.7619,
  NULL,
  'https://www.google.com/maps/search/?api=1&query=35.6737,139.7619',
  '03-6263-9007',
  '月〜金 17:00〜翌5:00 / 土日祝 14:00〜翌5:00',
  70,
  true
),
(
  'HUB 有楽町店',
  '東京都千代田区有楽町1-7-1 有楽町電気ビルB1F',
  '東京駅',
  35.6752, 139.7635,
  'https://www.pub-hub.com/',
  'https://www.google.com/maps/search/?api=1&query=35.6752,139.7635',
  '03-6256-9771',
  '月〜木・日 11:30〜翌1:00 / 金土祝前 11:30〜翌3:00',
  80,
  true
);
