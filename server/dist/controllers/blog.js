import BlogPost from "../models/blogPosts.js";
import slugify from "slugify";
import BlogImage from "../models/blogImages.js";
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
        const { slug } = req.params;
        const blog = await BlogPost.findOne({ slug });
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not Found",
            });
        }
        res.json({
            success: true,
            message: `Blog ${blog.slug} found`,
            blog,
        });
    }
    catch (err) {
        next(err);
    }
};
export const addBlogs = async (req, res, next) => {
    try {
        const { title, overview, description } = req.body;
        const image = req.file;
        if (!image) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }
        const slug = slugify(title, { lower: true, strict: true });
        const newBlogPost = new BlogPost({
            title,
            overview,
            description,
            slug,
            image: image.path,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const savedBlogPost = await newBlogPost.save();
        res.status(201).json({
            success: true,
            message: "Blog Added Successfully",
            blog: savedBlogPost,
        });
    }
    catch (err) {
        console.log(err);
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
        console.log(formattedPosts);
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
export const addSingleImage = async (req, res) => {
    try {
        const image = req.file;
        if (!image) {
            return res.status(404).json({
                success: false,
                message: "No Image found",
            });
        }
        const singleImage = await BlogPost.create({ image: image.path });
        res.status(201).json({
            success: true,
            message: "Single Image Added Successfully",
            singleImage,
        });
    }
    catch (err) {
        res.status(500).json({
            error: "failed to create Image",
            message: `The error is:${err}`,
        });
    }
};
export const uploadImage = async (req, res, next) => {
    try {
        const image = req.file;
        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not Found",
            });
        }
        const singleImage = await BlogImage.create({ image: image.path });
        res.status(201).json({
            success: true,
            message: "Single Image Added Successfully",
            singleImage,
        });
    }
    catch (err) {
        next(err);
    }
};
