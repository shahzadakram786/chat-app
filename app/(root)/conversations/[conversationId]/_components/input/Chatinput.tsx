"use client"

import { Card } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { api } from '@/convex/_generated/api'
import { useMutationState } from '@/hooks/useMutationState'
import { zodResolver } from '@hookform/resolvers/zod'
import { ConvexError } from 'convex/values'
import React, { ChangeEvent, KeyboardEvent } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import TextareaAutosize from 'react-textarea-autosize'
import { Button } from '@/components/ui/button'
import { SendHorizonal } from 'lucide-react'

const chatMessageSchema = z.object({
  content: z.string().min(1, {
    message: "This field can't be empty"
  })
})

interface ChatInputProps {
  conversationId: string
}

const Chatinput = ({ conversationId }: ChatInputProps) => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)
  const { mutate: createMessage, pending } = useMutationState(api.message.create)

  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: ''
    }
  })

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value, selectionStart } = event.target
    if (selectionStart !== null) {
      form.setValue('content', value)
    }
  }

  const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      await form.handleSubmit(handleSubmit)()
    }
  }

  const handleSubmit = async (values: z.infer<typeof chatMessageSchema>) => {
    createMessage({
      conversationId,
      type: 'text',
      content: [values.content]
    }).then(() => {
      form.reset()
    }).catch((error: unknown) => {
      if (error instanceof ConvexError) {
        toast.error(error.data as string)
      } else {
        toast.error("Unexpected error occurred")
      }
    })
  }

  return (
    <Card className="w-full p-2 rounded-lg relative">
      <div className="flex gap-2 items-end w-full">
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex gap-2 justify-between"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <TextareaAutosize 
                      onKeyDown={handleKeyDown}
                      rows={1}
                      maxRows={3}
                      {...field}
                      onChange={handleInputChange}
                      placeholder="Type a message"
                      className="min-h-full w-full resize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-1.5"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={pending} type="submit" size="icon">
              <SendHorizonal />
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  )
}

export default Chatinput