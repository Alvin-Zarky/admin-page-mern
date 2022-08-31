import express from "express"
import { userLogin, userRegister, userLogOut, userProfile, countAllUser } from "../controller/userController"
import { authMiddleware } from "../middleware/authTokenMiddleware"

const router = express.Router()
router.post('/login', userLogin)
router.post('/register', userRegister)
router.get('/logout', authMiddleware, userLogOut)
router.get('/profile', authMiddleware, userProfile)
router.get('/all', authMiddleware, countAllUser)

export default router