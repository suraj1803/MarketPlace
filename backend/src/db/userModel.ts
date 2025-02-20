import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  itemCount: number;
  bio?: string;
  profilePicture?: string;
}

const UserSchema = new mongoose.Schema<UserDocument>({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  itemCount: {
    type: Number,
    default: 0,
  },
  bio: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
});

const User = mongoose.model<UserDocument>("User", UserSchema);
export default User;
