"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const privateRouter = express_1.default.Router();
privateRouter.get("/api", (req, res, next) => {
    var _a;
    const authHeader = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(authHeader, process.env.JWT_SECRET);
        //🔴 just a  work around for now
        req.user = decoded;
        res.json({ success: true, message: "Private route accessed" });
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
});
exports.default = privateRouter;
