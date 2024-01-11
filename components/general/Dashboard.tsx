'use client'
import { Fragment, useEffect, useState } from 'react'
import {
    Bars3Icon,
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    ArrowDownCircleIcon,
    ArrowPathIcon,
    ArrowUpCircleIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/outline'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from '../ui/button';
import { UserButton } from '@clerk/nextjs';
import DashGraphs from '../data/DashGraphs';

const stats = [
    { name: 'Revenue', value: '$405,091.00', change: '+4.75%', changeType: 'positive' },
    { name: 'Overdue', value: '$12,787.00', change: '+54.02%', changeType: 'negative' },
    { name: 'Outstanding', value: '$245,988.00', change: '-1.39%', changeType: 'positive' },
    { name: 'Expenses', value: '$30,156.00', change: '+10.18%', changeType: 'negative' },
]


function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <UserButton />
            <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4 border-t-2 border-b-2">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0 bg-white px-2 py-6 sm:px-6 xl:px-8"
                    >
                        <dt className="text-sm font-medium leading-6 text-gray-500">{stat.name}</dt>
                        <dd
                            className={classNames(
                                stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700',
                                'text-xs font-medium'
                            )}
                        >
                            {stat.change}
                        </dd>
                        <dd className="w-full flex-none text-xl font-medium leading-10 tracking-tight text-gray-900">
                            {stat.value}
                        </dd>
                    </div>
                ))}
            </dl>
            {mounted && (
                <DashGraphs />
            )}
        </>
    )
}
