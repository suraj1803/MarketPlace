"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const upload_controller_1 = require("../controllers/upload-controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const uploadRoute = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const filterFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new Error("Only images are allowed"));
    }
};
const upload = (0, multer_1.default)({
    storage,
    fileFilter: filterFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
});
uploadRoute.post("/", authMiddleware_1.isAuthenticated, upload.single("image"), upload_controller_1.uploadImage);
exports.default = uploadRoute;
