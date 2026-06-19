import { getFlagUrl } from '@/lib/flags'

type Props = {
  teamName: string
  size?: number
}

export function FlagImage({ teamName, size = 48 }: Props) {
  const url = getFlagUrl(teamName)
  if (!url) return <span className="text-gray-400 text-3xl">🏳</span>

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={teamName}
      width={size}
      height={Math.round(size * 0.75)}
      className="rounded-sm object-cover shadow-sm"
    />
  )
}
