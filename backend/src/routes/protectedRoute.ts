import express, { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const privateRouter = express.Router();

export interface CustomRequest extends Request {
  user: string | JwtPayload;
}

// refactor is needed
privateRouter.get("/api", (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"]?.split(" ")[1];
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET as string);

    //🔴 just a  work around for now
    (req as CustomRequest).user = decoded;

    res.json({ success: true, message: "Private route accessed" });
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

export default privateRouter;
