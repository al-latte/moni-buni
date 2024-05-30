import express from "express"
import { addIncome, deleteIncome, getIncomes } from "../controllers/income.controller.js"
import authenticate from "../middleware/authenticate.js"

const router = express.Router()

router.post("/add", authenticate, addIncome)

router.get("/:userId", authenticate, getIncomes)

router.delete("/delete/:id", authenticate, deleteIncome)

export default router