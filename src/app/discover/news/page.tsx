
import SearchBar from '@/components/SearchBar'
import { Sidebar } from '@/components/Sidebar'
import CustomFeed from '@/components/FEED/CustomFeed'
import GeneralFeed from '@/components/FEED/GeneralFeed'
import { buttonVariants } from '@/components/ui/Button'
import { getAuthSession } from '@/lib/auth'
import { Home as HomeIcon } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Home() {
  const session = await getAuthSession()

  return (
    <>
      <h1 className='font-bold text-3xl md:text-4xl'>News</h1>
      <div className='flex flex-row gap-x-4 pt-3'>
        <h3 className='font-bold text-3xl md:text-xl'>#tags</h3>
        <h3 className='font-bold text-3xl md:text-xl'>#tags</h3>
        <h3 className='font-bold text-3xl md:text-xl'>#tags</h3>
      </div>
      <div className='flex justify-center'>
  <SearchBar />
</div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-y-4 md:gap-x-4 py-6'>
      <Sidebar className='hidden md:block md:col-span-1' sidebarItems={session?.user?.sidebar || ['FEED', 'DISCUSSIONS', 'NEWS']} currentScreen={session?.user?.homeScreen || 'FEED'} />

       

        {/* discussion info */}
        

        <div className='overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last md:col-span-1'>
          <div className='bg-emerald-100  px-6 py-4'>
            <p className='font-semibold py-3 flex items-center gap-1.5 '>
              <HomeIcon className='h-4 w-4 ' />
              News
            </p>
          </div>
          <dl className='-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6'>
            <div className='flex justify-between gap-x-4 py-3'>
              <p className='text-zinc-500'>
              News 1
              </p>
            </div>
            
          </dl>
        </div>
      </div>
    </>
  )
}