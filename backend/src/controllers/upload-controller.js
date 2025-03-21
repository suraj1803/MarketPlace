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
exports.uploadImage = void 0;
const cloudnary_1 = __importDefault(require("../utils/cloudnary"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.file) {
            return res
                .status(400)
                .json({ success: false, message: "Please upload an image" });
        }
        const resizedImagePath = `${req.file.path}-resized.jpg`;
        yield (0, sharp_1.default)(req.file.path)
            .resize({ width: 800 })
            .jpeg({ quality: 80 })
            .toFile(resizedImagePath);
        fs_1.default.unlinkSync(req.file.path);
        const result = yield cloudnary_1.default.uploader.upload(resizedImagePath, {
            folder: "uploads",
        });
        fs_1.default.unlinkSync(resizedImagePath);
        return res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            data: {
                url: result.secure_url,
                public_id: result.public_id,
            },
        });
    }
    catch (error) {
        if (req.file && fs_1.default.existsSync(req.file.path)) {
            fs_1.default.unlinkSync(req.file.path);
        }
        const resizedPath = `${(_a = req.file) === null || _a === void 0 ? void 0 : _a.path}-resized.jpg`;
        if (fs_1.default.existsSync(resizedPath)) {
            fs_1.default.unlinkSync(resizedPath);
        }
        console.error("Error uploading image:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.uploadImage = uploadImage;
