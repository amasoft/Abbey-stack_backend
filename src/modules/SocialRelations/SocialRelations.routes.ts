import Router from "express";
import { RelationController } from "./SocialRelations.controller";
import { isAuthenticatd } from "../../utils/middlewares";

const relationRouter = Router();

relationRouter.post('/sendfriendrequest',isAuthenticatd, RelationController.sendRequest)
relationRouter.post('/respondTorequest',isAuthenticatd, RelationController.updateRequest)
relationRouter.get('/allrequest',isAuthenticatd, RelationController.getAllRequest)
relationRouter.delete('/deleterequest',isAuthenticatd, RelationController.getAllRequest)

export default relationRouter