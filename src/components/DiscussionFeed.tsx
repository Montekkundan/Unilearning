'use client'

import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { FC, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import Discussion from './Discussion'
import { User } from '@prisma/client'


interface DiscussionFeedProps {
    initialDiscussions: any
}

const DiscussionFeed: FC<DiscussionFeedProps> = ({ initialDiscussions  }) => {
  const lastPostRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })
  const { data: session } = useSession()

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['infinite-query'],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/discussions?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}`

      const { data } = await axios.get(query)
      return data 
    },

    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1
      },
      initialData: { pages: [initialDiscussions ], pageParams: [1] },
    }
  )

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage() // Load more discussions when the last discussion comes into view
    }
  }, [entry, fetchNextPage])

  const discussions = data?.pages.flatMap((page) => page) ?? initialDiscussions

  return (
    <ul className='flex flex-col col-span-2 space-y-6'>
      {discussions.map((discussion: any & { creator: User }, index: number) => {
        if (index === discussions.length - 1) {
          return (
            <li key={discussion.id} ref={ref}>
              <Discussion discussion={discussion} session={session} />
            </li>
          )
        } else {
          return (
            <li key={discussion.id}>
              <Discussion discussion={discussion} session={session} />
            </li>
          )
        }
      })}

      {isFetchingNextPage && (
        <li className='flex justify-center'>
          <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
        </li>
      )}
    </ul>
  )
}

export default DiscussionFeed