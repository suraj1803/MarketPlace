import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = async () => {
  try {
    const dbUrl = process.env.MONGO_URL || "";
    await mongoose.connect(dbUrl);
    console.log("Connected to Mongo DB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

export default dbConnect;
