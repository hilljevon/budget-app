'use client'
import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { usePathname, useRouter } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '../ui/button'

const formSchema = z.object({
    name: z.string(),
    price: z.string(),
    category: z.string(),
})
const NewInvoiceForm = ({ clerkId, invoiceType }: { clerkId: string, invoiceType: string }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            price: '',
            category: '',
        },
    })
    const isBill = invoiceType === 'bill'
    const path = usePathname()
    const router = useRouter()
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} action="">
                    <div className='grid grid-cols-6 py-2 px-4'>
                        {/* DESCRIPTION */}
                        <FormField
                            control={form.control}
                            name="name"
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
                            name="price"
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
                        {/* CATEGORY */}
                        <FormField
                            control={form.control}
                            name="category"
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
                        <div
                            className='mt-2 col-span-4'
                        >
                            <Button type='submit'>Create</Button>
                        </div>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default NewInvoiceForm