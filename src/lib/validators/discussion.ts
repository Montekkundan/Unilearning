import { z } from 'zod'

export const DiscussionValidator = z.object({
  name: z.string().min(3).max(21),
  description: z.string().optional(),
    tags: z.array(z.string()).optional(),
})

export const DiscussionSubscriptionValidator = z.object({
    discussionId: z.string(),
    
})

export type CreateDiscussionPayload = z.infer<typeof DiscussionValidator>
export type SubscribeToDiscussionPayload = z.infer<
  typeof DiscussionSubscriptionValidator
>