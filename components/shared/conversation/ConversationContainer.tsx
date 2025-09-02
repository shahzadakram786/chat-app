import { Card } from '@/components/ui/card'
import React from 'react'

type Props = React.PropsWithChildren<{}>

const ConversationContainer = ({children}: Props) => {
  return (
    <Card className='bg-secondary w-full h-[calc(100svh-32px)]  lg:min-h-[300px] lg:h-full p-2 flex flex-col gap-2'>
{children}
    </Card>
  )
}


export default ConversationContainer