import { configDotenv } from "dotenv";
import express, { Response, Request } from "express";
import User from "./db/userModel";
import bcrypt from "bcrypt";
import dbConnect from "./db/dbConnect";

configDotenv();
const app = express();

app.use(express.json());

//app.get("/", (req: Request, res: Response) => {
//  res.send("Hello World");
//});

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

dbConnect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    process.exit(1);
  });
