import mongoose from "mongoose";
import { Schema } from "mongoose";

const incomeSchema = new Schema({
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
        reqiured: true,
        default: Date.now
    },
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet"  
    }

}, {timestamps: true})

const Income = mongoose.model("Income", incomeSchema)

export default Income