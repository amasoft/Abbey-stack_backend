import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UserController } from '../modules/user/user.controller';
import { UserRepository } from '../modules/user/user.repository';

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