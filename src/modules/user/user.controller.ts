import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { LoginUserDTO } from "../auth/dto/auth";
const userService = new UserService()
export class UserController {

    static async getProfile(req: Request, res: Response) {
        try {

            const userId = Number(req.user?.id)
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const user = await userService.getUserByID(userId)

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({
                message: "Profile fetched successfully",
                data: user,
            });
        } catch (error) {
      res.status(500).json({ message: "Internal Server Error",error:error });

        }
    }

    static async updateProfile(req: Request, res: Response) {
        try {
      const userId = Number(req.user?.id);
      if (!userId) return res.status(401).json({ message: "Unauthorized" });

      const { name } = req.body;
      const updated = await userService.updateUserProfile(userId, { name });

      return res.status(200).json({
        message: "Profile updated successfully",
        data: updated,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Update failed" });
    }
    }

    static async getAllUsers(req: Request, res: Response) {
        try {

            

            const user = await userService.getAllUsers()

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({
                message: "All Users",
                data: user,
            });
        } catch (error) {
      res.status(500).json({ message: "Internal Server Error",error:error });

        }
    }
}