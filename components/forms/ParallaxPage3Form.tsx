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
const ParallaxPage3Form = ({ parallax, steps, setSteps }: ParallaxProps) => {
    const { formData, setFormData } = useOnboardingContext()
    const [bills, setBills] = useState([
        { name: '', price: '', frequency: '', type: '' }
    ])
    const [subscriptions, setSubscriptions] = useState([
        { name: '', price: '', frequency: '', type: '' }
    ])
    const onChange = () => {

    }
    const addRow = (type: string) => {
        if (type === 'bill') {
            setBills((oldBills: any[]) => {
                return [...oldBills, { name: '', price: '', frequency: '', type: '' }]
            })
        } else {
            setSubscriptions((oldSubs: any[]) => {
                return [...oldSubs, { name: '', price: '', frequency: '', type: '' }]
            })
        }
    }
    const onSubmit = () => {

    }
    return (
        <div>
            <div className='bg-white rounded-lg flex  flex-col items-center justify-center'>
                {/* progress bar */}
                <nav className='mt-4 mx-4'>
                    <ol role="list" className="flex items-center">
                        {steps.map((step, stepIdx) => (
                            <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}>
                                {step.status === 'complete' ? (
                                    <>
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="h-0.5 w-full bg-green-600" />
                                        </div>
                                        <a
                                            href="#"
                                            className="relative flex h-8 w-8 items-center justify-center rounded-full bg-green-600 hover:bg-green-900"
                                        >
                                            <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                            <span className="sr-only">{step.name}</span>
                                        </a>
                                    </>
                                ) : step.status === 'current' ? (
                                    <>
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="h-0.5 w-full bg-gray-200" />
                                        </div>
                                        <a
                                            href="#"
                                            className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-green-600 bg-white"
                                            aria-current="step"
                                        >
                                            <span className="h-2.5 w-2.5 rounded-full bg-green-600" aria-hidden="true" />
                                            <span className="sr-only">{step.name}</span>
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="h-0.5 w-full bg-gray-200" />
                                        </div>
                                        <a
                                            href="#"
                                            className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
                                        >
                                            <span
                                                className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                                                aria-hidden="true"
                                            />
                                            <span className="sr-only">{step.name}</span>
                                        </a>
                                    </>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
                {/* form 1  */}
                <div className='grid grid-cols-6 py-2 px-4'>
                    {bills.map((bill, idx) => (
                        <div key={idx} className='col-span-6 mt-2'>
                            <label htmlFor=""> Title </label>
                            <input type="text" />
                            <label htmlFor="">Price</label>
                            <input type="text" />
                            <label htmlFor="">Category</label>
                            <input type="text" />
                        </div>
                    ))}
                    <button
                        className='rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible'
                        onClick={() => addRow('bill')}
                    >
                        Add Bill
                    </button>
                    <div className="col-span-6 mt-2">
                        <button
                            onClick={() => {
                                parallax.current.scrollTo(2)
                                setSteps((oldSteps: any) => {
                                    let newSteps = [...oldSteps]
                                    newSteps[2] = {
                                        name: 'Step 3', href: '#', status: 'complete'
                                    }
                                    return newSteps
                                })
                            }}
                            className='rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible'
                        >
                            Complete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ParallaxPage3Form