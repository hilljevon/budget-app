'use server'
import { revalidatePath } from "next/cache"
import User from "../models/user.model"
import { connectToDb } from "../mongoose"
import Invoice from "../models/invoice.model"

export async function createInvoice() {
    try {
        connectToDb()

    } catch (error: any) {
        throw new Error(``)
    }
}