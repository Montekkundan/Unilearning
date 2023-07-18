import { z } from 'zod'
export const HomeScreenValidator = z.object({
    homeScreen: z.enum(['FEED', 'DISCUSSIONS', 'NEWS']),
  })