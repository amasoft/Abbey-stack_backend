import { UsersResponse } from './dto/users';
import { PrismaClient, User } from "@prisma/client";
import prisma from "../../config/prisma";
export class UserRepository {
    async createUser(data: any): Promise<User> {

        return await prisma.user.create({ data })

    }


    async findById(id: number): Promise<UsersResponse | null> {
        return prisma.user.findUnique({ where: { id }, 
          select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      } });
    }

    async getAllUsers(): Promise<UsersResponse[]> {
        return prisma.user.findMany({select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },});
    }


  async findByEmail(email: string): Promise<UsersResponse | null> {
    return prisma.user.findUnique({ where: { email }, });
  }

   async updateUserById(id: number, data: { name?: string; email?: string }) {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }


}