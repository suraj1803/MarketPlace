import mongoose from "mongoose";

interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
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
});

// Create and export the User model
const User = mongoose.model<UserDocument>("User", UserSchema);
export default User;
