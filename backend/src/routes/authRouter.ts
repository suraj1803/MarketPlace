import express from "express";
import { registerUser, loginUser } from "../controllers/auth-controller";

const authRouter = express.Router();

authRouter.post("/signup", registerUser);
authRouter.post("/login", loginUser);

export default authRouter;
