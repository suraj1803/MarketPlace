import { Request, Response } from "express";
import User from "../db/userModel";
import Item from "../db/ItemModel";
import { MyRequest } from "../middlewares/authMiddleware";
import cloudinary from "../utils/cloudnary";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

export const getUserItems = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }
    const items = await Item.find({ _id: { $in: user.items } });
    res.json({ success: true, user, items });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

export const updateUser = async (req: MyRequest, res: Response) => {
  try {
    const { name, bio, imgUrl } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { name, bio, imgUrl },
      { new: true, select: "-password" },
    );
    if (!updatedUser) {
      return res.json({ success: false, message: "User not found." });
    }
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};
