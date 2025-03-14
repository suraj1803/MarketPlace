import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv, { configDotenv } from "dotenv";
import { TokenPayLoad } from "../services/auth-services";

configDotenv();

export function isAuthenticated(
  req: Request,
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

    (req as any).userId = decoded._id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Access is Denied" });
  }
}
