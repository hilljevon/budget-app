'use server'
import { revalidatePath } from "next/cache"
import MongoUser from "../models/user.model"
import { connectToDb } from "../mongoose"
import { InitialOnboardingProps } from "../types/types"
import { createOnboardingTransactions } from "./transaction.actions"
import { createInitialInvoices } from "./invoice.actions"

export async function createUser(onboardingObject: InitialOnboardingProps, path: string) {
    try {
        connectToDb()
        const mongoUser = await MongoUser.create({
            clerkId: onboardingObject.clerkId,
            firstName: onboardingObject.firstName,
            lastName: onboardingObject.lastName,
            email: onboardingObject.email,
            phone: onboardingObject.phone,
            currentBalance: onboardingObject.currentBalance,
            monthlyIncome: onboardingObject.monthlyIncome,
        })
        const allTransactions = await createOnboardingTransactions(onboardingObject.transactionsByDate, JSON.parse(JSON.stringify(mongoUser._id)))
        const { allBills, allSubscriptions } = await createInitialInvoices(onboardingObject.bills, onboardingObject.subscriptions, JSON.parse(JSON.stringify(mongoUser._id)))
        mongoUser.transactions = allTransactions
        mongoUser.bills = allBills
        mongoUser.subscriptions = allSubscriptions
        await mongoUser.save()
        console.log('USER SAVED', mongoUser)
    } catch (error: any) {
        throw new Error(`Unable to create new User! Error Here: ${error.message}`)
    }
}