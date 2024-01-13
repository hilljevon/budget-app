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
const ParallaxPage3Form = ({ parallax, steps, setSteps }: ParallaxProps) => {
    const { formData, setFormData } = useOnboardingContext()
    const [bills, setBills] = useState([
        { name: '', price: '', frequency: 'monthly', category: '' },
    ])
    const onChange = (idx: number, event: React.ChangeEvent<HTMLInputElement>) => {
        let data: any[] = [...bills]
        let name = event.target.name
        let val = event.target.value;
        data[idx][name] = val
        setBills(data)
    }
    const addRow = (type: string) => {
        setBills((oldBills: any[]) => {
            return [...oldBills, { name: '', price: '', frequency: 'monthly', type: '' }]
        })
    }
    const onSubmit = () => {
        setFormData && setFormData((oldFormData: OnboardingProps) => {
            return {
                ...oldFormData,
                bills: [...bills],
            }
        })
        setSteps((oldSteps: any) => {
            let newSteps = [...oldSteps]
            newSteps[2] = {
                name: 'Step 3', href: '#', status: 'complete'
            }
            newSteps[3] = {
                name: 'Step 4', href: '#', status: 'current'
            }
            return newSteps
        })
        parallax.current.scrollTo(3)
    }
    return (
        <>
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
                    <h1>Bills</h1>
                    {bills.map((bill, idx) => (
                        <div key={idx} className='col-span-6 mt-2 border-b-2 pb-4'>
                            <label className='mx-2' htmlFor=""> Title </label>
                            <input
                                className="input-green"
                                type="text"
                                name='name'
                                value={bill.name}
                                onChange={(event) => onChange(idx, event)}
                            />
                            <label className='mx-2' htmlFor="">Price</label>
                            <input
                                className="input-green"
                                type="text"
                                name='price'
                                value={bill.price}
                                onChange={(event) => onChange(idx, event)}
                            />
                            <label className='mx-2' htmlFor="">Category</label>
                            <input
                                className="input-green"
                                type="text"
                                name='category'
                                value={bill.category}
                                onChange={(event) => onChange(idx, event)}
                            />
                        </div>
                    ))}
                    <button
                        className='rounded-md bg-green-600 px-3 mt-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible'
                        onClick={() => addRow('bill')}
                    >
                        Add Bill
                    </button>
                    <div className="col-span-6 mt-2">
                        <button
                            onClick={onSubmit}
                            className='rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible'
                        >
                            Next
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ParallaxPage3Form