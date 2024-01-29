'use client'
import { useEffect, useState } from 'react'
import DashGraphs from '../data/DashGraphs';
import { InvoiceType, TransactionType } from '@/lib/types/types';
import { spendingGraphData } from '@/lib/utils';
import { useChartContext } from '@/lib/contexts/ChartProvider';
import DashboardRight from './DashboardRight';
import NewExpenseIcon from '../shared/NewExpenseIcon';
import { useInvoiceContext } from '@/lib/contexts/InvoiceProvider';

export default function Dashboard({ transactions, clerkId, bills, subscriptions }:
    { transactions: TransactionType[], clerkId: string, bills: InvoiceType[], subscriptions: InvoiceType[] }) {
    const [mounted, setMounted] = useState(false);
    const { setSpendingCharts } = useChartContext()
    const { setSubscriptions, setBills } = useInvoiceContext()

    useEffect(() => {
        setSpendingCharts(() => {
            return spendingGraphData(transactions)
        })
        setSubscriptions(subscriptions)
        setBills(bills)
        setMounted(true);
    }, []);
    return (
        <>
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
