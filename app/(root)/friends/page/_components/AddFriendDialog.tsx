'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'
import { DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useMutationState } from '@/hooks/useMutationState'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'
import { Input } from '@/components/ui/input'

const addFriendFormSchema = z.object({
    email: z.string()
    .min(1, {message: "This field can't be empty"})
    .email("Please enter a valid email")
})

const AddFriendDialog = () => {
    const {mutate: createRequest, pending} = useMutationState(api.request.create)

    const form = useForm<z.infer<typeof addFriendFormSchema>>({
        resolver: zodResolver(addFriendFormSchema),
        defaultValues: {
            email: ""
        },
    })

    const handleSubmit = async (values: z.infer<typeof addFriendFormSchema>) => {
        await createRequest({email: values.email})
            .then(() => {  
                toast.success("Friend request sent")
                form.reset()
            })
            .catch(error => {
                toast.error(error instanceof ConvexError ? error.data : "Unexpected error occurred")
            })
    }

    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    {/* Remove the Button wrapper and apply styles directly to DialogTrigger */}
                    <DialogTrigger asChild>
                        <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                            <UserPlus className="h-5 w-5" /> 
                        </div>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add Friend</p>
                </TooltipContent>
            </Tooltip>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add Friend
                    </DialogTitle>
                    <DialogDescription>
                        Send a friend request via email
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type='email'
                                            placeholder='Email address...'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        
                        <DialogFooter>
                            <Button 
                                disabled={pending} 
                                type="submit"
                                className="w-full sm:w-auto"
                            >
                                {pending ? "Sending..." : "Send Request"}
                            </Button>
                        </DialogFooter>
                    </form>    
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddFriendDialog