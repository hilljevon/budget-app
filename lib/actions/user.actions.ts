'use server'
import { revalidatePath } from "next/cache"
import MongoUser from "../models/user.model"
import { connectToDb } from "../mongoose"
import { OnboardingProps } from "../types/types"
import { createOnboardingTransactions } from "./transaction.actions"
import { createInitialInvoices } from "./invoice.actions"
import { sortObjectsByDateDesc } from "../dateUtils"

export async function createUser(onboardingObject: OnboardingProps, clerkId: string, path: string) {
    try {
        connectToDb()
        const mongoUser = await MongoUser.create({
            clerkId,
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
        revalidatePath(path)
    } catch (error: any) {
        throw new Error(`Unable to create new User! Error Here: ${error.message}`)
    }
}
export async function findUserByClerk(clerkId: string) {
    try {
        connectToDb()
        const mongoUser = await MongoUser.findOne({ clerkId: clerkId })
            .populate('transactions')
            .populate('bills')
            .populate('subscriptions')
        return await JSON.parse(JSON.stringify(mongoUser))
    } catch (error: any) {
        return
    }
}
export async function getTransactionsByClerk(clerkId: string) {
    try {
        connectToDb()
        const mongoUser = await MongoUser.findOne({ clerkId: clerkId }).populate('transactions')
        const transactions = JSON.parse(JSON.stringify(mongoUser.transactions.slice(0, 1000)))
        return transactions
    } catch (error: any) {
        throw new Error(`Cannot get transactions by clerkId. Error here: ${error.message}`)
    }
}