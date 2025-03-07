import dotenv from "dotenv";
import express from "express";
import dbConnect from "./src/db/dbConnect";
import authRouter from "./src/routes/authRouter";
import privateRouter from "./src/routes/protectedRoute";
import itemRouter from "./src/routes/itemRouter";
import userRouter from "./src/routes/userRouter";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/items", itemRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.use(privateRouter, (req, res) => {
  // console.log((req as CustomRequest).user);
});

dbConnect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running on port https://localhost:${process.env.PORT}`,
      );
    });
  })
  .catch(() => {
    process.exit(1);
  });
