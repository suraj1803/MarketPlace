import express from "express";
import { getUser } from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.get("/:id", getUser);

export default userRouter;
