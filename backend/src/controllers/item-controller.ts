import { Request, Response } from "express";
import Item from "../db/ItemModel";

export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, description, price, sellerId, imgUrl } = req.body;
    const newItem = new Item({
      name,
      description,
      price,
      sellerId,
      imgUrl,
    });
    await newItem.save();
    res.status(200).json({ success: true, message: newItem });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
