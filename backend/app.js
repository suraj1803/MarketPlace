"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const dbConnect_1 = __importDefault(require("./src/db/dbConnect"));
const authRouter_1 = __importDefault(require("./src/routes/authRouter"));
const protectedRoute_1 = __importDefault(require("./src/routes/protectedRoute"));
const itemRouter_1 = __importDefault(require("./src/routes/itemRouter"));
const userRouter_1 = __importDefault(require("./src/routes/userRouter"));
const uploadRoute_1 = __importDefault(require("./src/routes/uploadRoute"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Create uploads directory if it doesn't exist
if (!fs_1.default.existsSync("uploads")) {
    fs_1.default.mkdirSync("uploads");
}
// Create uploads directory if it doesn't exist
if (!fs_1.default.existsSync("uploads")) {
    fs_1.default.mkdirSync("uploads");
}
//app.use(
//  cors({
//    origin: [
//      "http://localhost:5173", // Development
//      //"https://marketplace.bsuraj.tech", // Production
//    ],
//    credentials: true, // Allow cookies & authentication headers
//  }),
//);
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/items", itemRouter_1.default);
app.use("/api/auth", authRouter_1.default);
app.use("/api/users", userRouter_1.default);
app.use("/api/upload", uploadRoute_1.default);
app.use(protectedRoute_1.default, (req, res) => {
    //console.log((req as CustomRequest).user);
});
(0, dbConnect_1.default)()
    .then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port https://localhost:${process.env.PORT}`);
    });
})
    .catch(() => {
    process.exit(1);
});
