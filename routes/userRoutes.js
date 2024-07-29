import express from 'express'
import { registerUser,loginUser, getUserBalance, transferBalance,getTransactionDetails, registerAdmin, getUserTransactions } from '../controllers/userController.js'
import {protect,isAdmin} from '../Middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/balance',protect,getUserBalance)
router.post('/transfer',protect,transferBalance)
router.get('/transactions', protect,isAdmin,getTransactionDetails)
router.post('/adminReg',registerAdmin)
router.get('/getUserTranasaction', protect, getUserTransactions)

export default router
