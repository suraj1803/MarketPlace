import express from "express";
import { getUser, getUserItems } from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.get("/:id", getUser);
userRouter.get("/:id/items", getUserItems);

export default userRouter;
