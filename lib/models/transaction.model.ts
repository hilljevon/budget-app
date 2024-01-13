import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Amount: Number || String,
    Category: String,
    Currency: String,
    Date: String || Date,
    Description: String,
})
const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)
export default Transaction