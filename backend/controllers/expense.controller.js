import mongoose from "mongoose";

import Expense from "../models/expense.model.js";
import Category from "../models/category.model.js";
import Wallet from "../models/wallet.model.js";

export const addExpense = async (request, response) => {
    try {
        const {amount, category, description, date, wallet} = request.body
        const userId = request.user._id

       // Check if the category belongs to the user
       const categoryExists = await Category.findOne({ _id: category, userId });
       if (!categoryExists) {
           console.log(`Category not found or unauthorized. Category ID: ${category}, User ID: ${userId}`);
           return response.status(404).json({ error: "Category not found or unauthorized" });
       }

       // Check if the wallet belongs to the user
       const walletExists = await Wallet.findOne({ _id: wallet, userId });
       if (!walletExists) {
           console.log(`Wallet not found or unauthorized. Wallet ID: ${wallet}, User ID: ${userId}`);
           return response.status(404).json({ error: "Wallet not found or unauthorized" });
       }

        const newExpense = new Expense({
            userId,
            amount,
            category,
            description,
            date,
            wallet
          });

          if(newExpense) {
            await newExpense.save();

            response.status(200).json({
                _id: newExpense._id,
                userId: newExpense.userId,
                amount: newExpense.amount,
                category: newExpense.category,
                description: newExpense.description,
                date: newExpense.date,
                wallet: newExpense.wallet,
            })

          } else {
            return response.status(400).json({error: "Invalid expense data"})
          }
          
        
    } catch (error) {
        console.log("Error in addExpense controller", error.message)
        return response.status(500).json({error: "Internal server error"})
    }
}

export const deleteExpense = async (request, response) => {
    try {
        const { id } = request.params;
        const expense = await Expense.findByIdAndDelete(id);

        if (!expense) {
            return response.status(404).json({ error: "Expense not found" });
        }

        return response.status(200).json({ message: "Expense deleted successfully" });

    } catch (error) {
        console.error("Error in deleteExpense controller", error.message);
        return response.status(500).json({ error: "Internal server error" });
    }
};

export const getExpenses = async (request, response) => {
    try {
        const { userId } = request.params;

        const expenses = await Expense.find({ userId });

        if (!expenses.length) {
            return response.status(404).json({ error: "User has no expenses" });
        }

        return response.status(200).json({ expenses });

    } catch (error) {
        console.error("Error in getexpenses controller", error.message);
        return response.status(500).json({ error: "Internal server error" });
    }
}