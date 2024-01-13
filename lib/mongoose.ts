import mongoose from 'mongoose'

let isConnected = false

export const connectToDb = async () => {
    console.log('INSIDE CONNECT TO DB')
    mongoose.set('strictQuery', true)
    if (!process.env.MONGODB_URL) return console.log('MONGODB URL NOT FOUND')
    if (isConnected) return console.log('Already Connected to MongoDB')
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        let isConnected = true
        console.log('Successfully connected to database!')
    } catch (error) {
        console.log(error)
        console.log('Unable to connect to database :(')
    }
}
