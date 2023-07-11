import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/Toaster'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Unilearning',
  description: 'A place to learn and share knowledge',
}

export default function RootLayout({
  children,
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
      <body className='min-h-screen pt-12 bg-slate-50 antialiased'>
      
          <Navbar />

          <div className='container max-w-7xl mx-auto h-full pt-12'>
            {children}
          </div>
        <Toaster />
      </body>
    </html>
  )
}