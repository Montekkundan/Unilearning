import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "./ui/Button"



export function Sidebar({ className, sidebarItems, currentScreen  }: any) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            {sidebarItems.includes('FEED') && 
            <a
              className={buttonVariants({
                variant: "ghost",
                className:"w-full !justify-start",
              })}
              href={currentScreen === 'FEED' ? '/' : '/discover/feed'}>
               <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Feed
            </a>}
            {sidebarItems.includes('DISCUSSIONS') &&
            <a
              className={buttonVariants({
                variant: "ghost",
                className:"w-full !justify-start",
              })}
              href={currentScreen === 'DISCUSSIONS' ? '/' : '/discover/discussions'}>
                  <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
              Discussions
            </a>}
            
            {sidebarItems.includes('NEWS') &&
               <a
               className={buttonVariants({
                 variant: "ghost",
                 className:"w-full !justify-start",
               })}
               href={currentScreen === 'NEWS' ? '/' : '/discover/news'}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                 <rect width="7" height="7" x="3" y="3" rx="1" />
                 <rect width="7" height="7" x="14" y="3" rx="1" />
                 <rect width="7" height="7" x="14" y="14" rx="1" />
                 <rect width="7" height="7" x="3" y="14" rx="1" />
               </svg>
               News
             </a>
          }
          </div>
        </div>
        
      </div>
    </div>
  )
}