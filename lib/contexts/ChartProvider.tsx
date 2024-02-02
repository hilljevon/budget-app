'use client'
import React, { useContext, useState } from "react"
import { SpendingChartContextTypes } from "../types/types"
interface SpendingProviderType {
    spendingCharts: SpendingChartContextTypes,
    setSpendingCharts: React.Dispatch<React.SetStateAction<any>>
}
const ChartContext = React.createContext<SpendingProviderType>({
    spendingCharts: {
        yearlySpending: [],
        weeklySpending: [],
        overUnderWeekly: [],
        overUnderYearly: []
    },
    setSpendingCharts: () => null
})
export const useChartContext = () => {
    return useContext(ChartContext)
}
export function ChartProvider({ children }: { children: React.ReactNode }) {
    const [spendingCharts, setSpendingCharts] = useState({
        yearlySpending: [],
        weeklySpending: [],
        overUnderYearly: [],
        overUnderWeekly: []
    })
    const values = { spendingCharts, setSpendingCharts }
    return (
        <>
            <ChartContext.Provider value={values}>
                {children}
            </ChartContext.Provider>
        </>
    )
}