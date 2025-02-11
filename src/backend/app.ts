import { configDotenv } from "dotenv";
import express, { Response, Request } from "express";
import User from "./db/userModel";
import bcrypt from "bcrypt";
import dbConnect from "./db/dbConnect";
import cors from "cors";

configDotenv();
const app = express();

app.use(express.json()); // Add this line
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true, // If you need to send cookies or authentication headers
  }),
);

//app.get("/", (req: Request, res: Response) => {
//  res.send("Hello World");
//});

app.post("/signup", async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" }); // Always 200 OK
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

dbConnect()
  .then(() => {
    app.listen(5173, () => {
      console.log("Server is running on port 5173");
    });
  })
  .catch((error) => {
    process.exit(1);
  });
