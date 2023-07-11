import { getAuthSession, deleteUser } from '@/lib/auth'
import { z } from 'zod'

export async function DELETE() {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    // delete user
    const deleted = await deleteUser(session.user.id)

    if (!deleted) {
      return new Response('Could not delete user at this time. Please try later', { status: 500 })
    }

    return new Response('User deleted successfully')
  } catch (error) {

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'An error occurred while deleting the user.',
      { status: 500 }
    )
  }
}
