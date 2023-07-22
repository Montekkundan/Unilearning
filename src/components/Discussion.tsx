'use client'

import { formatTimeToNow } from '@/lib/utils'
import { Discussion, User } from '@prisma/client'
import { FC, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactFragment, ReactPortal } from 'react'

import DeleteButton from './DeleteButton'



interface DiscussionProps {
    discussion: Discussion  & { Creator: User } & { tags: any }
    session: any
    
  }

const Dicussion: FC<DiscussionProps> = ({
    discussion,
  session,
}) => {

  return (
    <div className='rounded-md bg-white shadow'>
      <div className='px-6 py-4 flex justify-between'>
        <div className='w-0 flex-1'>
          <div className='max-h-40 mt-1 text-xs text-gray-500 flex justify-between'>
            <div>
            {discussion.name ? (
              <>
                <a
                  className='underline text-zinc-900 text-sm underline-offset-2'
                  href={`/uni/${discussion.name}`}>
                  uni/{discussion.name}
                </a>
                <span className='px-1'>•</span>
              </>
            ) : null}
            <span>Posted by u/{discussion.Creator.username}</span>{' '}
            {formatTimeToNow(new Date(discussion.createdAt))}
            </div>
            <div>
            {discussion.creatorId === session?.user?.id ? (
                 <DeleteButton postId={discussion.id}/>
              ) : null}
            </div>
          </div>
          <a href={`/uni/${discussion.name}`}>
            <h1 className='text-lg font-semibold py-2 leading-6 text-gray-900'>
            {discussion.name.replace(/-/g, " ")}
            </h1>
          </a>
          <div>
            <span>{discussion.description}</span>
            {discussion.tags.length > 0 ? (
    discussion.tags.map((discussionTag: { tag: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | PromiseLikeOfReactNode | null | undefined } }) => (
      <span key={discussionTag.tag.id} className='bg-blue-100 text-blue-500 rounded p-1 text-xs'>
       tags: {discussionTag.tag.name}
      </span>
    ))
  ) : (
    <dd className='text-gray-700 text-sm'> tags: No tags.</dd>
  )}
          </div>
         
        </div>
      </div>
    </div>
  )
}
export default Dicussion