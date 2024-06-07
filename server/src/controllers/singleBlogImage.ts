import { NextFunction, Request, Response } from "express";
import BlogImage from "../models/blogImages.js";
BlogImage;
export const getSingleImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogImage = await BlogImage.find({});
    res.status(200).json({
      success: true,
      blogImage,
    });
  } catch (err) {
    console.log(err);
  }
};
