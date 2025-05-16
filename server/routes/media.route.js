import express from "express";
import upload from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";

const mediaRouter = express.Router();

mediaRouter.post("/upload-video", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadMedia(req.file?.path);
    return res.status(201).json({
      data: result,
      success: true,
      message: "File uploaded.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Something went wrong while uploading file. : ${error?.message}`,
    });
  }
});

export default mediaRouter;
