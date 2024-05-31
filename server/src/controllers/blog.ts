import { NextFunction, Request, Response } from "express";
import BlogPost from "../models/blogPosts.js";
import { rm } from "fs";

export const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogs = await BlogPost.find({});
    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (err) {
    next(err);
  }
};

export const getSingleBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const blog = await BlogPost.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not Found",
      });
    }

    res.json({
      success: true,
      message: `Blog with id:${blog._id} found`,
      blog,
    });
  } catch (err) {
    next(err);
  }
};

export const addBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, overview, description, createdAt, updatedAt } = req.body;
    const image = req.file;
    if (!image)
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      });

    if (!image)
      return res.status(404).json({
        success: false,
        message: "Image created Successfully",
      });

    if (!title || !overview || !description) {
      rm(image.path, () => {
        console.log("Deleted");
      });

      return res.status(400).json({
        success: false,
        message: "Enter all field properly",
      });
    }

    const blogs = await BlogPost.create({
      title,
      overview,
      description,
      createdAt,
      updatedAt,
      image: image.path,
    });
    res.status(201).json({
      success: true,
      message: "Blog Added Successfully",
      blogs,
    });
  } catch (err) {
    next(err);
  }
};

export const editBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, overview, description, createdAt, updatedAt } = req.body;
    const image = req.file;
    const blog = await BlogPost.findByIdAndUpdate(
      id,
      {
        title,
        overview,
        description,
        createdAt,
        updatedAt,
        image: image?.path,
      },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Blog Edited Successfully",
      blog,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  try {
    const deletedBlog = await BlogPost.findByIdAndDelete(id);
    if (deletedBlog) {
      res.json({ success: true, message: "Blog deleted Successfully" });
    } else {
      res.status(404).json({ success: false, message: "Blog not found" });
    }
  } catch (err) {
    next(err);
  }
};

// Route to search blogs by date range
export const filterBlog = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "Start date and end date are required" });
  }

  try {
    // Convert string dates to Date objects
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    const posts = await BlogPost.find({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    }).sort({ createdAt: 1 });

    // Format dates before sending the response
    const formattedPosts = posts.map((post) => ({
      ...post.toObject(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));

    res.json(formattedPosts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

// Route to search blogs by title
export const searchByTitle = async (req: Request, res: Response) => {
  const { title } = req.query;
  if (!title) {
    return res.status(400).json({ error: "Title query parameter is required" });
  }
  try {
    const blogs = await BlogPost.find({
      title: new RegExp(title as string, "i"),
    });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  res.json(req.file);
};
