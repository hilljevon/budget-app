import React from 'react'
import { getTransactionsByClerk } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import AllTransactions from '@/components/general/AllTransactions'
const page = async () => {
    const clerkUser = await currentUser()
    if (!clerkUser) redirect('/signup')
    const transactions = await getTransactionsByClerk(clerkUser?.id)
    return (
        <>
            <AllTransactions transactions={transactions} />
        </>
    )
}

export default page