import { UserExist } from './../../utils/middlewares';
import Router from "express";
import { AuthController } from "./auth.controller";
AuthController
const authRouter = Router();

authRouter.post('/signup', UserExist, AuthController.createUser)
authRouter.post('/login', AuthController.login)

export default authRouter