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
import { Input } from '../../ui/input'
import Papa from 'papaparse'
import { handleBankData } from '@/lib/utils'

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
const formSchema = z.object({
    currentBalance: z.string(),
    monthlyIncome: z.string(),
})

const ParallaxPage2Form = ({ parallax, steps, setSteps }: ParallaxProps) => {
    // form default values
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentBalance: '',
            monthlyIncome: '',
        },
    })
    // imported context for onboarding form
    const { formData, setFormData } = useOnboardingContext()
    const [parsedResults, setParsedResults] = useState({})
    // on change for csv file upload
    const handleFileChange = async (event: any) => {
        console.log(event.target.files[0])
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: async function (results: any) {
                // console.log('MY RESULTS HERE', results.data)
                const resultsByDate = await handleBankData(results.data)
                await setParsedResults(resultsByDate)
            }
        })
    }
    // on form 2 submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setFormData && setFormData((oldFormData: OnboardingProps) => {
            return {
                ...oldFormData,
                currentBalance: parseFloat(values.currentBalance),
                monthlyIncome: parseFloat(values.monthlyIncome),
                transactionsByDate: parsedResults
            }
        })
        setSteps((oldSteps: any) => {
            let newSteps = [...oldSteps]
            newSteps[1] = {
                name: 'Step 2', href: '#', status: 'complete'
            }
            newSteps[2] = {
                name: 'Step 3', href: '#', status: 'current'
            }
            return newSteps
        })
        parallax.current.scrollTo(2)
    }
    return (
        <div className='bg-white rounded-lg'>
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
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-6 py-2 px-4'>
                        {/* CURRENT BANK BALANCE */}
                        <FormField
                            control={form.control}
                            name="currentBalance"
                            render={({ field }) => (
                                <div className="col-span-4">
                                    <label htmlFor="">Current Bank Balance</label>
                                    <input
                                        type="number"
                                        {...field}
                                        placeholder='$'
                                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"'
                                    />
                                </div>
                            )} />
                        {/* MONTHLY INCOME */}
                        <FormField
                            control={form.control}
                            name="monthlyIncome"
                            render={({ field }) => (
                                <div className="col-span-4">
                                    <label htmlFor="">Monthly Income</label>
                                    <input
                                        type="number"
                                        {...field}
                                        placeholder='$'
                                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"'
                                    />
                                </div>
                            )} />
                        {/* BANK INFO UPLOAD */}
                        <div className="col-span-4 mt-2">
                            <label htmlFor="">Upload Bank Statement</label>
                            <Input
                                type="file"
                                name='file'
                                onChange={handleFileChange}
                                placeholder='$'
                                className='block flex-1 mt-2 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                            />
                        </div>
                        <div className="col-span-6 mt-2">
                            <button
                                type='submit'
                                className='rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible'
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default ParallaxPage2Form