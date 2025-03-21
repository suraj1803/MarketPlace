"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemsByCategory = exports.deleteItem = exports.getItem = exports.getAllItems = exports.createItem = void 0;
const ItemModel_1 = __importDefault(require("../db/ItemModel"));
const userModel_1 = __importDefault(require("../db/userModel"));
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, sellerId, imgUrl, category, condition } = req.body;
        const item = new ItemModel_1.default({
            name,
            description,
            price,
            sellerId,
            category,
            condition,
            imgUrl,
        });
        yield item.save();
        yield userModel_1.default.findByIdAndUpdate(sellerId, { $inc: { itemCount: 1 } });
        yield userModel_1.default.findByIdAndUpdate(sellerId, { $push: { items: item._id } });
        const populatedItem = yield ItemModel_1.default.findById(item._id).populate("sellerId", "name email");
        res.status(200).json({ success: true, item: populatedItem });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createItem = createItem;
const getAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield ItemModel_1.default.find({}).populate("sellerId", "name email");
        res.json({ success: true, items });
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
});
exports.getAllItems = getAllItems;
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield ItemModel_1.default.findById(req.params.id).populate("sellerId", "name email");
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json({ success: true, item });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getItem = getItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield ItemModel_1.default.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        const user = yield userModel_1.default.findById(item === null || item === void 0 ? void 0 : item.sellerId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (req.userId !== item.sellerId.toString()) {
            return res.status(401).json({ message: "Unauthorized access" });
        }
        yield ItemModel_1.default.findByIdAndDelete(req.params.id);
        yield userModel_1.default.findByIdAndUpdate(user._id, { $inc: { itemCount: -1 } });
        res.json({ success: true, data: item });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteItem = deleteItem;
const getItemsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.params;
        const items = yield ItemModel_1.default.find({
            category: { $regex: new RegExp(category, "i") },
        }).populate("sellerId", "name email");
        res.json({ success: true, items });
    }
    catch (error) {
        console.error("Error fetching items by category:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});
exports.getItemsByCategory = getItemsByCategory;
