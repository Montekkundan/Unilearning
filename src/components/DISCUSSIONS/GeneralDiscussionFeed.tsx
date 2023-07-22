import { db } from '@/lib/db'
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import DiscussionFeed from '../DiscussionFeed'

const GeneralDiscussionFeed = async () => {
  const discussion = await db.discussion.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      Creator: true,
      tags: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS, // 4 to demonstrate infinite scroll, should be higher in production
  })

  return <DiscussionFeed initialDiscussions={discussion} />
}

export default GeneralDiscussionFeed