'use server'
import { revalidatePath } from "next/cache"
import User from "../models/user.model"
import { connectToDb } from "../mongoose"
import { InitialOnboardingProps } from "../types/types"
import { createOnboardingTransactions } from "./transaction.actions"

export async function createUser(onboardingObject: InitialOnboardingProps, path: string) {
    try {
        connectToDb()
        const mongoUser = await User.create({
            clerkId: onboardingObject.clerkId,
            firstName: onboardingObject.firstName,
            lastName: onboardingObject.lastName,
            email: onboardingObject.email,
            phone: onboardingObject.phone,
            currentBalance: onboardingObject.currentBalance,
            monthlyIncome: onboardingObject.monthlyIncome,
        })
        // const transactions = await createOnboardingTransactions(onboardingObject.transactionsByDate)
    } catch (error: any) {
        throw new Error(`Unable to create new User! Error Here: ${error.message}`)
    }
}