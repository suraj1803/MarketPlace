import express, { Request, Response } from "express";
import multer from "multer";
import { uploadImage } from "../controllers/upload-controller";
import { isAuthenticated } from "../middlewares/authMiddleware";

const uploadRoute = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const filterFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter: filterFilter,
  limits: { fileSize: 7 * 1024 * 1024 },
});

uploadRoute.post("/", isAuthenticated, upload.single("image"), uploadImage);

export default uploadRoute;
