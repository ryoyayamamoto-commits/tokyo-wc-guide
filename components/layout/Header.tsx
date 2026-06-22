import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50 border-blue-100">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-[6px] font-black text-lg text-blue-900 tracking-tight">
          Tokyo WC Guide
          <span style={{ backgroundColor: '#16a34a', color: '#ffffff', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', letterSpacing: '0.05em' }}>
            2026
          </span>
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
