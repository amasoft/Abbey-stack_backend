import { UserRepository } from "./user.repository";
import { LoginUserDTO } from "../auth/dto/auth";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/tokens";
const userRepo = new UserRepository()

export class UserService {
     async getUserByID(id: number) {
        const user = await userRepo.findById(id)

        if (!user) throw new Error("User does not exit")
        return user
    }
 async updateUserProfile(id: number, data: { name?: string}) {
    return userRepo.updateUserById(id, data);
  }
    
  async getAllUsers() {
    return userRepo.getAllUsers();
  }
}
