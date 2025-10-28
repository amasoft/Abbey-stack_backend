import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UserController } from '../modules/user/user.controller';
import { UserRepository } from '../modules/user/user.repository';
import { RelationService } from '../modules/SocialRelations/SocialRelations.service';
import { ObjectSchema } from "joi";
const relationService = new RelationService()
const userRepository = new UserRepository()
interface AuthenticatedRequest extends Request {
  user?: any;
}
export const isAuthenticatd = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];
  console.log(`Authheader::: ${process.env.JWTSECRET}`)
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET!) as { id: string };
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }

}
export const UserExist = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const userExist = await userRepository.findByEmail(email);
  if (userExist) {
    return res.json({
      status: 409,
      message: "user Already exist",
    });
  }
  next();
};
export const UserExistByID = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = req.body.receiverId;
  const userExist = await userRepository.findById(user_id);
  if (userExist) {
    next()
    return
  }
  return res.json({
    status: 409,
    message: "user does not exist",
  });

};

export const CheckFriendRequest = async (req: Request, res: Response, next: NextFunction) => {
  const senderId = Number(req.user?.id);
  const { receiverId } = req.body;
  const existing = await relationService.findExistingRequest(senderId, receiverId);

  if (existing) {
    if (existing.status === "PENDING") {
      return res.status(400).json({ message: "Request already pending" });
    }
    if (existing.status === "ACCEPTED") {
      return res.status(400).json({ message: "Already friends" });
    }
  }
  next()

};


export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({ message: "Validation failed", errors });
    }

    next();
  };
};
