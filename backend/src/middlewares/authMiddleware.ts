import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv, { configDotenv } from "dotenv";
import { TokenPayLoad } from "../services/auth-services";
import User from "../db/userModel";

configDotenv();

export interface MyRequest extends Request {
  user?: any;
  userId?: string;
}

export async function isAuthenticated(
  req: MyRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  // INFO: attached user id to the request

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as TokenPayLoad;

    const user = await User.findById(decoded._id).select("-password");
    req.user = user;
    req.userId = decoded._id.toString();
    next();
  } catch (error) {
    res.status(401).json({ message: "Access is Denied" });
  }
}
