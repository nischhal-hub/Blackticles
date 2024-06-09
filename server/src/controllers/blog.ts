import { NextFunction, Request, Response } from "express";
import BlogPost from "../models/blogPosts.js";
import slugify from "slugify";
import BlogImage from "../models/blogImages.js";
import { isValid, parseISO } from "date-fns";
import { format } from "date-fns-tz";
import ErrorHandler from "../utils/utility-class.js";

export const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogs = await BlogPost.find({});
    if (blogs.length == 0) {
      return next(new ErrorHandler("No Blogs Found", 404));
    }
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
    const { slug } = req.params;
    const blog = await BlogPost.findOne({ slug });
    if (!blog) {
      return next(new ErrorHandler("No blog Present", 404));
    }

    res.json({
      success: true,
      message: `Blog ${blog.slug} found`,
      blog,
    });
  } catch (err) {
    next(err);
  }
};
export const addBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, overview, description } = req.body;
    const image = req.file;

    if (!image) {
      return next(new ErrorHandler("No Image Added", 404));
    }
    const slug = slugify(title, { lower: true, strict: true });

    const newBlogPost = new BlogPost({
      title,
      overview,
      description,
      slug,
      image: image.path,
    });

    const savedBlogPost = await newBlogPost.save();

    res.status(201).json({
      success: true,
      message: "Blog Added Successfully",
      blog: savedBlogPost,
    });
  } catch (err) {
    next(err);
  }
};

export const editBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, overview, description } = req.body;
    const image = req.file;
    const blog = await BlogPost.findByIdAndUpdate(
      id,
      {
        title,
        overview,
        description,
        image: image?.path,
      },
      { new: true }
    );
    if (!blog) {
      return next(new ErrorHandler("No blog Found", 404));
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

export const deleteBlog = async (
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
      return next(new ErrorHandler("Blog not Found", 404));
    }
  } catch (err) {
    next(err);
  }
};

export const filterBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate && !endDate) {
      return next(new ErrorHandler("start and end date is needed", 404));
    }
    const start = parseISO(startDate as string);
    const end = parseISO(endDate as string);

    if (!isValid(start) || !isValid(end)) {
      return next(new ErrorHandler("Invalid Date Format", 400));
    }

    if (start > end) {
      return next(new ErrorHandler("End date must be after start date", 400));
    }

    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);

    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);

    const posts = await BlogPost.find({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    }).sort({ createdAt: 1 });

    const formattedPosts = posts.map((post) => ({
      ...post.toObject(),
      createdAt: format(post.createdAt, "yyyy-MM-dd'T'HH:mm:ssXXX", {
        timeZone: "UTC",
      }),
      updatedAt: format(post.updatedAt, "yyyy-MM-dd'T'HH:mm:ssXXX", {
        timeZone: "UTC",
      }),
    }));
    res.json(formattedPosts);
  } catch (err) {
    next(err);
  }
};

export const searchByTitle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title } = req.query;
  if (!title) {
    return next(new ErrorHandler("Title should be given", 404));
  }
  try {
    const blogs = await BlogPost.find({
      title: new RegExp(title as string, "i"),
    });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
};

export const addSingleImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const image = req.file;
    if (!image) {
      return next(new ErrorHandler("No image inserted", 404));
    }
    const singleImage = await BlogPost.create({ image: image.path });
    res.status(201).json({
      success: true,
      message: "Single Image Added Successfully",
      singleImage,
    });
  } catch (err) {
    next(err);
  }
};

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const image = req.file;
    if (!image) {
      return next(new ErrorHandler("No image inserted", 404));
    }
    const singleImage = await BlogImage.create({ image: image.path });
    res.status(201).json({
      success: 1,
      singleImage,
    });
  } catch (err) {
    next(err);
  }
};
