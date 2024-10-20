'use client'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
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
import Image, { StaticImageData } from 'next/image';
import avatartlaceHolder from '@/assets/avatar-placeholder.png'
import { Camera } from 'lucide-react';
import Resizer from "react-image-file-resizer";
import "cropperjs/dist/cropper.css";
import CropImageDialog from '@/components/cUi/cropImageDialog';
type TEditProfileDialogProps = {
  loggedInUser: TuserDetails
}
export default function EditProfileDialog({ loggedInUser }: TEditProfileDialogProps) {
  const [croppedImage, setCroppedImage] = useState<File | Blob | null>(null);
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
    const avatarFile = croppedImage ? new File([croppedImage], `avatar_${loggedInUser?.id}.webp`) : undefined;

    mutation.mutate({values, croppedImage: avatarFile},
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
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <AvatartUrlInput setCroppedImage={setCroppedImage} src={
          croppedImage ? URL.createObjectURL(croppedImage) : (loggedInUser?.avatarUrl || avatartlaceHolder)
        } />
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

const AvatartUrlInput = ({ src, setCroppedImage }: { src: string | StaticImageData, setCroppedImage: Dispatch<SetStateAction<File | null | Blob >> }) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageToCrop , setImageToCrop] = useState<File | undefined>()
  const onImageSelect = (image: File | undefined) => {
    if (!image) return;
    Resizer.imageFileResizer(image,
      1024,
      1024,
      "WEBP",
      100,
      0,
      (uri) => {
        setImageToCrop(uri as File);
      },
      "file")
    setCroppedImage(image)
  }
  return (
    <>
      <Input ref={imageInputRef} type='file' className='sr-only hidden' accept='image/*' onChange={(e) => onImageSelect(e.target.files?.[0])} />
      <button
        type="button"
        onClick={() => imageInputRef.current?.click()}
        className="group relative flex justify-center items-center"
      >

        <Image src={src}
          alt="Avatar preview"
          width={150}
          height={150}
          className="size-32 flex-none rounded-full object-cover border group" />
        <span className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full bg-black bg-opacity-30 text-white transition-colors duration-200 group-hover:bg-opacity-25">
          <Camera size={24} />
        </span>
      </button>
      {
        imageToCrop && <CropImageDialog imageSrc={imageToCrop} setCroppedImage={setCroppedImage} onClose={()=>{setImageToCrop(undefined)}}/>
      }
    </>
  )
}
