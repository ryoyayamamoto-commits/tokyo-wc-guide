const TEAM_COLORS: Record<string, string> = {
  // Group A
  'Mexico': '#006847',
  'South Africa': '#007A4D',
  'Czechia': '#D7141A',
  'South Korea': '#003478',
  // Group B
  'Canada': '#FF0000',
  'Bosnia-Herzegovina': '#002395',
  'United States': '#B22234',
  'Paraguay': '#D52B1E',
  // Group C
  'Qatar': '#8D1B3D',
  'Switzerland': '#FF0000',
  'Australia': '#00008B',
  'Honduras': '#0073CF',
  // Group D
  'Germany': '#000000',
  'Costa Rica': '#002B7F',
  'Japan': '#BC002D',
  'Belgium': '#000000',
  // Group E
  'Spain': '#AA151B',
  'Saudi Arabia': '#006C35',
  'Morocco': '#C1272D',
  'Cameroon': '#007A5E',
  // Group F
  'Portugal': '#006600',
  'Iran': '#239F40',
  'Uruguay': '#5EB6E4',
  'Cape Verde': '#003893',
  // Group G
  'France': '#002395',
  'Argentina': '#74ACDF',
  'Nigeria': '#008751',
  'Ecuador': '#FFD100',
  // Group H
  'Netherlands': '#AE1C28',
  'Venezuela': '#CF142B',
  'Senegal': '#00853F',
  'Norway': '#EF2B2D',
  // Group I
  'England': '#012169',
  'Ghana': '#006B3F',
  'Panama': '#DA121A',
  'Croatia': '#FF0000',
  // Group J
  'Brazil': '#009C3B',
  'Tunisia': '#E70013',
  'Serbia': '#C6363C',
  'Colombia': '#FCD116',
  // Group K
  'New Zealand': '#00247D',
  'Egypt': '#C8102E',
  'Algeria': '#006233',
  'Jordan': '#007A3D',
  // Group L
  'Austria': '#ED2939',
  'Uzbekistan': '#1EB53A',
  'Sweden': '#006AA7',
  'Iraq': '#007A3D',
}

const DEFAULT_COLOR = '#4b5563'

export function getTeamColor(teamName: string): string {
  return TEAM_COLORS[teamName] ?? DEFAULT_COLOR
}
