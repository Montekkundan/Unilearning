'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { HomeScreen, User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { HomeScreenValidator } from '@/lib/validators/homescreen'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { FormField, FormItem, FormLabel } from '@/components/ui/Form'
import { Checkbox } from '@/components/ui/Checkbox'

interface HomeScreenFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, 'id' | 'homeScreen'>
}

type FormData = z.infer<typeof HomeScreenValidator>
const items = [
  {
    id: "FEED",
    label: "Feed",
  },
  {
    id: "DISCUSSIONS",
    label: "Discussions",
  },
  {
    id: "NEWS",
    label: "News",
  },
] as const

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

export function DisplayForm({ user, className, ...props }: HomeScreenFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(HomeScreenValidator),
    defaultValues: {
      homeScreen: user?.homeScreen || 'FEED',
    },
  })
  

const { mutate: updateHomeScreen, isLoading } = useMutation({
  mutationFn: async ({ homeScreen }: FormData) => {
    const payload: FormData = { homeScreen }
    const { data } = await axios.patch(`/api/homescreen/`, payload)
    return data
  },
  onError: () => {
    toast({
      title: 'Something went wrong.',
      description: 'Your homescreen was not updated. Please try again.',
      variant: 'destructive',
    })
  },
  onSuccess: () => {
    toast({
      description: 'Your homescreen has been updated.',
    })
    router.refresh()
  },
})

const { mutate: updateSidebar, isLoading: sidebarLoading } = useMutation({
  mutationFn: async (items: string[]) => {
    const { data } = await axios.patch(`/api/sidebar/`, { items })
    return data
  },
  onError: () => {
    toast({
      title: 'Something went wrong.',
      description: 'Your sidebar preferences were not updated. Please try again.',
      variant: 'destructive',
    })
  },
  onSuccess: () => {
    toast({
      description: 'Your sidebar preferences have been updated.',
    })
    router.refresh()
  },
})

const sidebarForm = useForm<z.infer<typeof FormSchema>>({
  resolver: zodResolver(FormSchema),
  defaultValues: {
    items: ["FEED"],
  },
})

const watchedHomeScreen = watch('homeScreen', user?.homeScreen || 'FEED');
function onSidebarSubmit(data: z.infer<typeof FormSchema>) {
  updateSidebar(data.items)
}
  return (
    <>
    <form
      className={cn(className)}
      onSubmit={handleSubmit((formData) => updateHomeScreen(formData))}
      {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Your homescreen</CardTitle>
          <CardDescription>
            Please select your preferred homescreen.
          </CardDescription>
        </CardHeader>
        <CardContent>
      <Select
        defaultValue={watchedHomeScreen}
        onValueChange={(value: HomeScreen) => setValue('homeScreen', value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue>{watchedHomeScreen}</SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="FEED">Feed</SelectItem>
          <SelectItem value="DISCUSSIONS">Discussions</SelectItem>
          <SelectItem value="NEWS">News</SelectItem>
        </SelectContent>
      </Select>
      {errors?.homeScreen && (
        <p className='px-1 text-xs text-red-600'>{errors.homeScreen.message}</p>
      )}
    </CardContent>
        <CardFooter>
          <Button isLoading={isLoading}>Change homescreen</Button>
        </CardFooter>
      </Card>
    </form>
    <Card>
        <CardHeader>
          <CardTitle>Sidebar preferences</CardTitle>
          <CardDescription>
            Please select the items you want to display in the sidebar.
          </CardDescription>
        </CardHeader>
        <CardContent>
  <FormProvider {...sidebarForm}> {/* This line is important */}
    <form onSubmit={sidebarForm.handleSubmit(onSidebarSubmit)}>
      {items.map((item) => (
        <FormField
          key={item.id}
          control={sidebarForm.control}
          name="items"
          render={({ field }) => {
            return (
              <FormItem
                key={item.id}
                className="flex flex-row items-start space-x-3 space-y-0"
              >
                <Checkbox
                  checked={field.value?.includes(item.id)}
                  onCheckedChange={(checked) => {
                    return checked
                      ? field.onChange([...field.value, item.id])
                      : field.onChange(
                          field.value?.filter(
                            (value) => value !== item.id
                          )
                        )
                  }}
                />
                <FormLabel className="font-normal">
                  {item.label}
                </FormLabel>
              </FormItem>
            )
          }}
        />
      ))}
      <Button type="submit" isLoading={sidebarLoading}>Update sidebar preferences</Button>
    </form>
  </FormProvider>
</CardContent>
      </Card>
    </>
  )
}
