'use server'
import { revalidatePath } from "next/cache"
import User from "../models/user.model"
import { connectToDb } from "../mongoose"
import Transaction from "../models/transaction.model"

interface OnboardingTransactions {
    [key: string]: {
        Amount: string,
        Balance: string,
        Category: string,
        Currency: string,
        Date: string,
        Description: string
    }[]
}
interface InitialTransactions {
    Amount: string,
    Balance: string,
    Category: string,
    Currency: string,
    Date: string,
    Description: string
}
export async function createOnboardingTransactions(transactions: InitialTransactions[], authorId: string) {
    try {
        connectToDb()
        const transctionIds = await Promise.all(transactions.map(async (trans: InitialTransactions) => {
            const newTransaction = await Transaction.create({ ...trans, author: authorId })
            return await newTransaction._id
        }))
        return transctionIds
    } catch (error: any) {
        throw new Error(`Unable to create onboarding transactions! Error here: ${error.message}`)
    }
}
export async function createNewTransaction(transaction: InitialTransactions, clerkId: string, path: string) {
    try {
        connectToDb()
        const mongoUser = await User.findOne({ clerkId: clerkId })
        const newTransaction = await Transaction.create({
            ...transaction,
            author: mongoUser._id
        })
        await mongoUser.transactions.unshift(newTransaction._id)
        await mongoUser.save()
    } catch (error: any) {
        throw new Error(`Cannot create new transaction! Error here: ${error.message}`)
    }
}