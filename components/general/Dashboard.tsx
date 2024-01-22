'use client'
import { Fragment, useEffect, useState } from 'react'
import { UserButton } from '@clerk/nextjs';
import DashGraphs from '../data/DashGraphs';
import { useLogisticsContext } from '@/lib/contexts/LogisticsProvider';
import { CsvDataProps } from '@/lib/types/types';
import { handleBankData1 } from '@/lib/utils';

const stats = [
    { name: 'Revenue', value: '$405,091.00', change: '+4.75%', changeType: 'positive' },
    { name: 'Overdue', value: '$12,787.00', change: '+54.02%', changeType: 'negative' },
    { name: 'Outstanding', value: '$245,988.00', change: '-1.39%', changeType: 'positive' },
    { name: 'Expenses', value: '$30,156.00', change: '+10.18%', changeType: 'negative' },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}
interface transactionProps {

}
export default function Dashboard({ recentDate, transactions }: { recentDate: string, transactions: CsvDataProps[] }) {
    const [mounted, setMounted] = useState(false);
    const { setSpendingData } = useLogisticsContext()
    const testArrays = handleBankData1(transactions)
    useEffect(() => {
        setSpendingData({
            spendingAveragesByMonth: testArrays,
            recentDate: recentDate,
            transactions
        })
        setMounted(true);
    }, []);
    return (
        <>
            <UserButton />
            {/* <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4 border-t-2 border-b-2">
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
            </dl> */}
            {mounted && (
                <DashGraphs />
            )}
        </>
    )
}
