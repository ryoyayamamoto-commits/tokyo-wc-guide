import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tokyo World Cup Viewing Guide',
  description: '東京都内でワールドカップを観戦できるスポーツバー・パブ・居酒屋を試合から探せるサービス',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${geist.className} bg-gray-50 min-h-screen`}>
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}