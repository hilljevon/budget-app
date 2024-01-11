'use client'
import React, { useContext, useState } from "react"
import { OnboardingProps } from "../types/types"
interface OnboardingProviderType {
    formData: OnboardingProps | undefined,
    setFormData: React.Dispatch<React.SetStateAction<any>> | undefined
}

const OnboardingContext = React.createContext<OnboardingProviderType>({
    formData: undefined,
    setFormData: undefined
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
        transactionsByDate: {}
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