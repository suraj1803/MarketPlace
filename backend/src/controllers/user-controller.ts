import { Request, Response } from "express";
import User from "../db/userModel";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};
