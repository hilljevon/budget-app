'use server'
import { revalidatePath } from "next/cache"
import User from "../models/user.model"
import { connectToDb } from "../mongoose"
import Transaction from "../models/transaction.model"
import { handleBankData } from "../utils"

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
        // initialize empty array that we need to return to our user
        let allTrans: any[] = []
        // loop thru each transaction
        const transctionIds = await Promise.all(transactions.map(async (trans: InitialTransactions) => {
            const newTransaction = await Transaction.create({ ...trans, author: authorId })
            return await newTransaction._id
        }))
        console.log('ALL TRANSACTIONS HERE', transctionIds)
        return transctionIds
    } catch (error: any) {
        throw new Error(`Unable to create onboarding transactions! Error here: ${error.message}`)
    }
}