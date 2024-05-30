// Package imports
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

//File imports
import connectToMongoDB from "./database/mongo.database.js"
import authRoutes from "./routes/auth.routes.js"
import expenseRoutes from "./routes/expense.routes.js"
import incomeRoutes from "./routes/income.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import walletRoutes from "./routes/wallet.routes.js"

// Variables
const app = express()
const PORT = process.env.PORT || 5000

// Configurations
dotenv.config()

// Middleware
app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/expenses", expenseRoutes)
app.use("/api/incomes", incomeRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/wallets", walletRoutes)

// Server
app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Server running on port ${PORT}`)
})
