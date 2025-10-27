import { Request, Response, NextFunction } from "express";
import { LoginUserDTO } from "./dto/auth";
import { AuthService } from "./auth.service";
const authService = new AuthService()
export class AuthController {


    static async createUser(req: Request, res: Response) {
        try {
            const user = await authService.createUser(req.body)
            res.status(201).json({
                status: 201,
                user,
                message: "User registered successfully",
            });

        } catch (error: any) {
            res.status(400).json({ error: error.message });

        }
    }

    static async login(req: Request, res: Response) {
        try {
            const data: LoginUserDTO = req.body;
            const user = await authService.loginUser(data);
            res.json({ message: "Login successful", ...user });
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    }
}