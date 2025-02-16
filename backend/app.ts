import dotenv from "dotenv";
import express, { Request, Response } from "express";
import dbConnect from "./src/db/dbConnect";
import authRouter from "./src/routes/authRouter";
import jwt from "jsonwebtoken";
import privateRouter, { CustomRequest } from "./src/routes/protectedRoute";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

app.use("/private", privateRouter, (req, res) => {
  console.log((req as CustomRequest).user);
});

dbConnect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running on port https://localhost:${process.env.PORT}`,
      );
    });
  })
  .catch((error) => {
    process.exit(1);
  });
