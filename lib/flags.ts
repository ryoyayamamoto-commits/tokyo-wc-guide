// ISO 3166-1 alpha-2 country codes for flagcdn.com
export const TEAM_CODES: Record<string, string> = {
  // アジア
  'Japan': 'jp', 'South Korea': 'kr', 'Australia': 'au',
  'Saudi Arabia': 'sa', 'Iran': 'ir', 'Qatar': 'qa',
  'Iraq': 'iq', 'Uzbekistan': 'uz', 'Indonesia': 'id',
  'China': 'cn', 'China PR': 'cn', 'Jordan': 'jo',
  'Oman': 'om', 'Kuwait': 'kw', 'UAE': 'ae',
  'United Arab Emirates': 'ae', 'Bahrain': 'bh',
  'Palestine': 'ps', 'Thailand': 'th', 'Vietnam': 'vn',
  'Philippines': 'ph', 'Kyrgyzstan': 'kg', 'Tajikistan': 'tj',
  'India': 'in', 'Singapore': 'sg', 'Malaysia': 'my',
  'Myanmar': 'mm', 'Nepal': 'np', 'Lebanon': 'lb',
  'Syria': 'sy', 'Kazakhstan': 'kz', 'Azerbaijan': 'az',

  // ヨーロッパ
  'Germany': 'de', 'France': 'fr', 'Spain': 'es',
  'England': 'gb-eng', 'Portugal': 'pt', 'Netherlands': 'nl',
  'Belgium': 'be', 'Italy': 'it', 'Croatia': 'hr',
  'Poland': 'pl', 'Switzerland': 'ch', 'Denmark': 'dk',
  'Sweden': 'se', 'Norway': 'no', 'Austria': 'at',
  'Czech Republic': 'cz', 'Czechia': 'cz', 'Slovakia': 'sk',
  'Hungary': 'hu', 'Romania': 'ro', 'Serbia': 'rs',
  'Ukraine': 'ua', 'Turkey': 'tr', 'Türkiye': 'tr',
  'Scotland': 'gb-sct', 'Wales': 'gb-wls', 'Greece': 'gr',
  'Albania': 'al', 'Slovenia': 'si', 'Finland': 'fi',
  'Ireland': 'ie', 'Republic of Ireland': 'ie',
  'Northern Ireland': 'gb-nir',
  'Bosnia and Herzegovina': 'ba', 'Bulgaria': 'bg',
  'Georgia': 'ge', 'Armenia': 'am', 'Cyprus': 'cy',
  'Kosovo': 'xk', 'North Macedonia': 'mk', 'Luxembourg': 'lu',
  'Israel': 'il', 'Belarus': 'by', 'Lithuania': 'lt',
  'Latvia': 'lv', 'Estonia': 'ee', 'Moldova': 'md',
  'Montenegro': 'me', 'Iceland': 'is', 'Russia': 'ru',
  'Malta': 'mt', 'Faroe Islands': 'fo', 'Gibraltar': 'gi',
  'Andorra': 'ad', 'San Marino': 'sm', 'Liechtenstein': 'li',

  // 南米
  'Brazil': 'br', 'Argentina': 'ar', 'Colombia': 'co',
  'Uruguay': 'uy', 'Chile': 'cl', 'Ecuador': 'ec',
  'Peru': 'pe', 'Venezuela': 've', 'Paraguay': 'py',
  'Bolivia': 'bo', 'Guyana': 'gy', 'Suriname': 'sr',

  // 北中米カリブ
  'USA': 'us', 'United States': 'us', 'Mexico': 'mx',
  'Canada': 'ca', 'Costa Rica': 'cr', 'Panama': 'pa',
  'Honduras': 'hn', 'Jamaica': 'jm', 'El Salvador': 'sv',
  'Guatemala': 'gt', 'Cuba': 'cu', 'Haiti': 'ht',
  'Trinidad and Tobago': 'tt', 'Nicaragua': 'ni',
  'Belize': 'bz', 'Curaçao': 'cw', 'Barbados': 'bb',

  // アフリカ
  'Morocco': 'ma', 'Senegal': 'sn', 'Nigeria': 'ng',
  'Egypt': 'eg', 'Cameroon': 'cm', 'Ghana': 'gh',
  'South Africa': 'za', 'Tunisia': 'tn', 'Algeria': 'dz',
  "Ivory Coast": 'ci', "Côte d'Ivoire": 'ci',
  'DR Congo': 'cd', 'Congo': 'cg', 'Mali': 'ml',
  'Zambia': 'zm', 'Zimbabwe': 'zw', 'Angola': 'ao',
  'Tanzania': 'tz', 'Kenya': 'ke', 'Ethiopia': 'et',
  'Uganda': 'ug', 'Rwanda': 'rw', 'Mozambique': 'mz',
  'Burkina Faso': 'bf', 'Guinea': 'gn', 'Benin': 'bj',
  'Namibia': 'na', 'Cape Verde': 'cv', 'Gambia': 'gm',
  'Comoros': 'km', 'Sudan': 'sd', 'Libya': 'ly',
  'Gabon': 'ga', 'Mauritania': 'mr', 'Niger': 'ne',
  'Togo': 'tg',

  // オセアニア
  'New Zealand': 'nz', 'Fiji': 'fj',
  'Papua New Guinea': 'pg', 'Solomon Islands': 'sb',
  'Vanuatu': 'vu',
}

export function getTeamCode(teamName: string): string | null {
  return TEAM_CODES[teamName] ?? null
}

export function getFlagUrl(teamName: string): string {
  const code = getTeamCode(teamName)
  return code ? `https://flagcdn.com/w80/${code}.png` : ''
}

// 後方互換用
export function getTeamFlag(teamName: string): string {
  return ''
}
