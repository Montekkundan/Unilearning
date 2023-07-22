import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import PostFeed from '../PostFeed'
import { notFound } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"

const CustomFeed = async () => {
  const session = await getAuthSession()

  // only rendered if session exists, so this will not happen
  if (!session) return notFound()

  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      discussion: true,
    },
  })

  const posts = await db.post.findMany({
    where: {
      discussion: {
        name: {
          in: followedCommunities.map((sub) => sub.discussion.name),
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      discussion: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  })

  return <>
 <Tabs defaultValue="recent">
  <TabsList>
    <TabsTrigger value="recent">Recent</TabsTrigger>
    <TabsTrigger value="upvote">Most Upvoted</TabsTrigger>
  </TabsList>
  <TabsContent value="recent">
    <PostFeed initialPosts={posts} />
    </TabsContent>
  <TabsContent value="upvote">upvote.</TabsContent>
</Tabs>
  
  </> 
}

export default CustomFeed