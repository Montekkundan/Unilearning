import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

// Define sidebar validator
const SidebarValidator = z.object({
  sidebar: z.array(z.enum(['FEED', 'DISCUSSIONS', 'NEWS'])),
})

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { sidebar } = SidebarValidator.parse(body)

    // check if sidebar has at least one item
    if (!sidebar.length) {
      return new Response('Sidebar should have at least one item', { status: 400 })
    }

    // remove all existing sidebars
    await db.userSidebar.deleteMany({
      where: {
        userId: session.user.id,
      },
    });

    // create a new sidebar
    for (let item of sidebar) {
      await db.userSidebar.create({
        data: {
          sidebar: item,
          user: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });
    }

    return new Response('OK')
  } catch (error) {
    (error)

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not update sidebar at this time. Please try later',
      { status: 500 }
    )
  }
}
