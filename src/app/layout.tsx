import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/Toaster'

import '@/styles/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Providers from '@/components/Providers'
import { NAME } from '@/lib/constants'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: NAME,
  description: 'A place to learn and share knowledge',
}

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={cn(
        'bg-white text-slate-900 antialiased light',
        inter.className
      )}>
      <body className='min-h-screen pt-12 bg-slate-50  antialiased'>
        <Providers>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {/* @ts-expect-error Server Component */}
          <Navbar />

          {authModal}

          <div className='container mx-auto h-full pt-12'>
            {children}
          </div>
        <Toaster />
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}