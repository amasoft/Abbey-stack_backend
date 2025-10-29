import { UpdateRequestDto } from "./DTO/dto";
import { SocialRelationRepository } from "./SocialRelations.repository";

const relationRepo = new SocialRelationRepository();

export class RelationService {
  async sendFriendRequest(senderId: number, receiverId: number) {
    console.log("AMADIIII")
    // if (senderId === receiverId) {
    //   throw new Error("You cannot send a friend request to yourself");
    // }

    // // const existing = await relationRepo.sendFriendRequest(senderId, receiverId);
    // const existing = await relationRepo.findExistingRequest(senderId, receiverId);
    // console.log(`sendFriendRequest ${JSON.stringify(existing)}`)
    // if (existing) {
    //   if (existing.status === "PENDING") throw new Error("Request already pending");
    //   if (existing.status === "ACCEPTED") throw new Error("Already friends");
    // }

    return relationRepo.sendFriendRequest(senderId, receiverId);
  }

  async findExistingRequest(senderId: number, receiverId: number) {
    console.log("AMADIIII")
    // if (senderId === receiverId) {
    //   throw new Error("You cannot send a friend request to yourself");
    // }

    // // const existing = await relationRepo.sendFriendRequest(senderId, receiverId);
    // const existing = await relationRepo.findExistingRequest(senderId, receiverId);
    // console.log(`sendFriendRequest ${JSON.stringify(existing)}`)
    // if (existing) {
    //   if (existing.status === "PENDING") throw new Error("Request already pending");
    //   if (existing.status === "ACCEPTED") throw new Error("Already friends");
    // }

    return relationRepo.findExistingRequest(senderId, receiverId);
  }

  async respondToRequest(requestId: number, status: UpdateRequestDto["status"], userId: number) {
    const request = await relationRepo.findRequestById(requestId)
    if (!request) throw new Error("Request not found");

    if(request.status=='ACCEPTED'){
            throw new Error("Your already friends");

    }
    const id = request.followerId
    console.log(`Patrick ${id} userid ${userId}`)
    // if (request.followerId !== userId)
    // if (request.followerId !== userId || request.followingId !== userId) throw new Error("You can`t perfom operation Here");

    if (request.followingId == userId){
      return relationRepo.updateRelationStatus(requestId, status);

    }else{

      throw new Error("You are not authorized to respond to this request");
    }
    //  if (request.followerId == userId)
    //   throw new Error("You are not authorized to respond to this request");
    // return relationRepo.updateRelationStatus(requestId, status);
  }

  async getAllRequest(userID: number) {
    const request = await relationRepo.getAllRequest(userID)
    if (!request) throw new Error("No Request Found");

    return request
  }
  // async getPendingRequests(userId: number) {
  //   return relationRepo.getPendingRequests(userId);
  // }

  async getFollowers(userId: number) {
    const followers = await relationRepo.getUserFollower(userId)
    return followers;
  }

  async getFollowing(userId: number) {
    const followers = await relationRepo.getUserFollowing(userId)
    return followers;
  }
}
