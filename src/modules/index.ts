import { Router } from "express";
import userRouter from "./user/user.routes";
import authRouter from "./auth/auth.routes";
import relationRouter from "./SocialRelations/SocialRelations.routes";
const router = Router()

router.use("/auth",authRouter)
router.use('/user', userRouter)
router.use('/relation', relationRouter)
router.use("/test", () => {
    console.log("index testing")
})

export default router