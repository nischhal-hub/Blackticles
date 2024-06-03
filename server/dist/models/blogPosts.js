import mongoose, { Schema } from "mongoose";
import slugify from "slugify";
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
    slug: { type: String, unique: true, required: true },
}, {
    timestamps: true,
});
BlogPostSchema.pre("validate", function (next) {
    if (!this.slug) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});
const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
export default BlogPost;
