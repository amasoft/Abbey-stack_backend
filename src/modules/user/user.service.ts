import { UserRepository } from "./user.repository";
const userRepo = new UserRepository()
export class UserService {
    async createUser(data: any) {
        try {
            
            const user = await userRepo.createUser(data)
            return user
        } catch (error) {
           throw error 
        }
    }
}