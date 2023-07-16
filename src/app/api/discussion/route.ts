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
    const { name, description, tags } = DiscussionValidator.parse(body)

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
        description, // Add the description here
        creatorId: session.user.id,
      },
      include: {
        tags: true, // Include the tags relation in the response
      },
    })

    // If tags are provided, associate them with the discussion
    if (tags) {
      // Assume that tags are an array of tag names
      for (const tagName of tags) {
        let tag = await db.tag.findFirst({
          where: {
            name: tagName,
          },
        })

        // If the tag does not exist, create it
        if (!tag) {
          tag = await db.tag.create({
            data: {
              name: tagName,
            },
          })
        }

        // Associate the tag with the discussion
        await db.discussionTag.create({
          data: {
            discussionId: discussion.id,
            tagId: tag.id,
          },
        })
      }
    }

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

    return new Response('Could not create discussion. Error: ' + error, { status: 500 },)
  }
}
