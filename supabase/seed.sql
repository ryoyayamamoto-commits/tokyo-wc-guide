-- エリアマスタ
insert into areas (name, slug, sort_order) values
  ('渋谷', 'shibuya', 1),
  ('新宿', 'shinjuku', 2),
  ('銀座・有楽町', 'ginza', 3),
  ('六本木', 'roppongi', 4),
  ('秋葉原', 'akihabara', 5);

-- ジャンルマスタ
insert into genres (name, slug, sort_order) values
  ('スポーツバー', 'sports-bar', 1),
  ('パブ', 'pub', 2),
  ('居酒屋', 'izakaya', 3);

-- 店舗データ（10件）
insert into venues (
  name, area_id, genre_id,
  address, nearest_station,
  latitude, longitude,
  image_url, official_site_url, reservation_url,
  is_reservation_available, is_featured, description
) values
(
  'SHIBUYA SPORTS BAR GOAL',
  (select id from areas where slug='shibuya'),
  (select id from genres where slug='sports-bar'),
  '東京都渋谷区道玄坂1-2-3',
  '渋谷駅 徒歩5分',
  35.6580, 139.7016,
  'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=800',
  'https://example.com',
  'https://example.com/reserve',
  true, true,
  '渋谷最大級のスポーツバー。全30台のスクリーンでワールドカップを全試合放映。'
),
(
  'SHIBUYA PUB OFFSIDE',
  (select id from areas where slug='shibuya'),
  (select id from genres where slug='pub'),
  '東京都渋谷区渋谷2-5-8',
  '渋谷駅 徒歩7分',
  35.6590, 139.7030,
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
  'https://example.com',
  null,
  false, false,
  '英国スタイルのパブ。本場のギネスを飲みながらサッカー観戦。'
),
(
  '新宿スポーツバー EXTRA TIME',
  (select id from areas where slug='shinjuku'),
  (select id from genres where slug='sports-bar'),
  '東京都新宿区歌舞伎町1-3-5',
  '新宿駅 徒歩8分',
  35.6940, 139.7033,
  'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800',
  'https://example.com',
  'https://example.com/reserve',
  true, true,
  '新宿歌舞伎町のスポーツバー。深夜試合も朝まで営業。'
),
(
  '新宿居酒屋 ワールド',
  (select id from areas where slug='shinjuku'),
  (select id from genres where slug='izakaya'),
  '東京都新宿区西新宿2-1-4',
  '新宿駅 徒歩3分',
  35.6917, 139.6995,
  'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
  'https://example.com',
  'https://example.com/reserve',
  true, false,
  '和食を楽しみながらワールドカップ観戦。団体予約歓迎。'
),
(
  'GINZA SPORTS LOUNGE',
  (select id from areas where slug='ginza'),
  (select id from genres where slug='sports-bar'),
  '東京都中央区銀座6-10-1',
  '銀座駅 徒歩2分',
  35.6713, 139.7660,
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  'https://example.com',
  'https://example.com/reserve',
  true, true,
  '銀座の高級スポーツラウンジ。4K大型スクリーン完備。'
),
(
  '有楽町パブ THE KICK OFF',
  (select id from areas where slug='ginza'),
  (select id from genres where slug='pub'),
  '東京都千代田区有楽町2-9-18',
  '有楽町駅 徒歩1分',
  35.6750, 139.7634,
  'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800',
  'https://example.com',
  null,
  false, false,
  '有楽町駅すぐのアイルランドパブ。試合中は店内が一体となって応援。'
),
(
  '六本木スポーツバー OVERTIME',
  (select id from areas where slug='roppongi'),
  (select id from genres where slug='sports-bar'),
  '東京都港区六本木6-1-2',
  '六本木駅 徒歩4分',
  35.6627, 139.7318,
  'https://images.unsplash.com/photo-1596463059283-da257325bab8?w=800',
  'https://example.com',
  'https://example.com/reserve',
  true, true,
  '六本木の国際的スポーツバー。英語・日本語スタッフ在籍。外国人サポーターも多数来店。'
),
(
  'ROPPONGI PUB PENALTY',
  (select id from areas where slug='roppongi'),
  (select id from genres where slug='pub'),
  '東京都港区六本木7-8-3',
  '六本木駅 徒歩6分',
  35.6610, 139.7340,
  'https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=800',
  'https://example.com',
  null,
  false, false,
  '六本木のアットホームなパブ。毎試合パブリックビューイング開催。'
),
(
  '秋葉原スポーツバー MATCH DAY',
  (select id from areas where slug='akihabara'),
  (select id from genres where slug='sports-bar'),
  '東京都千代田区外神田3-2-1',
  '秋葉原駅 徒歩5分',
  35.6984, 139.7731,
  'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800',
  'https://example.com',
  'https://example.com/reserve',
  true, false,
  '秋葉原エリアのスポーツバー。ゲーマーとサッカーファンが集まる独自の空間。'
),
(
  '秋葉原居酒屋 フットボール',
  (select id from areas where slug='akihabara'),
  (select id from genres where slug='izakaya'),
  '東京都千代田区外神田5-3-9',
  '秋葉原駅 徒歩7分',
  35.6997, 139.7715,
  'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800',
  'https://example.com',
  'https://example.com/reserve',
  true, false,
  '秋葉原の気軽に入れる居酒屋。大型モニターで全試合対応。'
);

