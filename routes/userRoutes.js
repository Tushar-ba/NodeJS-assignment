import express from 'express'
import { registerUser,loginUser, getUserBalance, transferBalance } from '../controllers/userController.js'
import {protect} from '../Middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/balance',protect,getUserBalance)
router.post('/transfer',protect,transferBalance)


export default router
