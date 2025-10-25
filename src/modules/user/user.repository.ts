import { PrismaClient, User } from "@prisma/client";
import prisma from "../../config/prisma";
export class UserRepository {
    async createUser(data: any): Promise<User> {

        return await prisma.user.create({ data })

    }

}