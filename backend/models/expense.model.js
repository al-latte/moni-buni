import mongoose from "mongoose";
import { Schema } from "mongoose";

const expenseSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category" 
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet"  
    }

}, {timestamps: true})

const Expense = mongoose.model("Expense", expenseSchema)

export default Expense