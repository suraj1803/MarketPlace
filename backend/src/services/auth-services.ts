import User from "../db/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser(data: any) {
  try {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }
    if (data.password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User({ ...data, password: hashedPassword });
    await user.save();
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
    );
    return {
      success: true,
      message: "User Created Successfully",
      token,
      userId: user._id ? user._id.toString() : "",
      email: user.email,
    };
  } catch (error) {
    throw error;
  }
}

export async function authenticateUser(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) {
    return { success: false, message: "Invalid Credentials." };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { success: false, message: "Invalid Credentials." };
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET as string,
  );
  return {
    success: true,
    token,
    email: user.email,
    name: user.name,
    userId: user._id ? user._id.toString() : "",
  };
}
