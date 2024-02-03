'use client'
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { TransactionType } from '@/lib/types/types'

type PaginateFunction = (pageNumber: number) => void;
const CardPagination = ({ transactions, paginate, currentPage, itemsPerPage }:
    { transactions: TransactionType[], paginate: PaginateFunction, currentPage: number, itemsPerPage: number }) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage + 1
    return (
        <>
            <nav
                className="flex items-center justify-between border-t border-gray-200 bg-white py-6"
                aria-label="Pagination"
            >
                <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{indexOfFirstItem}</span> to <span className="font-medium"> {indexOfLastItem} </span> of{' '}
                        <span className="font-medium"> {transactions.length} </span> results
                    </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                        onClick={() => {
                            paginate(currentPage - 1)
                        }}
                    >
                        Previous
                    </a>
                    <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                        onClick={() => {
                            paginate(currentPage + 1)
                        }}
                    >
                        Next
                    </a>
                </div>
            </nav>
        </>
    )
}

export default CardPagination