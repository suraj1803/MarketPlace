import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware";
import {
  createItem,
  deleteItem,
  getAllItems,
  getItem,
  getItemsByCategory,
} from "../controllers/item-controller";
const itemRouter = express.Router();

itemRouter.post("/", isAuthenticated, createItem);
itemRouter.get("/", getAllItems);
itemRouter.get("/:id", getItem);
itemRouter.delete("/:id", isAuthenticated, deleteItem);
itemRouter.get("/category/:category", getItemsByCategory);

export default itemRouter;
