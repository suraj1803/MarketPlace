import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv, { configDotenv } from "dotenv";

configDotenv();

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  // INFO: haven't attached user id to the request

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