-- 試合データ（10件）
insert into matches (
  competition_name, round,
  home_team, away_team,
  home_team_flag, away_team_flag,
  kickoff_at, broadcast_channel, is_japan_national
) values
(
  'FIFA World Cup 2026', 'グループステージ',
  '日本', 'ドイツ',
  '🇯🇵', '🇩🇪',
  now() + interval '1 day' + interval '14 hours',
  'NHK BS', true
),
(
  'FIFA World Cup 2026', 'グループステージ',
  'ブラジル', 'アルゼンチン',
  '🇧🇷', '🇦🇷',
  now() + interval '1 day' + interval '18 hours',
  'DAZN', false
),
(
  'FIFA World Cup 2026', 'グループステージ',
  '日本', 'スペイン',
  '🇯🇵', '🇪🇸',
  now() + interval '4 days' + interval '10 hours',
  'NHK総合', true
),
(
  'FIFA World Cup 2026', 'グループステージ',
  'フランス', 'イングランド',
  '🇫🇷', '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  now() + interval '4 days' + interval '14 hours',
  'DAZN', false
),
(
  'FIFA World Cup 2026', 'グループステージ',
  'ポルトガル', 'モロッコ',
  '🇵🇹', '🇲🇦',
  now() + interval '5 days' + interval '9 hours',
  'DAZN', false
),
(
  'FIFA World Cup 2026', 'グループステージ',
  '日本', 'コスタリカ',
  '🇯🇵', '🇨🇷',
  now() + interval '7 days' + interval '7 hours',
  'NHK BS', true
),
(
  'FIFA World Cup 2026', 'グループステージ',
  'ドイツ', 'スペイン',
  '🇩🇪', '🇪🇸',
  now() + interval '8 days' + interval '14 hours',
  'DAZN', false
),
(
  'FIFA World Cup 2026', 'ラウンド16',
  'ブラジル', 'フランス',
  '🇧🇷', '🇫🇷',
  now() + interval '14 days' + interval '18 hours',
  'DAZN', false
),
(
  'FIFA World Cup 2026', '準々決勝',
  '日本', 'ポルトガル',
  '🇯🇵', '🇵🇹',
  now() + interval '20 days' + interval '14 hours',
  'NHK総合', true
),
(
  'FIFA World Cup 2026', '決勝',
  'ブラジル', 'アルゼンチン',
  '🇧🇷', '🇦🇷',
  now() + interval '30 days' + interval '18 hours',
  'NHK総合', false
);

-- venue_matches（放映登録 20件）
insert into venue_matches (venue_id, match_id, note)
select v.id, m.id, null
from (
  select id, row_number() over (order by created_at) as rn from venues
) v
cross join (
  select id, row_number() over (order by kickoff_at) as rn from matches
) m
where (v.rn + m.rn) % 3 != 0
limit 20;
