'use client'
import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { Button } from '../ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { usePathname, useRouter } from 'next/navigation'
import { formatDate } from '@/lib/dateUtils'
import { createNewTransaction } from '@/lib/actions/transaction.actions'

const formSchema = z.object({
    Description: z.string(),
    Amount: z.string(),
    newAvailableBalance: z.string(),
    Category: z.string(),
    Date: z.date({
        required_error: 'Please select the date for transaction'
    })
})
const NewExpenseForm = ({ clerkId }: { clerkId: string }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Description: '',
            Amount: '',
            newAvailableBalance: '',
            Category: '',
        },
    })
    const path = usePathname()
    const router = useRouter()
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const newTransaction = {
            Amount: values.Amount,
            Category: values.Category,
            Currency: 'USD',
            Date: formatDate(values.Date),
            Description: values.Description,
            Balance: values.newAvailableBalance
        }
        await createNewTransaction(newTransaction, clerkId, path)
        form.reset()
        router.push('/')
    }
    return (
        <>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-6 py-2 px-4'>
                        {/* DESCRIPTION */}
                        <FormField
                            control={form.control}
                            name="Description"
                            render={({ field }) => (
                                <div className='col-span-4 my-4'>
                                    <FormLabel htmlFor="description">Description</FormLabel>
                                    <Input
                                        className='my-2'
                                        type='text'
                                        {...field}
                                    />
                                </div>
                            )} />
                        {/* AMOUNT */}
                        <FormField
                            control={form.control}
                            name="Amount"
                            render={({ field }) => (
                                <div className='col-span-4 my-4'>
                                    <FormLabel htmlFor="description">Amount</FormLabel>
                                    <Input
                                        className='my-2'
                                        type='number'
                                        {...field}
                                        placeholder='$'
                                    />
                                </div>
                            )} />
                        {/*  DATE */}
                        <FormField
                            control={form.control}
                            name="Date"
                            render={({ field }) => (
                                <div className='col-span-4 my-4'>
                                    <FormLabel>Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            )} />
                        {/* CATEGORY */}
                        <FormField
                            control={form.control}
                            name="Category"
                            render={({ field }) => (
                                <div className='col-span-4 my-4'>
                                    <FormLabel className='my-2' htmlFor="description">Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className='mt-2'>
                                            <SelectItem value="food">Food</SelectItem>
                                            <SelectItem value="entertainment">Entertainment</SelectItem>
                                            <SelectItem value="transportation">Transportation</SelectItem>
                                            <SelectItem value="shopping">Shopping</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )} />
                        {/* REMAINING BALANCE */}
                        <FormField
                            control={form.control}
                            name="newAvailableBalance"
                            render={({ field }) => (
                                <div className='col-span-6 my-4'>
                                    <FormLabel htmlFor="description">Remaining Bank Balance</FormLabel>
                                    <Input
                                        className='my-2'
                                        type='number'
                                        {...field}
                                        placeholder='$'
                                    />
                                </div>
                            )} />
                        <div
                            className='mt-2'
                        >
                            <Button type='submit'>Create</Button>
                        </div>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default NewExpenseForm
