"use client"

import ConversationContainer from '@/components/shared/conversation/ConversationContainer'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { Loader2 } from 'lucide-react'
import React from 'react'
import Chatinput from './_components/input/Chatinput'
import Body from './_components/body/Body'
import Header from './_components/Header'

// type Props = {
//   params: Promise<{
//     conversationId: Id<"conversations">
//   }>
// }


type Props = {
  params: Promise<{
    conversationId: string;
  }>
}

const ConversationPage = async ({ params }: Props) => {
  const { conversationId } = await params;

  const conversation = useQuery(api.
    conversation.get,{ id: conversationId as Id<"conversations"> })


  if (!conversationId) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Loader2 className='h-8 w-8'/>
      </div>
    )
  }

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
      <Header 
        name={(conversation.isGroup ? conversation.name : conversation.otherMember.username) || ""}
        imageUrl={conversation.isGroup ? undefined : conversation.otherMember.imageUrl}
      />
      <Body/>
      <Chatinput/>
    </ConversationContainer>
  )
}

export default ConversationPage



