import { LoginUserDTO } from "./dto/auth";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/tokens";
import { AuthRepository } from "./auth.repository";
const authRepo = new AuthRepository()
export class AuthService {
    async createUser(data: any) {
        try {
            // Hash password before saving
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            const userData = { ...data, password: hashedPassword }
            const user = await authRepo.createUser(userData)
            const token = generateToken({ id: user.id, email: user.email });

            return token
        } catch (error) {
            throw error
        }
    }

    async loginUser(data: LoginUserDTO) {
        const user = await authRepo.findByEmail(data.email);
        if (!user) throw new Error("Invalid email or password");

        const validPassword = await bcrypt.compare(data.password, user.password);
        if (!validPassword) throw new Error("Invalid  email or password");

        const token = generateToken({ id: user.id, email: user.email });
        return { token };
    }
}
