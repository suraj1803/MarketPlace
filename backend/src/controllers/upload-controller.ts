import { Request, Response } from "express";
import cloudinary from "../utils/cloudnary";
import fs from "fs";
import sharp from "sharp";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload an image" });
    }

    const resizedImagePath = `${req.file.path}-resized.jpg`;

    await sharp(req.file.path)
      .resize({ width: 800 })
      .jpeg({ quality: 80 })
      .toFile(resizedImagePath);

    fs.unlinkSync(req.file.path);

    const result = await cloudinary.uploader.upload(resizedImagePath, {
      folder: "uploads",
    });

    fs.unlinkSync(resizedImagePath);

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    const resizedPath = `${req.file?.path}-resized.jpg`;
    if (fs.existsSync(resizedPath)) {
      fs.unlinkSync(resizedPath);
    }

    console.error("Error uploading image:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
