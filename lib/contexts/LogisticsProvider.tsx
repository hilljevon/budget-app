'use client'
import React, { useContext, useState } from "react"
import { LogisticsContextTypes, OnboardingProps } from "../types/types"
interface LogisticProviderType {
    spendingData: LogisticsContextTypes,
    setSpendingData: React.Dispatch<React.SetStateAction<any>>
}
const LogisticsContext = React.createContext<LogisticProviderType>({
    spendingData: {
        spendingAveragesByMonth: [],
        recentDate: ''
    },
    setSpendingData: () => null
})
export const useLogisticsContext = () => {
    return useContext(LogisticsContext)
}
export function LogisticsProvider({ children }: { children: React.ReactNode }) {
    const [spendingData, setSpendingData] = useState({
        spendingAveragesByMonth: [],
        recentDate: ''
    })
    const values = { spendingData, setSpendingData }
    return (
        <>
            <LogisticsContext.Provider value={values}>
                {children}
            </LogisticsContext.Provider>
        </>
    )
}
