import { Request, Response } from "express";
import Item from "../db/ItemModel";
import User from "../db/userModel";

export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, description, price, sellerId, imgUrl, category, condition } =
      req.body;
    const item = new Item({
      name,
      description,
      price,
      sellerId,
      category,
      condition,
      imgUrl,
    });
    await item.save();
    await User.findByIdAndUpdate(sellerId, { $inc: { itemCount: 1 } });
    await User.findByIdAndUpdate(sellerId, { $push: { items: item._id } });
    const populatedItem = await Item.findById(item._id).populate(
      "sellerId",
      "name email",
    );
    res.status(200).json({ success: true, item: populatedItem });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find({}).populate("sellerId", "name email");
    res.json({ success: true, items });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "sellerId",
      "name email",
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    const user = await User.findById(item?.sellerId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if ((req as any).userId !== item.sellerId.toString()) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    await Item.findByIdAndDelete(req.params.id);

    await User.findByIdAndUpdate(user._id, { $inc: { itemCount: -1 } });

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getItemsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const items = await Item.find({
      category: { $regex: new RegExp(category, "i") },
    }).populate("sellerId", "name email");

    res.json({ success: true, items });
  } catch (error) {
    console.error("Error fetching items by category:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
