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
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from '../ui/button'
import NewExpenseForm from '../forms/NewExpenseForm'

const NewExpenseIcon = ({ clerkId }: { clerkId: string }) => {
    return (
        <div className='absolute right-10 bottom-8 hover:cursor-pointer bg-white px-2 py-2 rounded-lg '>
            <Sheet>
                <SheetTrigger>
                    <PlusCircleIcon className='h-10 w-10 shrink-0' aria-hidden="true" />
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