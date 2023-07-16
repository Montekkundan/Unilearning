import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export async function GET(req: Request) {
  const url = new URL(req.url)

  const session = await getAuthSession()

  let followedCommunitiesIds: string[] = []

  if (session) {
    const followedCommunities = await db.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        discussion: true,
      },
    })

    followedCommunitiesIds = followedCommunities.map((sub) => sub.discussion.id)
  }

  try {
    const { limit, page, discussionName } = z
      .object({
        limit: z.string(),
        page: z.string(),
        discussionName: z.string().nullish().optional(),
      })
      .parse({
        discussionName: url.searchParams.get('discussionName'),
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
      })

    let whereClause = {}

    if (discussionName) {
      whereClause = {
        discussion: {
          name: discussionName,
        },
      }
    } else if (session) {
      whereClause = {
        discussion: {
          id: {
            in: followedCommunitiesIds,
          },
        },
      }
    }

    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        discussion: true,
        votes: true,
        author: true,
        comments: true,
      },
      where: whereClause,
    })

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response('Could not fetch posts', { status: 500 })
  }
}