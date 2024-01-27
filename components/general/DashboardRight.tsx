'use client'
import React, { Fragment } from 'react'
import { getRecentActivity } from '@/lib/utils'
import { TransactionType, recentActivityType } from '@/lib/types/types'
const statuses = {
    Paid: 'text-green-700 bg-green-50 ring-green-600/20',
    Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
    Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
}
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const DashboardRight = ({ transactions, clerkId }: { transactions: TransactionType[], clerkId: string }) => {
    const days = getRecentActivity(transactions)
    return (
        <>
            {days && (
                <aside className="fixed inset-y-0 right-0 hidden w-72 overflow-y-auto border-l border-gray-200 px-2 py-6 sm:px-2 lg:px-2 xl:block">
                    {/* RECENT ACTIVITY BEGIN */}
                    <div>
                        <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-2">
                            <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                                Recent activity
                            </h2>
                        </div>
                        <div className="mt-4 overflow-hidden border-t border-gray-100">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                                    <table className="w-full text-left">
                                        <thead className="sr-only">
                                            <tr>
                                                <th>Amount</th>
                                                <th className="hidden sm:table-cell">Client</th>
                                                <th>More details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {days.map((day: any) => (
                                                <Fragment key={day.dateTime}>
                                                    <tr className="text-sm leading-6 text-gray-900">
                                                        <th scope="colgroup" colSpan={3} className="relative isolate py-2 font-semibold">
                                                            <time dateTime={day.dateTime}>{day.date}</time>
                                                            <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                                                            <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                                                        </th>
                                                    </tr>
                                                    {day.transactions.map((transaction: recentActivityType) => (
                                                        <tr key={transaction._id}>
                                                            <td className="relative py-2 pr-2">
                                                                <div className="flex gap-x-6">
                                                                    {/* <transaction.icon
                                                                        className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                                                                        aria-hidden="true"
                                                                    /> */}
                                                                    <div className="flex-auto">
                                                                        <div className="flex items-start gap-x-3">
                                                                            <div className="text-sm font-medium leading-6 text-gray-900">
                                                                                {transaction.Amount}
                                                                            </div>

                                                                            <div
                                                                                className={classNames(
                                                                                    statuses.Paid,
                                                                                    'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                                                                                )}
                                                                            >
                                                                                Paid
                                                                            </div>
                                                                        </div>
                                                                        {/* PURCHASE DESCRIPTION */}
                                                                        {transaction.Description ? (
                                                                            <div className="mt-1 text-xs leading-5 text-gray-500">{transaction.Description}</div>
                                                                        ) : null}
                                                                    </div>
                                                                </div>
                                                                <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                                                <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            )}
        </>
    )
}
export default DashboardRight