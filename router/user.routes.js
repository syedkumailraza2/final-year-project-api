import express from "express"
import {login, register} from "../controller/user.controller.js"
import { upload } from "../middleware/multer.middleware.js"
const userRouter = express.Router()

userRouter.post('/register',upload.single('profilePic'),register)
userRouter.post('/login',login)

export default userRouter