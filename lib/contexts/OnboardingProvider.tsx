'use client'
import React, { useContext, useState } from "react"
import { OnboardingProps } from "../types/types"
interface OnboardingProviderType {
    formData: OnboardingProps,
    setFormData: React.Dispatch<React.SetStateAction<any>>
}

const OnboardingContext = React.createContext<OnboardingProviderType>({
    formData: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        currentBalance: '',
        monthlyIncome: '',
        transactionsByDate: {},
        bills: [],
        subscriptions: []
    },
    setFormData: () => null
})
export const useOnboardingContext = () => {
    return useContext(OnboardingContext)
}
export function OnboardingProvider({ children }: { children: React.ReactNode }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        currentBalance: '',
        monthlyIncome: '',
        transactionsByDate: {},
        bills: [],
        subscriptions: []
    })
    const values = { formData, setFormData }
    return (
        <>
            <OnboardingContext.Provider value={values}>
                {children}
            </OnboardingContext.Provider>
        </>
    )
}