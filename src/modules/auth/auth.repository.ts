import { PrismaClient, User } from "@prisma/client";
import prisma from "../../config/prisma";
import { UsersResponse } from "../user/dto/users";
export class AuthRepository {
 
  async createUser(data: any): Promise<Omit<User, 'password'>> {
    const user = await prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return user; 
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