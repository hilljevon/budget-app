import mongoose from "mongoose";
const MongoUserSchema = new mongoose.Schema({
    clerkId: String,
    firstName: String,
    lastName: String,
    username: String,
    profileImg: String,
    email: String,
    phone: String,
    emailNotifications: Boolean,
    phoneNotifications: Boolean,
    onboarded: Boolean,
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction'
        }
    ],
    goalNetWorth: Number,
    currentBalance: Number,
    monthlyIncome: Number,
    hourlyIncome: Number,
    annualIncome: Number,
    goalIncome: Number,
    netGoals: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction'
        }
    ],
    subscriptions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Invoice'
        }
    ],
    bills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Invoice'
        }
    ],

})
const MongoUser = mongoose.models.MongoUser || mongoose.model('MongoUser', MongoUserSchema)
export default MongoUser