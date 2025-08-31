import { Card } from '@/components/ui/card'
import React from 'react'


const ConversationFallback = () => {
  return (
    <Card className='hidden lg:flex lg:h-full lg:w-full p-2
    lg:min-h-[800px]
    items-center justify-center bg-secondary text-secondary-foreground'>
        Select/ start a conversation to get started.
    </Card>
  )
}

export default ConversationFallback