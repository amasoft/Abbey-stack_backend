import Router from "express";
import { UserController } from "./user.controller";
import { isAuthenticatd } from "../../utils/middlewares";
const userRouter = Router();

userRouter.get('/profile',isAuthenticatd, UserController.getProfile)
userRouter.put('/profile',isAuthenticatd, UserController.updateProfile)
userRouter.get('/',UserController.getAllUsers)

export default userRouter