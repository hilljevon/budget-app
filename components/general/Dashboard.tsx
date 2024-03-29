'use client'
import { useEffect, useState } from 'react'
import DashGraphs from '../data/DashGraphs';
import { InvoiceType, MongoUserType, TransactionType } from '@/lib/types/types';
import { spendingGraphData } from '@/lib/utils';
import { useChartContext } from '@/lib/contexts/ChartProvider';
import DashboardRight from './DashboardRight';
import NewExpenseIcon from '../shared/NewExpenseIcon';
import { useInvoiceContext } from '@/lib/contexts/InvoiceProvider';
import LeftNav from '../shared/LeftNav';
import TestDashboard from './TestDashboard';

export default function Dashboard({ transactions, clerkId, bills, subscriptions, mongoUser }:
    { transactions: TransactionType[], clerkId: string, bills: InvoiceType[], subscriptions: InvoiceType[], mongoUser: MongoUserType }) {
    const [mounted, setMounted] = useState(false);
    const { setSpendingCharts } = useChartContext()
    const { setSubscriptions, setBills } = useInvoiceContext()
    useEffect(() => {
        setSpendingCharts(() => {
            return spendingGraphData(transactions, mongoUser.monthlyIncome)
        })
        setSubscriptions(subscriptions)
        setBills(bills)
        setMounted(true);
    }, []);
    return (
        <>
            {mounted && (
                <>
                    {/* <TestDashboard /> */}
                    <DashGraphs />
                    <DashboardRight transactions={transactions} clerkId={clerkId} />
                </>
            )}
            <NewExpenseIcon clerkId={clerkId} />
        </>
    )
}
