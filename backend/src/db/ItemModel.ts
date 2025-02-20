import mongoose, { Schema } from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
    unique: false,
  },
  imgUrl: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "Please give a short description."],
    unique: false,
  },
  price: {
    type: Number,
    required: [true, "Please provide price."],
    unique: false,
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model("Item", ItemSchema);
export default Item;
