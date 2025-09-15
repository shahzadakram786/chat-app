'use client'

import ConversationContainer from '@/components/shared/conversation/ConversationContainer'
import ConversationFallback from '@/components/shared/conversation/ConversationFallback'
import ItemList from '@/components/shared/item-list/ItemList'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { Loader2 } from 'lucide-react'
import React, { ReactNode } from 'react'
import DMConversationItem from './_components/DMConversationItem'

interface ConversationsLayoutProps {
  children: ReactNode
}

const ConversationsLayout = ({ children }: ConversationsLayoutProps) => {
  const conversations = useQuery(api.conversations.get)
  
  return (
    <>
      <ItemList title="Conversations">
        {conversations ? (
          conversations.length === 0 ? (
            <p className="w-full h-full flex items-center justify-center">
              No Conversation Found
            </p>
          ) : (
            conversations.map((conversationData) => {
              return conversationData.conversation.isGroup ? null : (
                <DMConversationItem 
                  key={conversationData.conversation._id} 
                  id={conversationData.conversation._id}
                  username={conversationData.otherMember?.username || ""}
                  imageUrl={conversationData.otherMember?.imageUrl || ""}
                />
              )
            })
          )
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </ItemList>
      {children}
    </>
  )
}

export default ConversationsLayout