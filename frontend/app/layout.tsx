import { Inter } from 'next/font/google'
import './globals.css'
import QueryProvider from './components/QueryProvider'
import { APP_CONFIG } from '@/constants'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: `${APP_CONFIG.NAME} - Survey Swarm Dashboard`,
  description: 'Automated survey completion system dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}