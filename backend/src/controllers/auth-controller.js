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
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const auth_services_1 = require("../services/auth-services");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = yield (0, auth_services_1.createUser)(req.body);
            if (!userData.success) {
                return res.json({ success: false, message: userData.message });
            }
            res.status(200).json(Object.assign({}, userData));
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const result = yield (0, auth_services_1.authenticateUser)(email, password);
            if (!result.success) {
                return res.json({ success: false, message: result.message });
            }
            res.status(200).json(Object.assign({}, result));
        }
        catch (error) {
            res.status(400).json({ success: false, message: "Internal Server Error" });
        }
    });
}
