'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'
import { TooltipContent } from '@/components/ui/tooltip'
import { DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

type Props = {}

const addFriendFormSchema = z.object({
    email: z.string()
    .min(1, {message: "this field cant be empty"})
    .email("please enter a valid email")
    
})

const AddFriendDialog = (props: Props) => {


    const form  = useForm<z.infer<typeof addFriendFormSchema>>({
        resolver: zodResolver
        (addFriendFormSchema),
        defaultValues: {
            email: ""
        }
    })

    const handleSubmit = () => {}

  return (
    <Dialog>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button size="icon"
                variant="outline">


                <DialogTrigger>
                    <UserPlus/> 
                </DialogTrigger>
                </Button>

            </TooltipTrigger>
            <TooltipContent>
                <p>Add Friennd</p>
            </TooltipContent>
        </Tooltip>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Add Friend
                </DialogTitle>
                <DialogDescription>
                    sent  a friend request via email
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}
                 className='space-y-8 py-4'>

                    <FormField
                    control={form.control}
                    name='email'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <FormControl>
                                <input type='email'
                                placeholder='Email ...'
                                {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
)}
                        />
                    
                    <DialogFooter>
                        <Button disabled={false}                             type="submit"
                        >
send
                        </Button>
                    </DialogFooter>
                
                </form>    
            </Form>
        </DialogContent>
    </Dialog>
  )
}

export default AddFriendDialog