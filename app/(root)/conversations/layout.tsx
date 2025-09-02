import ConversationContainer from '@/components/shared/conversation/ConversationContainer'
import ConversationFallback from '@/components/shared/conversation/ConversationFallback'
import ItemList from '@/components/shared/item-list/ItemList'
import React from 'react'

type Props = React.PropsWithChildren<{}>

const ConversationsLayout = ({children}: Props) => {
  return (
    <>
    <ItemList
      title='Conversations'>
      Conversations Page
    </ItemList>
      {children}
    </>
  )
}

export default ConversationsLayout