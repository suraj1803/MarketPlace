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
exports.getUserItems = exports.getUser = void 0;
const userModel_1 = __importDefault(require("../db/userModel"));
const ItemModel_1 = __importDefault(require("../db/ItemModel"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.params.id).select("-password");
        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }
        res.json({ success: true, user });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error });
    }
});
exports.getUser = getUser;
const getUserItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.params.id);
        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }
        const items = yield ItemModel_1.default.find({ _id: { $in: user.items } });
        res.json({ success: true, user, items });
    }
    catch (error) {
        res.json({ success: false, message: error });
    }
});
exports.getUserItems = getUserItems;
