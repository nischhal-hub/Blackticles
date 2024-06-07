import mongoose, { Schema, Document, Model } from "mongoose";

interface IBlogImage extends Document {
  image: string;
}

const BlogPostSchema: Schema<IBlogImage> = new Schema({
  image: {
    type: String,
    required: true,
  },
});

const BlogImage: Model<IBlogImage> = mongoose.model<IBlogImage>(
  "BlogImage",
  BlogPostSchema
);

export default BlogImage;
