import { UserExist, validate } from './../../utils/middlewares';
import Router from "express";
import { AuthController } from "./auth.controller";
import { registerSchema } from '../../validators/authValidator';
AuthController
const authRouter = Router();

authRouter.post('/register', UserExist,validate(registerSchema), AuthController.createUser)
authRouter.post('/login', AuthController.login)

export default authRouter