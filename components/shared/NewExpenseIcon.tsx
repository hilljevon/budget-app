'use client'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import NewExpenseForm from '../forms/NewExpenseForm'
import NewInvoiceForm from '../forms/NewInvoiceForm'
const NewExpenseIcon = ({ clerkId }: { clerkId: string }) => {
    return (
        <div className='fixed right-10 bottom-0 hover:cursor-pointer bg-transparent px-2 py-2 rounded-lg '>
            <Sheet>
                <SheetTrigger>
                    <PlusCircleIcon className='h-12 w-12 shrink-0' aria-hidden="true" />
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">

                    <SheetHeader>
                        <SheetTitle>Create new</SheetTitle>
                        <SheetDescription>
                            <Tabs defaultValue="account" className="w-[400px]">
                                <TabsList>
                                    <TabsTrigger value="expense">Expense</TabsTrigger>
                                    <TabsTrigger value="bill">Bill</TabsTrigger>
                                    <TabsTrigger value="subscription">Subscription</TabsTrigger>
                                </TabsList>
                                <TabsContent value="expense">
                                    <NewExpenseForm clerkId={clerkId} />
                                </TabsContent>
                                <TabsContent value="bill">
                                    <NewInvoiceForm clerkId={clerkId} invoiceType='bill' />
                                </TabsContent>
                                <TabsContent value="subscription">
                                    <NewInvoiceForm clerkId={clerkId} invoiceType='subscription' />
                                </TabsContent>
                            </Tabs>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}
export default NewExpenseIcon