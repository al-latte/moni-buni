import express from "express"
import authenticate from "../middleware/authenticate.js"
import { addWallet, editWallet, getWallets, deleteWallet } from "../controllers/wallet.controller.js"

const router = express.Router()

router.post("/add", authenticate, addWallet)

router.put("/edit/:id", authenticate, editWallet)

router.get("/:userId", authenticate, getWallets)

router.delete("/delete/:id", authenticate, deleteWallet)

export default router