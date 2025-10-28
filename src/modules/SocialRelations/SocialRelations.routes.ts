import Router from "express";
import { RelationController } from "./SocialRelations.controller";
import { CheckFriendRequest, isAuthenticatd, UserExistByID } from "../../utils/middlewares";

const relationRouter = Router();

relationRouter.post('/sendfriendrequest', isAuthenticatd, UserExistByID,CheckFriendRequest, RelationController.sendRequest)
relationRouter.post('/respondTorequest', isAuthenticatd, RelationController.updateRequest)
relationRouter.get('/allrequest', isAuthenticatd, RelationController.getAllRequest)
relationRouter.delete('/deleterequest', isAuthenticatd, RelationController.getAllRequest)
relationRouter.get('/followers', isAuthenticatd, RelationController.getFellowers)
relationRouter.get('/following', isAuthenticatd, RelationController.getFellowing)

export default relationRouter