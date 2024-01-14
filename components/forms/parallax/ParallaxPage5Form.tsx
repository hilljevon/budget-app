'use client'
import React from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'
import { useOnboardingContext } from '@/lib/contexts/OnboardingProvider'
import { createUser } from '@/lib/actions/user.actions'
import { usePathname, useRouter } from 'next/navigation'

interface ParallaxProps {
    parallax: any,
    steps: {
        name: string,
        href: string,
        status: string
    }[],
    setSteps: React.Dispatch<React.SetStateAction<any>>,
    clerkId: string
}
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}
const ParallaxPage5Form = ({ parallax, steps, setSteps, clerkId }: ParallaxProps) => {
    const { formData, setFormData } = useOnboardingContext()
    const path = usePathname()
    const router = useRouter()
    console.log(formData)
    const handleSubmit = async () => {
        const submitObject = { ...formData, clerkId: clerkId }
        const user = await createUser(submitObject, clerkId)
    }
    return (
        <div className='bg-white rounded-lg flex flex-col items-center justify-center'>
            <nav className='m-4'>
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
                {formData?.bills.map((bill, key) => (
                    <div key={bill.name} className='col-span-6'>
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
                    <div key={sub.name} className='col-span-6'>
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
            <div className="flex">
                {/* EDIT BUTTON */}
                <button
                    onClick={() => {
                        parallax.current.scrollTo(0)
                        setSteps((oldSteps: any) => {
                            let newSteps = [...oldSteps]
                            newSteps[4] = {
                                name: 'Step 5', href: '#', status: 'upcoming'
                            }
                            newSteps[0] = {
                                name: 'Step 1', href: '#', status: 'current'
                            }
                            return newSteps
                        })
                    }}
                    className='rounded-md bg-yellow-600 mx-4 px-3 py-2 mb-3 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible'
                >
                    Edit
                </button>
                <button
                    className='rounded-md bg-blue-600 px-3 py-2 mb-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible'
                    onClick={handleSubmit} >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default ParallaxPage5Form