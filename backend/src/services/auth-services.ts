import User from "../db/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser(data: any) {
  try {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    if (data.password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User({ ...data, password: hashedPassword });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
}

export async function authenticateUser(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Credentials.");
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET as string,
  );
  return { token, email: user.email, name: user.name };
}
