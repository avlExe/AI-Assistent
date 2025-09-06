import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/providers/session-provider'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'AI Помощник для Поступления | Умный выбор вуза и специальности',
  description: 'ИИ-помощник поможет выбрать подходящий вуз, проанализировать результаты ЕГЭ и получить персональные рекомендации по поступлению.',
  keywords: 'поступление, вуз, ЕГЭ, ОГЭ, ИИ помощник, выбор специальности, университет, колледж',
  authors: [{ name: 'AI Assistent Team' }],
  openGraph: {
    title: 'AI Помощник для Поступления',
    description: 'Умный выбор вуза и специальности с помощью ИИ',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning className="dark">
      <body className={inter.className}>
        <ThemeProvider defaultTheme="dark" storageKey="ai-assistent-theme">
          <AuthProvider>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
              {children}
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
