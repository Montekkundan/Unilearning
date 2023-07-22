import { FC } from 'react'
import { Trash2 } from 'lucide-react'
import axios, { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { DeleteRequest } from '@/lib/validators/delete'
import { useCustomToasts } from '@/hooks/use-custom-toasts'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

interface DeleteButtonProps {
  postId: string
}

const DeleteButton: FC<DeleteButtonProps> = ({ postId }) => {
    const { loginToast } = useCustomToasts()
    const router = useRouter()
    const { mutate: deletepost } = useMutation({
        mutationFn: async ({ postId }: DeleteRequest) => {
    
          const { data } = await axios.delete(
            `/api/discussion/post/delete?postId=${postId}`
          )
          return data
        },
    
        onError: (err) => {
          if (err instanceof AxiosError) {
            if (err.response?.status === 401) {
              return loginToast()
            }
          }
    
          return toast({
            title: 'Something went wrong.',
            description: "Post wasn't deleted successfully. Please try again.",
            variant: 'destructive',
          })
        },
        onSuccess: () => {
          router.refresh()
        },
      })

  return <Trash2 className='h-6 w-6 text-red-600' onClick={() => deletepost({ postId })} />
}

export default DeleteButton
