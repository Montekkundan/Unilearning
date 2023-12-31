import Link from 'next/link'
import { Icons } from './Icons'
import { buttonVariants } from './ui/Button'
import { getAuthSession } from '@/lib/auth'
import { UserAccountNav } from './UserAccountNav'
import { ThemeToggle } from './ThemeToggle'
import { NavMenu } from './NavMenu'
import { NAME } from '@/lib/constants'


const Navbar = async () => {

  const session = await getAuthSession()
  
  
  return (
    <div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 dark:bg-black border-b border-zinc-300 z-[10] py-2'>
      <div className='container  h-full mx-auto flex items-center justify-between gap-2'>
        {/* logo */}
        <a href='/' className='flex gap-2 items-center'>
          <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6 ' />
          <p className='hidden text-zinc-700  text-sm font-medium md:block'>{NAME}</p>
        </a>

        <NavMenu />


        <div className='flex items-center justify-between gap-6'>
         <ThemeToggle />

        {/* actions */}
        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href='/sign-in' className={buttonVariants()}>
            Sign In
          </Link>
        )}
        </div>
      
      </div>
    </div>
  )
}

export default Navbar