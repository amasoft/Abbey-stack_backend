import { Router } from "express";
import userRouter from "./user/user.routes";

const router = Router()

router.use("/user",userRouter)
router.use("/test", () => {
    console.log("index testing")
})

export default router