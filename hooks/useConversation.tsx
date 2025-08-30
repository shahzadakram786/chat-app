import { useParams } from 'next/navigation'
import React, { useMemo } from 'react'

// type Props = {}

const useConversation = () => {
  
  const params = useParams()

  const conversationId = useMemo(() => 
  params?.conversationId || ("" as
 string) ,[params?.conversationId]) ;
  

  const isActive = useMemo(() => {
    return !!conversationId;
  }, [conversationId]);


    return {
     isActive   ,
     conversationId,
  }
}

export default useConversation