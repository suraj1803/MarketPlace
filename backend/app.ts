import dotenv from "dotenv";
import express from "express";
import dbConnect from "./src/db/dbConnect";
import authRouter from "./src/routes/authRouter";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

//  just a small authentication test
app.get("/", (req, res, next) => {
  const authHeader = req.headers["authorization"]?.split(" ")[1];
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET as string);
    console.log("Private route accesssed");
    res.json({ message: "Private route accessed" });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

dbConnect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    process.exit(1);
  });
