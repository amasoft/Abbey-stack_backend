import { PrismaClient, Relationship } from "@prisma/client";
import prisma from "../../config/prisma";
prisma
export class SocialRelationRepository {
  async sendFriendRequest(followerId: number, followingId: number) {
    return prisma.relationship.create({
      data: {
        followerId, // the person sending the request
        followingId, // the person receiving the request
      },
    })
  }


  async findRequestById(id: number) {
    return prisma.relationship.findUnique({ where: { id } });
  }
  async findExistingRequest(
    followerId: number,
    followingId: number
  ): Promise<Relationship | null> {
    return prisma.relationship.findFirst({
      where: {
        OR: [
          { followerId, followingId },
          { followerId: followingId, followingId: followerId }, // B → A
        ],
      },
      select: {
        id: true,
        followerId: true,
        followingId: true,
        status: true,
        createdAt: true,
      },
    });
  }

  async getAllRequest(userID: number): Promise<Relationship[]> {
    return prisma.relationship.findMany({ where: { followerId: userID } });
  }

  async updateRelationStatus(relationshipId: number, status: "ACCEPTED" | "REJECTED") {
    return prisma.relationship.update({
      where: { id: relationshipId },
      data: { status },
    });
  }
}