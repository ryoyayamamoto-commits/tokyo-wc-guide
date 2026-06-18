import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50 border-blue-100">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-black text-lg text-blue-900 tracking-tight">
          ⚽ Tokyo WC Guide
        </Link>
        <nav className="flex gap-6 text-sm font-bold">
          <Link href="/matches" className="text-gray-600 hover:text-blue-900 transition-colors">
            試合一覧
          </Link>
          <Link href="/venues" className="text-gray-600 hover:text-blue-900 transition-colors">
            店舗一覧
          </Link>
        </nav>
      </div>
    </header>
  )
}
