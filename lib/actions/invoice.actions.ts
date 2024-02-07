'use server'
import { revalidatePath } from "next/cache"
import User from "../models/user.model"
import { connectToDb } from "../mongoose"
import Invoice from "../models/invoice.model"
import MongoUser from "../models/user.model"
interface invoiceProp {
    name: string,
    category: string,
    price: string | number,
    frequency: string
}
interface newInvoiceInterface {
    invoice: invoiceProp,
    clerkId: string,
    path: string,
    invoiceType: string
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
export async function createNewInvoice(newInvoiceObject: newInvoiceInterface) {
    try {
        connectToDb()
        const mongoUser = await MongoUser.findOne({ clerkId: newInvoiceObject.clerkId })

    } catch (error: any) {
        throw new Error(`Unable to create new invoice. Error here: ${error.message}`)
    }
}