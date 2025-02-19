import express, { Request, Response } from "express";
import Item from "../db/ItemModel";
import User from "../db/userModel";

const itemRouter = express.Router();

itemRouter.post("/add", async (req: Request, res: Response) => {
  try {
    const { name, description, price, sellerId } = req.body;
    const user = await User.findOne({ _id: sellerId });
    if (user) {
      if (user.itemCount == 10)
        return res.json({
          success: false,
          message: "Maximum Selling item is 10",
        });
      else user.itemCount += 1;
      await user.save();
    }
    const newItem = new Item({ name, description, price, sellerId });
    await newItem.save();
    res.status(200).json({ success: true, data: newItem });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

itemRouter.get("/", async (req: Request, res: Response) => {
  try {
    const items = await Item.find();
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

export default itemRouter;
