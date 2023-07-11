import type { Post, Discussion, User, Vote, Comment } from '@prisma/client'

export type ExtendedPost = Post & {
  discussion: Discussion
  votes: Vote[]
  author: User
  comments: Comment[]
}