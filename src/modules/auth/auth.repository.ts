import { PrismaClient, User } from "@prisma/client";
import prisma from "../../config/prisma";
export class AuthRepository {
    async createUser(data: any): Promise<User> {

        return await prisma.user.create({ data })

    }


    async findById(id: number): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } });
    }

    async findAll(): Promise<User[]> {
        return prisma.user.findMany();
    }


  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

}