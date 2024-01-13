'use client'
import React, { useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'
import {
    Form,
    FormField,
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { useOnboardingContext } from '@/lib/contexts/OnboardingProvider'
import { OnboardingProps } from '@/lib/types/types'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
interface ParallaxProps {
    parallax: any,
    steps: {
        name: string,
        href: string,
        status: string
    }[],
    setSteps: React.Dispatch<React.SetStateAction<any>>
}
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}
const ParallaxPage5Form = ({ parallax, steps, setSteps }: ParallaxProps) => {
    const { formData, setFormData } = useOnboardingContext()
    console.log(formData)
    return (
        <div className='bg-white rounded-lg flex  flex-col items-center justify-center'>
            <div className='grid grid-cols-6 py-2 px-4'>
                {/* first name */}
                <div className="col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        First Name
                    </label>
                    <input
                        type="text"
                        readOnly={true}
                        placeholder={formData?.firstName}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"'
                    />
                </div>
                {/* last name */}
                <div className="col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Last Name
                    </label>
                    <input
                        type="text"
                        readOnly={true}
                        placeholder={formData?.lastName}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"'
                    />
                </div>
                {/* phone */}
                <div className="col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Phone
                    </label>
                    <input
                        type="text"
                        readOnly={true}
                        placeholder={formData?.phone}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"'
                    />
                </div>
                {/* email */}
                <div className="col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Email
                    </label>
                    <input
                        type="text"
                        readOnly={true}
                        placeholder={formData?.email}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"'
                    />
                </div>
                {/* bank balance */}
                <div className="col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Bank Balance
                    </label>
                    <input
                        type="text"
                        readOnly={true}
                        placeholder={formData?.currentBalance.toString()}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                </div>
                {/* monthly income */}
                <div className="col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Monthly Income
                    </label>
                    <input
                        type="text"
                        readOnly={true}
                        placeholder={formData?.monthlyIncome?.toString()}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"'
                    />
                </div>
                {/* bills */}
                <h2 className=' my-3'>Bills</h2>
                {formData?.bills.map((bill) => (
                    <div className='col-span-6'>
                        <label className='mx-2' htmlFor=""> Name </label>
                        <input
                            className='flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                            type="text"
                            name='name'
                            readOnly={true}
                            placeholder={bill.name}
                        />
                        <label className='mx-2' htmlFor="">Price</label>
                        <input
                            className='flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                            type="text"
                            name='price'
                            readOnly={true}
                            placeholder={bill.price}
                        />
                        <label className='mx-2' htmlFor="">Category</label>
                        <input
                            className='flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                            type="text"
                            name='category'
                            readOnly={true}
                            placeholder={bill.category}
                        />
                    </div>
                ))}
                {/* subscriptions */}
                <h2 className='my-3'>Subscriptions</h2>
                {formData?.subscriptions.map((sub) => (
                    <div className='col-span-6'>
                        <label className='mx-2' htmlFor=""> Name </label>
                        <input
                            className='flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                            type="text"
                            name='name'
                            readOnly={true}
                            placeholder={sub.name}
                        />
                        <label className='mx-2' htmlFor="">Price</label>
                        <input
                            className='flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                            type="text"
                            name='price'
                            readOnly={true}
                            placeholder={sub.price}
                        />
                        <label className='mx-2' htmlFor="">Category</label>
                        <input
                            className='flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                            type="text"
                            name='category'
                            readOnly={true}
                            placeholder={sub.category}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ParallaxPage5Form