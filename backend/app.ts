import { configDotenv } from "dotenv";
import express, { Response, Request } from "express";
import User from "./db/userModel";
import bcrypt from "bcrypt";
import dbConnect from "./db/dbConnect";
import authRouter, { AuthRequest } from "./routes/auth";
import jwt from "jsonwebtoken";
import verifyToken from "./middleware/authMiddleware";

configDotenv();

const app = express();

app.use(express.json());

app.get("/", verifyToken, (req: Request, res: Response) => {
  res.status(200).json({ message: "Protected route accessed" });
});

app.post("/api/signup", async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already used." }); // Always 200 OK
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.json({ success: true, message: "User created successfully" }); // 200 OK
  } catch (error) {
    console.error("Signup error:", error); // Log for debugging
    return res.json({ success: false, message: "Internal server error" }); // Still 200 OK
  }
});

app.post(
  "/api/login",
  async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ success: false, message: "Email not registered" });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid password" });
      }

      const token = jwt.sign(
        { userId: user._id, email },
        process.env.JWT_SECRET as string
      );

      res.status(200).json({ success: true, token });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  }
);

dbConnect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    process.exit(1);
  });
