'use client'
import React, { useContext, useState } from "react"
import { InvoiceType } from "../types/types"
interface InvoiceProviderType {
    bills: InvoiceType[],
    subscriptions: InvoiceType[],
    setBills: React.Dispatch<React.SetStateAction<any>>,
    setSubscriptions: React.Dispatch<React.SetStateAction<any>>,
}
const InvoiceContext = React.createContext<InvoiceProviderType>({
    bills: [],
    subscriptions: [],
    setBills: () => null,
    setSubscriptions: () => null
})
export const useInvoiceContext = () => {
    return useContext(InvoiceContext)
}
export function InvoiceProvider({ children }: { children: React.ReactNode }) {
    const [bills, setBills] = useState([])
    const [subscriptions, setSubscriptions] = useState([])
    const values = { bills, setBills, subscriptions, setSubscriptions }
    return (
        <>
            <InvoiceContext.Provider value={values}>
                {children}
            </InvoiceContext.Provider>
        </>
    )
}