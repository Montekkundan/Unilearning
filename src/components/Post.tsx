'use client'

import { formatTimeToNow } from '@/lib/utils'
import { Post, User, Vote } from '@prisma/client'
import { MessageSquare, Trash2  } from 'lucide-react'
import Link from 'next/link'
import { FC, useRef } from 'react'
import EditorOutput from './EditorOutput'
import PostVoteClient from './post-vote/PostVoteClient'
import DeleteButton from './DeleteButton'

type PartialVote = Pick<Vote, 'type'>

interface PostProps {
  post: Post & {
    author: User
    votes: Vote[]
  }
  votesAmt: number
  discussionName: string
  currentVote?: PartialVote
  commentAmt: number
  session: any
}

const Post: FC<PostProps> = ({
  post,
  votesAmt: _votesAmt,
  currentVote: _currentVote,
  discussionName,
  commentAmt,
  session,
}) => {
  const pRef = useRef<HTMLParagraphElement>(null)

  return (
    <div className='rounded-md bg-white shadow'>
      <div className='px-6 py-4 flex justify-between'>
        <PostVoteClient
          postId={post.id}
          initialVotesAmt={_votesAmt}
          initialVote={_currentVote?.type}
        />

        <div className='w-0 flex-1'>
          <div className='max-h-40 mt-1 text-xs text-gray-500 flex justify-between'>
            <div>
            {discussionName ? (
              <>
                <a
                  className='underline text-zinc-900 text-sm underline-offset-2'
                  href={`/uni/${discussionName}`}>
                  uni/{discussionName}
                </a>
                <span className='px-1'>•</span>
              </>
            ) : null}
            <span>Posted by u/{post.author.username}</span>{' '}
            {formatTimeToNow(new Date(post.createdAt))}
            </div>
            <div>
            {post.authorId === session?.user?.id ? (
                 <DeleteButton postId={post.id}/>
              ) : null}
            </div>
          </div>
          <a href={`/uni/${discussionName}/post/${post.id}`}>
            <h1 className='text-lg font-semibold py-2 leading-6 text-gray-900'>
              {post.title}
            </h1>
          </a>
         

          <div
            className='relative text-sm max-h-40 w-full overflow-clip'
            ref={pRef}>
            <EditorOutput content={post.content} />
            {pRef.current?.clientHeight === 160 ? (
              // blur bottom if content is too long
              <div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent'></div>
            ) : null}
          </div>
        </div>
      </div>

      <div className='bg-gray-50 rounded-b-md dark:bg-[#18181b] z-20 text-sm px-4 py-4 sm:px-6'>
        <Link
          href={`/uni/${discussionName}/post/${post.id}`}
          className='w-fit flex items-center gap-2'>
          <MessageSquare className='h-4 w-4' /> {commentAmt} comments
        </Link>
      </div>
    </div>
  )
}
export default Post