import { Request, Response } from "express";
import { authenticateUser, createUser } from "../services/auth-services";
import dotenv from "dotenv";
dotenv.config();

export async function registerUser(req: Request, res: Response) {
  try {
    const userCreation = await createUser(req.body);
    if (!userCreation.success) {
      return res.json({ success: false, message: userCreation.message });
    }
    res.status(200).json({ success: true, data: userCreation.data });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function loginUser(req: Request, res: Response): Promise<any> {
  try {
    const { email, password } = req.body;
    const result = await authenticateUser(email, password);
    if (!result.success) {
      return res.json({ success: false, message: result.message });
    }
    res.status(200).json({ ...result });
  } catch (error) {
    res.status(400).json({ success: false, message: "Internal Server Error" });
  }
}
