'use client'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../../../components/ui/dialog'
import { Input } from '../../../../../components/ui/input';
import { Button } from '../../../../../components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../../components/ui/form';
import { useForm } from 'react-hook-form';
import { updateUserProfileSchema, UpdateUserProfileValues } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { TuserDetails } from '../page';
import LoadingButton from '@/components/cUi/loadingButton';
import useUpdateprofileMutation from '@/mutations/useUpdateprofileMutation';
type TEditProfileDialogProps = {
  loggedInUser: TuserDetails
}
export default function EditProfileDialog({ loggedInUser }: TEditProfileDialogProps) {
  const form = useForm<UpdateUserProfileValues>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      displayName: loggedInUser?.displayName || '',
      bio: loggedInUser?.bio || ""
    },
  });
  const mutation = useUpdateprofileMutation()
  const onSubmit = async (values: UpdateUserProfileValues) => {
    console.log('here')
    mutation.mutate(values,
      {
        onSuccess: () => {
          console.log('hurray, profile updated')
        },
      },
    )
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className='ms-auto'>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>


            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your display name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input placeholder="Bio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <DialogFooter>
              <LoadingButton type='submit' loading={mutation.isPending}>Save Changes</LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
