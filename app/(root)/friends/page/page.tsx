import ConversationFallback from '@/components/shared/conversation/ConversationFallback'
import ItemList from '@/components/shared/item-list/ItemList'
import React from 'react'

type Props = {}

const FriendsPage = (props: Props) => {
  return (
    <>
      <ItemList title='Friends'>
Friends page 2
      </ItemList>
      <ConversationFallback />
    </>
  )
}

export default FriendsPage