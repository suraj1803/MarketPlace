import mongoose, { Schema } from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
    unique: false,
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
    required: [true, "Please provide the owner's information"],
  },
});

const Item = mongoose.model("Item", ItemSchema);
export default Item;
