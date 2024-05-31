import mongoose, { Schema } from "mongoose";
const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    overview: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
export default BlogPost;
