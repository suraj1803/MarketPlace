import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  itemCount: number;
  bio?: string;
  imgUrl?: string;
  items: mongoose.ObjectId[];
  createdAt: Date; // Add this field to the interface
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
  items: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  bio: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  // Add the createdAt field
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model<UserDocument>("User", UserSchema);
export default User;
