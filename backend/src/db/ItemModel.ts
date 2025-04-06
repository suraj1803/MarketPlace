import mongoose, { Schema } from "mongoose";

const allowedCategories = [
  "electronics",
  "clothing",
  "home",
  "toys",
  "vehicles",
  "furnitures",
  "sports",
  "books",
  "other",
];

export interface ItemDocument extends mongoose.Document {
  name: string;
  imgUrl: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  sellerId: Schema.Types.ObjectId;
  createdAt: Date;
}

const ItemSchema = new mongoose.Schema<ItemDocument>({
  name: {
    type: String,
    required: [true, "Please provide a name."],
    unique: false,
  },
  imgUrl: {
    type: String,
    required: [true, "Please provide an image."],
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
  category: {
    type: String,
    enum: {
      values: allowedCategories,
      message:
        "Invalid category. Allowed categories are: electronics, furniture, books, clothing, sports, accessories.",
    },
    required: [true, "Please provide a category."],
  },
  condition: {
    type: String,
    required: [true, "Please provide a condition."],
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

ItemSchema.index({ name: "text", description: "text", category: "text" });

const Item = mongoose.model("Item", ItemSchema);
export default Item;
