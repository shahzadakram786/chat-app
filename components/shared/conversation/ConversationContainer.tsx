import { Card } from '@/components/ui/card'
import React from 'react'

type Props = React.PropsWithChildren<{}>

const ConversationContainer = ({children}: Props) => {
  return (
    <Card className='bg-secondary w-full   h-[calc(80svh-32px)]  lg:max-h-[600px] lg:h-full p-2 flex justify-center flex-col gap-2'>
{children}
    </Card>
  )
}


export default ConversationContainer