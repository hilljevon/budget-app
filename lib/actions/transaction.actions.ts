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
export async function createOnboardingTransactions(transactions: OnboardingTransactions) {
    try {
        connectToDb()

    } catch (error: any) {
        throw new Error(``)
    }
}