import { z } from 'zod'

export const DeltePostValidator = z.object({
  postId: z.string()
})

export type DeleteRequest = z.infer<typeof DeltePostValidator>