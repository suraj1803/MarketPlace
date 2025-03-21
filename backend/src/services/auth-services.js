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
exports.generateToken = generateToken;
exports.createUser = createUser;
exports.authenticateUser = authenticateUser;
const userModel_1 = __importDefault(require("../db/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_key = process.env.JWT_SECRET;
function generateToken(user, secret_key) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
        };
        return jsonwebtoken_1.default.sign(payload, secret_key);
    });
}
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingUser = yield userModel_1.default.findOne({ email: data.email });
            if (existingUser) {
                return { success: false, message: "User already exists" };
            }
            if (data.password.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            }
            const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
            const user = new userModel_1.default(Object.assign(Object.assign({}, data), { password: hashedPassword }));
            yield user.save();
            const token = yield generateToken(user, secret_key);
            return {
                success: true,
                message: "User Created Successfully",
                token,
                userId: user._id ? user._id.toString() : "",
                email: user.email,
            };
        }
        catch (error) {
            throw error;
        }
    });
}
function authenticateUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return { success: false, message: "Invalid Credentials." };
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return { success: false, message: "Invalid Credentials." };
        }
        const token = yield generateToken(user, secret_key);
        return {
            success: true,
            token,
            email: user.email,
            name: user.name,
            userId: user._id ? user._id.toString() : "",
        };
    });
}
