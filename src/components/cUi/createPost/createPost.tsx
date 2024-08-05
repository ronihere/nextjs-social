'use client'
import React, { useTransition } from 'react'
import './styles.css'

import placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useSession } from '@/app/(main)/SessionProvider'
import UserAvatar from '../userAvatar'
import { Button } from '@/components/ui/button'
import { CreatePostAction } from './actions'

export default function CreatePost() {
  const {user} = useSession();
  const [isPending, startTransition]  = useTransition()
  const editor = useEditor({
    extensions:[
      StarterKit.configure({
        bold:false,
        italic: false,
      }),
      placeholder.configure({
        placeholder: "what's on your mind ?"
      }),
    ],
  });
  const input = editor?.getText({
    blockSeparator:'\n',
  }) || ""

  async function onSubmit() {
    startTransition(async () => {
      const {error} = await CreatePostAction(input);
      if(error)console.log(error);
    });
    
    editor?.commands.clearContent();
  }
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <div className='flex max-h-12'>
        <UserAvatar avatarUrl={user.avatarUrl || ""} className="hidden sm:inline h-full" />
        </div>
        <EditorContent
          editor={editor}
          className="max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3"
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={onSubmit}
          disabled={isPending || !input.trim()}
          className="w-full lg:w-fit min-w-20"
        >
          Post
        </Button>
      </div>
    </div>
  );
}
