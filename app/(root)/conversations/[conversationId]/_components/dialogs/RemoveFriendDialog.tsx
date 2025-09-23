"use client"

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel'
import { useMutationState } from '@/hooks/useMutationState';
import { ConvexError } from 'convex/values';
import React, { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner';

type Props = {
    conversationId : Id<"conversations">;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const RemoveFriendDialog = ({conversationId , open , setOpen}: Props) => {

    const {mutate: removeFriend , pending} = useMutationState(api.friend.remove)


    const handleRemoveFriend = async () => {
        removeFriend({conversationId}).then(() => {
            toast.success("Friend removed")
        })
        .catch((error) => {
            toast.error(
                error instanceof ConvexError ? error.data : "Unexpected error occurred" 
                
            )
        })
    }

  return <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>
                Are you sure you want to remove this friend?
            </AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will remove the friend and delete the conversation history.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
           <AlertDialogCancel className=' cursor-pointer ' disabled={pending}>
            Cancel
           </AlertDialogCancel>
           <AlertDialogCancel disabled={pending} className='cursor-pointer bg-red-600 hover:bg-red-700 text-white' onClick={handleRemoveFriend}>
            Delete
           </AlertDialogCancel>
        </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
}

export default RemoveFriendDialog