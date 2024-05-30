import express from "express"
import { addExpense, deleteExpense, getExpenses } from "../controllers/expense.controller.js"
import authenticate from "../middleware/authenticate.js"

const router = express.Router()

router.post("/add", authenticate, addExpense)

router.get("/:userId", authenticate, getExpenses)

router.delete("/delete/:id", authenticate, deleteExpense)

export default router