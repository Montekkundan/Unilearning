import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { DiscussionValidator} from '@/lib/validators/discussion'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { name } = DiscussionValidator.parse(body)

    // check if discussion already exists
    const discussionExists = await db.discussion.findFirst({
      where: {
        name,
      },
    })

    if (discussionExists) {
      return new Response('Discussion already exists', { status: 409 })
    }

    // create discussion and associate it with the user
    const discussion = await db.discussion.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    })

    // creator also has to be subscribed
    await db.subscription.create({
      data: {
        userId: session.user.id,
        discussionId: discussion.id,
      },
    })

    return new Response(discussion.name)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not create discussion' + error, { status: 500 },)
  }
}