import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
const userService = new UserService()
export class UserController {


    static async createUser(req: Request, res: Response) {
        try {
            const user = await userService.createUser(req.body)
            res.status(201).json({
                status: 201,
                user,
                message: "User registered successfully",
            });

        } catch (error) {

        }
    }
}