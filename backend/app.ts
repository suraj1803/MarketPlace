import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import dbConnect from "./src/db/dbConnect";
import authRouter from "./src/routes/authRouter";
import privateRouter from "./src/routes/protectedRoute";
import itemRouter from "./src/routes/itemRouter";
import userRouter from "./src/routes/userRouter";
import uploadRoute from "./src/routes/uploadRoute";
import fs from "fs";
import cors from "cors";

dotenv.config();

const app = express();

// Create uploads directory if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Create uploads directory if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

//app.use(
//  cors({
//    origin: [
//      "http://localhost:5173", // Development
//      //"https://marketplace.bsuraj.tech", // Production
//    ],
//    credentials: true, // Allow cookies & authentication headers
//  }),
//);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/items", itemRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/upload", uploadRoute);

app.use(privateRouter, (req, res) => {
  //console.log((req as CustomRequest).user);
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
