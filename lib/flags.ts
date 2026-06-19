export const TEAM_FLAGS: Record<string, string> = {
  // 日本・アジア
  'Japan': '🇯🇵', 'South Korea': '🇰🇷', 'Australia': '🇦🇺',
  'Saudi Arabia': '🇸🇦', 'Iran': '🇮🇷', 'Qatar': '🇶🇦',
  'Iraq': '🇮🇶', 'Uzbekistan': '🇺🇿', 'Indonesia': '🇮🇩',
  'China': '🇨🇳', 'China PR': '🇨🇳', 'Jordan': '🇯🇴',
  'Oman': '🇴🇲', 'Kuwait': '🇰🇼', 'UAE': '🇦🇪',
  'United Arab Emirates': '🇦🇪', 'Bahrain': '🇧🇭',
  'Palestine': '🇵🇸', 'Thailand': '🇹🇭', 'Vietnam': '🇻🇳',
  'Philippines': '🇵🇭', 'Kyrgyzstan': '🇰🇬', 'Tajikistan': '🇹🇯',
  'India': '🇮🇳', 'Singapore': '🇸🇬', 'Malaysia': '🇲🇾',
  'Myanmar': '🇲🇲', 'Nepal': '🇳🇵', 'Lebanon': '🇱🇧',
  'Syria': '🇸🇾', 'Yemen': '🇾🇪', 'Pakistan': '🇵🇰',
  'Afghanistan': '🇦🇫', 'Bangladesh': '🇧🇩', 'Sri Lanka': '🇱🇰',
  'Cambodia': '🇰🇭', 'Laos': '🇱🇦', 'Mongolia': '🇲🇳',
  'Turkmenistan': '🇹🇲', 'Kazakhstan': '🇰🇿', 'Azerbaijan': '🇦🇿',

  // ヨーロッパ
  'Germany': '🇩🇪', 'France': '🇫🇷', 'Spain': '🇪🇸',
  'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Portugal': '🇵🇹', 'Netherlands': '🇳🇱',
  'Belgium': '🇧🇪', 'Italy': '🇮🇹', 'Croatia': '🇭🇷',
  'Poland': '🇵🇱', 'Switzerland': '🇨🇭', 'Denmark': '🇩🇰',
  'Sweden': '🇸🇪', 'Norway': '🇳🇴', 'Austria': '🇦🇹',
  'Czech Republic': '🇨🇿', 'Czechia': '🇨🇿', 'Slovakia': '🇸🇰',
  'Hungary': '🇭🇺', 'Romania': '🇷🇴', 'Serbia': '🇷🇸',
  'Ukraine': '🇺🇦', 'Turkey': '🇹🇷', 'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'Wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿', 'Greece': '🇬🇷', 'Albania': '🇦🇱',
  'Slovenia': '🇸🇮', 'Finland': '🇫🇮', 'Ireland': '🇮🇪',
  'Republic of Ireland': '🇮🇪', 'Northern Ireland': '🇬🇧',
  'Bosnia and Herzegovina': '🇧🇦', 'Bulgaria': '🇧🇬',
  'Georgia': '🇬🇪', 'Armenia': '🇦🇲', 'Cyprus': '🇨🇾',
  'Kosovo': '🇽🇰', 'North Macedonia': '🇲🇰', 'Luxembourg': '🇱🇺',
  'Israel': '🇮🇱', 'Belarus': '🇧🇾', 'Lithuania': '🇱🇹',
  'Latvia': '🇱🇻', 'Estonia': '🇪🇪', 'Moldova': '🇲🇩',
  'Montenegro': '🇲🇪', 'Iceland': '🇮🇸', 'Russia': '🇷🇺',
  'Malta': '🇲🇹', 'Faroe Islands': '🇫🇴', 'Gibraltar': '🇬🇮',
  'Andorra': '🇦🇩', 'San Marino': '🇸🇲', 'Liechtenstein': '🇱🇮',

  // 南米
  'Brazil': '🇧🇷', 'Argentina': '🇦🇷', 'Colombia': '🇨🇴',
  'Uruguay': '🇺🇾', 'Chile': '🇨🇱', 'Ecuador': '🇪🇨',
  'Peru': '🇵🇪', 'Venezuela': '🇻🇪', 'Paraguay': '🇵🇾',
  'Bolivia': '🇧🇴', 'Guyana': '🇬🇾', 'Suriname': '🇸🇷',

  // 北中米カリブ
  'USA': '🇺🇸', 'United States': '🇺🇸', 'Mexico': '🇲🇽',
  'Canada': '🇨🇦', 'Costa Rica': '🇨🇷', 'Panama': '🇵🇦',
  'Honduras': '🇭🇳', 'Jamaica': '🇯🇲', 'El Salvador': '🇸🇻',
  'Guatemala': '🇬🇹', 'Cuba': '🇨🇺', 'Haiti': '🇭🇹',
  'Trinidad and Tobago': '🇹🇹', 'Nicaragua': '🇳🇮',
  'Belize': '🇧🇿', 'Curaçao': '🇨🇼', 'Barbados': '🇧🇧',

  // アフリカ
  'Morocco': '🇲🇦', 'Senegal': '🇸🇳', 'Nigeria': '🇳🇬',
  'Egypt': '🇪🇬', 'Cameroon': '🇨🇲', 'Ghana': '🇬🇭',
  'South Africa': '🇿🇦', 'Tunisia': '🇹🇳', 'Algeria': '🇩🇿',
  "Ivory Coast": '🇨🇮', "Côte d'Ivoire": '🇨🇮',
  'DR Congo': '🇨🇩', 'Congo': '🇨🇬', 'Mali': '🇲🇱',
  'Zambia': '🇿🇲', 'Zimbabwe': '🇿🇼', 'Angola': '🇦🇴',
  'Tanzania': '🇹🇿', 'Kenya': '🇰🇪', 'Ethiopia': '🇪🇹',
  'Uganda': '🇺🇬', 'Rwanda': '🇷🇼', 'Mozambique': '🇲🇿',
  'Burkina Faso': '🇧🇫', 'Guinea': '🇬🇳', 'Benin': '🇧🇯',
  'Namibia': '🇳🇦', 'Cape Verde': '🇨🇻', 'Gambia': '🇬🇲',
  'Comoros': '🇰🇲', 'Sudan': '🇸🇩', 'Libya': '🇱🇾',
  'Gabon': '🇬🇦', 'Equatorial Guinea': '🇬🇶', 'Mauritania': '🇲🇷',
  'Niger': '🇳🇪', 'Togo': '🇹🇬',

  // オセアニア
  'New Zealand': '🇳🇿', 'Fiji': '🇫🇯',
  'Papua New Guinea': '🇵🇬', 'Solomon Islands': '🇸🇧',
  'Tahiti': '🇵🇫', 'Vanuatu': '🇻🇺', 'New Caledonia': '🇳🇨',
}

export function getTeamFlag(teamName: string): string {
  return TEAM_FLAGS[teamName] ?? '🏳️'
}
