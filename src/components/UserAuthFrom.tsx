'use client'

import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import { FC } from 'react'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/hooks/use-toast' 
import { Icons } from './Icons'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google')
    } catch (error) {
      toast({
        title: 'There was a problem....',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex justify-center flex-col space-y-2', className)} {...props}>
      <Button
        type='button'
        size='sm'
        className='w-full'
        isLoading={isLoading}
        onClick={loginWithGoogle}>
          {isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}
      </Button>
      <Button
        type='button'
        size='sm'
        className='w-full'
        isLoading={isLoading}
        >
          {isLoading ? null : <><Icons.twitter className='h-4 w-4 mr-2' /> work in progress</>  }
      </Button>
      <Button
        type='button'
        size='sm'
        className='w-full'
        isLoading={isLoading}
        >
          {isLoading ? null : <><Icons.github className='h-4 w-4 mr-2' /> work in progress</>  }
      </Button>
    </div>
  )
}

export default UserAuthForm