import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv, { configDotenv } from "dotenv";

configDotenv();
declare global {
  namespace Express {
    interface Request {
      userId?: string; // Optional, as it may not always be set
    }
  }
}

function verifyToken(req: Request, res: Response, next: NextFunction): any {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export default verifyToken;
