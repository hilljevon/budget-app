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
const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string().min(9),
    email: z.string().min(10)
})
const ParallaxPage1Form = ({ parallax, steps, setSteps }: ParallaxProps) => {
    const [isVisible, setIsVisible] = useState(true)
    const { formData, setFormData } = useOnboardingContext()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
        },
    })
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }
    const item = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
    }
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setFormData && setFormData((oldFormData: OnboardingProps) => {
            return {
                ...oldFormData,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone
            }
        })
        // setIsVisible(false)
        setSteps((oldSteps: any) => {
            let newSteps = [...oldSteps]
            newSteps[0] = {
                name: 'Step 1', href: '#', status: 'complete'
            }
            newSteps[1] = {
                name: 'Step 2', href: '#', status: 'current'
            }
            return newSteps
        })
        parallax.current.scrollTo(1)
    }
    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className='bg-white rounded-lg'
                        key="form1"
                    // initial={{ opacity: 0, x: -700 }}
                    // animate={{ opacity: 1, y: 0, x: 0 }}
                    // exit={{ opacity: 0 }}
                    // transition={{ duration: 0.5, ease: 'linear', y: { duration: 1 }, type: 'spring', stiffness: 100 }}
                    >
                        {/* progress bar 1 */}
                        <nav className='mt-4 mx-4'>
                            <motion.ol
                                role="list"
                                className="flex items-center"
                                variants={container}
                                initial="hidden"
                                animate="show"
                                transition={{ type: 'spring', stiffness: 100 }}
                            >
                                {steps.map((step, stepIdx) => (
                                    <motion.li
                                        key={step.name}
                                        className={classNames(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}
                                        variants={item}
                                    >
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
                                    </motion.li>
                                ))}
                            </motion.ol>
                        </nav>
                        {/* form 1  */}
                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className='grid grid-cols-6 py-2 px-4'>
                                    {/* first name input */}
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <div className="col-span-3">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    First Name
                                                </label>
                                                <motion.input
                                                    type="text"
                                                    placeholder='John'
                                                    whileHover={{
                                                        scale: 1.05,
                                                        transition: { duration: 0.4 },
                                                    }}
                                                    whileFocus={{
                                                        scale: 1.1
                                                    }}
                                                    {...field}
                                                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"'
                                                />
                                            </div>
                                        )} />
                                    {/* last name input */}
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <div className="col-span-3 ml-3">
                                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="">Last Name</label>
                                                <motion.input
                                                    type="text"
                                                    whileHover={{
                                                        scale: 1.05,
                                                        transition: { duration: 0.4 },
                                                    }}
                                                    whileFocus={{
                                                        scale: 1.15
                                                    }}
                                                    {...field}
                                                    placeholder='Doe'
                                                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"'
                                                />
                                            </div>
                                        )} />
                                    {/* phone number input */}
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <div className="col-span-6 mt-2">
                                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="">Phone Number</label>
                                                <motion.input
                                                    type="text"
                                                    whileHover={{
                                                        scale: 1.05,
                                                        transition: { duration: 0.4 },
                                                    }}
                                                    whileFocus={{
                                                        scale: 1.15
                                                    }}
                                                    {...field}
                                                    placeholder='Format: 123-456-6789'
                                                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"'
                                                />
                                            </div>
                                        )} />
                                    {/* email input */}
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <div className="col-span-6 mt-2">
                                                <label className="block text-sm font-medium leading-6 text-gray-900" >Email</label>
                                                <motion.input
                                                    type="text"
                                                    whileHover={{
                                                        scale: 1.05,
                                                        transition: { duration: 0.4 },
                                                    }}
                                                    whileFocus={{
                                                        scale: 1.15
                                                    }}
                                                    {...field}
                                                    placeholder='johndoe@gmail.com'
                                                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"'
                                                />
                                            </div>
                                        )} />
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
                    </motion.div>
                )}

            </AnimatePresence>
        </>
    )
}

export default ParallaxPage1Form