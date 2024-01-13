import mongoose from "mongoose";
const invoiceSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    category: String,
    frequency: String,
    price: Number || String,
    type: String,
})
const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema)
export default Invoice