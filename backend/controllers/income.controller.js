import Income from "../models/income.model.js";
import Category from "../models/category.model.js";
import Wallet from "../models/wallet.model.js";

export const addIncome = async (request, response) => {
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

        const newIncome = new Income({
            userId,
            amount,
            category,
            description,
            date,
            wallet
          });

          if(newIncome) {
            await newIncome.save();

            response.status(200).json({
                _id: newIncome._id,
                userId: newIncome.userId,
                amount: newIncome.amount,
                category: newIncome.category,
                description: newIncome.description,
                date: newIncome.date,
                wallet: newIncome.wallet,
            })

          } else {
            return response.status(400).json({error: "Invalid expense data"})
          }
          
        
    } catch (error) {
        console.log("Error in addExpense controller", error.message)
        return response.status(500).json({error: "Internal server error"})
    }
}

export const deleteIncome = async (request, response) => {
    try {
        const { id } = request.params;
        const income = await Income.findByIdAndDelete(id);

        if (!income) {
            return response.status(404).json({ error: "Income not found" });
        }

        return response.status(200).json({ message: "Income deleted successfully" });

    } catch (error) {
        console.error("Error in deleteIncome controller", error.message);
        return response.status(500).json({ error: "Internal server error" });
    }
};

export const getIncomes = async (request, response) => {
    try {
        const { userId } = request.params;

        const incomes = await Income.find({ userId });

        if (!incomes.length) {
            return response.status(404).json({ error: "User has no incomes" });
        }

        return response.status(200).json({ incomes });

    } catch (error) {
        console.error("Error in getincomes controller", error.message);
        return response.status(500).json({ error: "Internal server error" });
    }
}