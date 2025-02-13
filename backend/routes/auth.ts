import { Request, Response } from "express";
import express from "express";
import bcrypt from "bcrypt";
import User from "../db/userModel";
import jwt from "jsonwebtoken";
import dotenv, { configDotenv } from "dotenv";

configDotenv();
export interface AuthRequestBody {
  email: string;
  password: string;
  [key: string]: any;
}

export interface AuthRequest extends Request {
  body: AuthRequestBody;
}

const authRouter = express.Router();

authRouter.post(
  "/app/login",
  async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ success: false, message: "Email not registered" });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.json({ success: false, message: "Invalid password" });
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  },
);

export default authRouter;
