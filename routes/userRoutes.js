import express from 'express'
import { registerUser,loginUser, getUserBalance, transferBalance,getTransactionDetails, registerAdmin } from '../controllers/userController.js'
import {protect,isAdmin} from '../Middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/balance',protect,getUserBalance)
router.post('/transfer',protect,transferBalance)
router.get('/transactions', protect, isAdmin,getTransactionDetails)
router.post('/adminReg',registerAdmin)

export default router
