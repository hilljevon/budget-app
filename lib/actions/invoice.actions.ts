'use server'
import { revalidatePath } from "next/cache"
import User from "../models/user.model"
import { connectToDb } from "../mongoose"
import Invoice from "../models/invoice.model"
interface invoiceProp {
    name: string,
    category: string,
    price: string | number,
    frequency: string
}
export async function createInitialInvoices(bills: invoiceProp[], subscriptions: invoiceProp[], authorId: string) {
    try {
        connectToDb()
        const allBills = await Promise.all(bills.map(async (bill) => {
            const createdBill = await Invoice.create({
                ...bill,
                authorId,
                frequency: 'monthly',
                type: 'bill'
            })
            return await createdBill._id
        }))
        const allSubscriptions = await Promise.all(subscriptions.map(async (sub) => {
            const createdSub = await Invoice.create({ ...sub, authorId: authorId, type: 'subscription' })
            return await createdSub._id
        }))
        return { allBills, allSubscriptions }
    } catch (error: any) {
        throw new Error(``)
    }
}