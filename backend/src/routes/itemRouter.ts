import express, { Request, Response } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { createItem } from "../controllers/item-controller";

const itemRouter = express.Router();

itemRouter.post("/", isAuthenticated, createItem);

export default itemRouter;
