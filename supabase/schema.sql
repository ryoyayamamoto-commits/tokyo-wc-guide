-- areas（エリアマスタ）
create table areas (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- genres（ジャンルマスタ）
create table genres (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- venues（店舗）
create table venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  area_id uuid not null references areas(id),
  genre_id uuid not null references genres(id),
  address text not null,
  nearest_station text,
  latitude numeric(10,7),
  longitude numeric(10,7),
  image_url text,
  official_site_url text,
  reservation_url text,
  is_reservation_available boolean not null default false,
  is_featured boolean not null default false,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on venues(area_id);
create index on venues(genre_id);
create index on venues(is_featured);

-- matches（試合）
create table matches (
  id uuid primary key default gen_random_uuid(),
  competition_name text not null,
  round text not null,
  home_team text not null,
  away_team text not null,
  home_team_flag text,
  away_team_flag text,
  kickoff_at timestamptz not null,
  broadcast_channel text,
  is_japan_national boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on matches(kickoff_at);
create index on matches(is_japan_national);

-- venue_matches（店舗×試合の放映登録）
create table venue_matches (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references venues(id) on delete cascade,
  match_id uuid not null references matches(id) on delete cascade,
  note text,
  created_at timestamptz not null default now(),
  unique(venue_id, match_id)
);

create index on venue_matches(venue_id);
create index on venue_matches(match_id);
