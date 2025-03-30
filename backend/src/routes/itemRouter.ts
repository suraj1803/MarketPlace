import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware";
import {
  createItem,
  deleteItem,
  getItem,
  getItems,
  getItemsByCategory,
} from "../controllers/item-controller";
import Item from "../db/ItemModel";
const itemRouter = express.Router();

itemRouter.post("/", isAuthenticated, createItem);
itemRouter.get("/", getItems);
itemRouter.get("/:id", getItem);
itemRouter.delete("/:id", isAuthenticated, deleteItem);
itemRouter.get("/category/:category", getItemsByCategory);

export default itemRouter;
