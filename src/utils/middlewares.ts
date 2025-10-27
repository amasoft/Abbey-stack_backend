import jwt  from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';


interface AuthenticatedRequest extends Request {
  user?: any;
}
export const isAuthenticatd = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const authHeader=req.headers.authorization
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