"use client"

import ConversationContainer from '@/components/shared/conversation/ConversationContainer'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { Loader2 } from 'lucide-react'
import React, { use } from 'react'
import Chatinput from './_components/input/Chatinput'
import Body from './_components/body/Body'
import Header from './_components/Header'
import { redirect } from 'next/navigation'  // Import this for client-side redirect
import RemoveFriendDialog from './_components/dialogs/RemoveFriendDialog'

type Props = {
  params: Promise<{
    conversationId: Id<"conversations">
  }>
}

const ConversationPage = ({ params }: Props) => {
  const resolvedParams = use(params)
  const conversationId = resolvedParams.conversationId


  const [removeFriendDialogOpen , setRemoveFriendDialogOpen] = React.useState(false)
  const [deleteGroupDialogOpen , setDeleteGroupDialogOpen] = React.useState(false)
  const [leaveGroupDialogOpen , setLeaveGroupDialogOpen] = React.useState(false)
  const [callType , setCallType] = React.useState<"audio" | "video">("audio")





  // Early guard: Redirect if ID is invalid (prevents Convex query with bad arg)
  if (!conversationId || conversationId === 'undefined') {
    redirect('/conversations')  // Or wherever your list page is
  }

  const conversation = useQuery(api.conversation.get, { id: conversationId })

  if (conversation === undefined) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Loader2 className='h-8 w-8'/>
      </div>
    )
  }

  if (conversation === null) {
    return (
      <p className='w-full h-full flex items-center justify-center'>
        Conversation not found
      </p>
    )
  }

  return (
    <ConversationContainer>
      <RemoveFriendDialog 
        conversationId={conversationId}
        open={removeFriendDialogOpen}
        setOpen={setRemoveFriendDialogOpen}
      />
        
      <Header 
        name={(conversation.isGroup ? conversation.name : conversation.otherMember.username) || ""}
        imageUrl={conversation.isGroup ? undefined : conversation.otherMember.imageUrl}
        options={ conversation.isGroup ? [
          {
            label: "Leave Group",
            destructive: true,
            onClick: () => setLeaveGroupDialogOpen(true)
          },
          {
            label: "Delete Group",
            destructive: true,
            onClick: () => setDeleteGroupDialogOpen(true)
          }
        ] : [
          {
            label: "Remove Friend",
            destructive: true,
            onClick: () => setRemoveFriendDialogOpen(true)
          }
        ]}
      />
      <Body/>
      <Chatinput/>
    </ConversationContainer>
  )
}

export default ConversationPage