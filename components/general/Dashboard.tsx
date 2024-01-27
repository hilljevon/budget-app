'use client'
import { useEffect, useState } from 'react'
import { UserButton } from '@clerk/nextjs';
import DashGraphs from '../data/DashGraphs';
import { TransactionType } from '@/lib/types/types';
import { spendingGraphData } from '@/lib/utils';
import { useChartContext } from '@/lib/contexts/ChartProvider';
import DashboardRight from './DashboardRight';
import NewExpenseIcon from '../shared/NewExpenseIcon';

export default function Dashboard({ transactions, clerkId }: { transactions: TransactionType[], clerkId: string }) {
    const [mounted, setMounted] = useState(false);
    const { setSpendingCharts } = useChartContext()
    useEffect(() => {
        setSpendingCharts(() => {
            return spendingGraphData(transactions)
        })
        setMounted(true);
    }, []);
    return (
        <>
            <UserButton />
            {mounted && (
                <>
                    <DashGraphs />
                    <DashboardRight transactions={transactions} clerkId={clerkId} />
                </>
            )}
            <NewExpenseIcon clerkId={clerkId} />
        </>
    )
}
