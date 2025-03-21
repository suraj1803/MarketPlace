"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
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
        type: [mongoose_1.default.Schema.Types.ObjectId],
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
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
