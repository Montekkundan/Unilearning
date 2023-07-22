import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    const { postId } = body

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const post = await db.post.findFirst({
      where: {
        id: postId,
        authorId: session.user.id,
      },
    })

    if (!post) {
      return new Response('Post not found or not authorized', { status: 404 })
    }

    await db.post.delete({
      where: {
        id: postId,
      },
    })

    return new Response('OK')
  } catch (error) {
    return new Response(
      'Could not delete post at this time. Please try later',
      { status: 500 }
    )
  }
}
