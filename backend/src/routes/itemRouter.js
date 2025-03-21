"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const item_controller_1 = require("../controllers/item-controller");
const itemRouter = express_1.default.Router();
itemRouter.post("/", authMiddleware_1.isAuthenticated, item_controller_1.createItem);
itemRouter.get("/", item_controller_1.getAllItems);
itemRouter.get("/:id", item_controller_1.getItem);
itemRouter.delete("/:id", authMiddleware_1.isAuthenticated, item_controller_1.deleteItem);
itemRouter.get("/category/:category", item_controller_1.getItemsByCategory);
exports.default = itemRouter;
