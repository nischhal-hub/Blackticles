import BlogPost from "../models/blogPosts.js";
import { rm } from "fs";
export const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await BlogPost.find({});
        res.status(200).json({
            success: true,
            blogs,
        });
    }
    catch (err) {
        next(err);
    }
};
export const getSingleBlog = async (req, res, next) => {
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
    }
    catch (err) {
        next(err);
    }
};
export const addBlogs = async (req, res, next) => {
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
    }
    catch (err) {
        next(err);
    }
};
export const editBlogs = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, overview, description, createdAt, updatedAt } = req.body;
        const image = req.file;
        const blog = await BlogPost.findByIdAndUpdate(id, {
            title,
            overview,
            description,
            createdAt,
            updatedAt,
            image: image?.path,
        }, { new: true });
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
    }
    catch (err) {
        next(err);
    }
};
export const deleteBlogs = async (req, res, next) => {
    const id = req.params.id;
    try {
        const deletedBlog = await BlogPost.findByIdAndDelete(id);
        if (deletedBlog) {
            res.json({ success: true, message: "Blog deleted Successfully" });
        }
        else {
            res.status(404).json({ success: false, message: "Blog not found" });
        }
    }
    catch (err) {
        next(err);
    }
};
// Route to search blogs by date range
export const filterBlog = async (req, res) => {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
        return res
            .status(400)
            .json({ error: "Start date and end date are required" });
    }
    try {
        // Convert string dates to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);
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
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch blogs" });
    }
};
// Route to search blogs by title
export const searchByTitle = async (req, res) => {
    const { title } = req.query;
    if (!title) {
        return res.status(400).json({ error: "Title query parameter is required" });
    }
    try {
        const blogs = await BlogPost.find({
            title: new RegExp(title, "i"),
        });
        res.json(blogs);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch blogs" });
    }
};
export const uploadImage = async (req, res) => {
    res.json(req.file);
};
