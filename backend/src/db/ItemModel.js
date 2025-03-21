"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const allowedCategories = [
    "electronics",
    "clothing",
    "home",
    "toys",
    "sports",
    "books",
    "other",
];
const ItemSchema = new mongoose_1.default.Schema({
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
            message: "Invalid category. Allowed categories are: electronics, furniture, books, clothing, sports, accessories.",
        },
        required: [true, "Please provide a category."],
    },
    condition: {
        type: String,
        required: [true, "Please provide a condition."],
        unique: false,
    },
    sellerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Item = mongoose_1.default.model("Item", ItemSchema);
exports.default = Item;
