import { Request, Response } from "express";
import { RelationService } from "./SocialRelations.service";
// import { createRelationSchema } from "./relations.dto";

const relationService = new RelationService();

export class RelationController {
    // static async sendRequest(req: Request, res: Response) {
    //     try {
    //         const senderId = Number(req.user?.id);
    //         const { receiverId } = req.body;

    //         //   const { error } = friendRequestSchema.validate({ receiverId });
    //         //   if (error) return res.status(400).json({ message: error.details[0].message });
    //         // console.log(`recieved : ${receiverId} ${senderId}`)
    //         // const request = await relationService.sendFriendRequest(senderId, receiverId);

    //         if (senderId === receiverId) {
    //             throw new Error("You cannot send a friend request to yourself");
    //         }

    //         const existing = await relationService.findExistingRequest(senderId, receiverId);
    //         console.log(`sendFriendRequest ${JSON.stringify(existing)}`)
    //         if (existing) {
    //             if (existing.status === "PENDING") throw new Error("Request already pending");
    //             if (existing.status === "ACCEPTED") throw new Error("Already friends");
    //         }
    //         const sendrequest = await relationService.sendFriendRequest(senderId, receiverId);
    //         return res.status(201).json({ message: "Friend request sent", data: sendrequest });
    //     } catch (err: any) {
    //         return res.status(400).json({ message: err.message });
    //     }
    // }


    static async sendRequest(req: Request, res: Response) {
    try {
        const senderId = Number(req.user?.id);
        const { receiverId } = req.body;

        if (senderId === receiverId) {
            return res.status(400).json({ message: "You cannot send a friend request to yourself" });
        }

        
        const sendrequest = await relationService.sendFriendRequest(senderId, receiverId);
        return res.status(201).json({ message: "Friend request sent", data: sendrequest });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

    static async updateRequest(req: Request, res: Response) {
        try {
            const { requestId, status } = req.body;
            const userId = Number(req.user?.id);
            //   const { error } = respondRequestSchema.validate({ requestId, status });
            //   if (error) return res.status(400).json({ message: error.details[0].message });
            console.log(`updateRequest  ${userId}  requestId:${requestId}`)
            const response = await relationService.respondToRequest(requestId, status, userId);
            return res.status(200).json({ message: `Request ${status.toLowerCase()}`, data: response });
        } catch (err: any) {
            return res.status(400).json({ message: err.message });
        }
    }

    static async getAllRequest(req: Request, res: Response) {
        try {
            const userId = Number(req.user?.id);


            const response = await relationService.getAllRequest(userId);
            return res.status(200).json({ message: `All Request`, data: response });
        } catch (err: any) {
            return res.status(400).json({ message: err.message });
        }
    }
    static async getFellowers(req: Request, res: Response) {
        try {
            const userId = Number(req.user?.id);


            const response = await relationService.getFollowers(userId)
            return res.status(200).json({ message: `All follwers`, data: response });
        } catch (err: any) {
            return res.status(400).json({ message: err.message });
        }
    }
static async getFellowing(req: Request, res: Response) {
        try {
            const userId = Number(req.user?.id);


            const response = await relationService.getFollowing(userId)
            return res.status(200).json({ message: `All follwers`, data: response });
        } catch (err: any) {
            return res.status(400).json({ message: err.message });
        }
    }

    //   async getPendingRequests(req: Request, res: Response) {
    //     try {
    //       const userId = Number(req.user?.id);
    //       const requests = await service.getPendingRequests(userId);
    //       return res.status(200).json({ count: requests.length, requests });
    //     } catch (err: any) {
    //       return res.status(400).json({ message: err.message });
    //     }
    //   }

    //   async getFriends(req: Request, res: Response) {
    //     try {
    //       const userId = Number(req.user?.id);
    //       const friends = await service.getFriends(userId);
    //       return res.status(200).json({ count: friends.length, friends });
    //     } catch (err: any) {
    //       return res.status(400).json({ message: err.message });
    //     }
    //   }
}
