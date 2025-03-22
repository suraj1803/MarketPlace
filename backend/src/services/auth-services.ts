import User from "../db/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret_key = process.env.JWT_SECRET as string;

interface UserInterface {
  _id: string;
  email: string;
  name: string;
}

export interface TokenPayLoad {
  _id: String;
  email: String;
}

export async function generateToken(user: UserInterface, secret_key: string) {
  const payload: TokenPayLoad = {
    _id: user._id,
    email: user.email,
  };

  return jwt.sign(payload, secret_key);
}

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
    const token = await generateToken(user as UserInterface, secret_key);
    const { password: _, ...modified_user } = user.toObject();
    modified_user._id = modified_user._id?.toString();
    return {
      success: true,
      message: "User Created Successfully",
      token,
      user: modified_user,
    };
  } catch (error) {
    throw error;
  }
}

export async function authenticateUser(email: string, password: string) {
  let user = await User.findOne({ email });
  if (!user) {
    return { success: false, message: "Invalid Credentials." };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { success: false, message: "Invalid Credentials." };
  }

  const token = await generateToken(user as UserInterface, secret_key);

  const { password: _, ...modified_user } = user.toObject();
  modified_user._id = modified_user._id?.toString();

  return {
    success: true,
    token,
    user: modified_user,
  };
}
