"use client";
import { EllipsisIcon, Loader2 } from "lucide-react";
import {
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PostData } from "@/lib/types";
import useDeletePostMutation from "@/mutations/useDeletePostMutation";
import { toast } from "../ui/use-toast";
interface TMoreButtonProps {
  className?: string;
  post:PostData
}
export default function MoreButton({ className, post }: TMoreButtonProps) {
  const [showDialogue, setShowDialogue] = useState(false);
  const mutation = useDeletePostMutation()
  const closeModalHandler = useCallback(() => {
    setShowDialogue(false);
  },[]);
  const deletePostHandler = ()=>{
    mutation.mutate(post,
      {
        onSuccess:()=>{
          toast({
            variant:'destructive',
            description: 'Congratulations! Post deleted successfully!'
          })
          closeModalHandler()
        },
        onError:()=>{
          closeModalHandler()
        },

      }
    )
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisIcon className="size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={className} align="end">
          <DropdownMenuLabel
            className="cursor-pointer p-1"
            onClick={() => setShowDialogue(true)}
          >
            Delete
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogueMe isOpen={showDialogue} onClose={closeModalHandler} confirmHandler={deletePostHandler} loading={mutation.isPending}  />
    </>
  );
}

export function DialogueMe({
  isOpen,
  onClose,
  confirmHandler,
  loading
}: {
  isOpen: boolean;
  onClose: () => void;
  confirmHandler:()=>void, 
  loading: boolean,
}) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmHandler} disabled={loading}>{loading && <Loader2 className="animate-spin size-5 mr-2"/>}Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
