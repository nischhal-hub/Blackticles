import mongoose, { Schema, Document, Model } from "mongoose";

interface IBlogPost extends Document {
  title: string;
  overview: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema: Schema<IBlogPost> = new Schema({
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

const BlogPost: Model<IBlogPost> = mongoose.model<IBlogPost>(
  "BlogPost",
  BlogPostSchema
);

export default BlogPost;
