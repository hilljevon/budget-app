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
import NewExpenseForm from '../forms/NewExpenseForm'
const NewExpenseIcon = ({ clerkId }: { clerkId: string }) => {
    return (
        <div className='fixed right-10 bottom-0 hover:cursor-pointer bg-transparent px-2 py-2 rounded-lg '>
            <Sheet>
                <SheetTrigger>
                    <PlusCircleIcon className='h-12 w-12 shrink-0' aria-hidden="true" />
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                    <SheetHeader>
                        <SheetTitle>Create new expense</SheetTitle>
                        <SheetDescription>
                            <NewExpenseForm clerkId={clerkId} />
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}
export default NewExpenseIcon