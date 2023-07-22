import { db } from '@/lib/db'
import { z } from 'zod'

export async function GET(req: Request) {
  const url = new URL(req.url)



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
    } 

    const discussions = await db.discussion.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Creator: true,
        tags: true,
      },
      where: whereClause,
    })

    return new Response(JSON.stringify(discussions))
  } catch (error) {
    return new Response('Could not fetch discussions', { status: 500 })
  }
}