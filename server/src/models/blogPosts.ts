import mongoose, { Schema, Document, Model } from "mongoose";
import slugify from "slugify";

interface IBlogPost extends Document {
  title: string;
  overview: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
}

const BlogPostSchema: Schema<IBlogPost> = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

BlogPostSchema.pre<IBlogPost>("validate", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const BlogPost: Model<IBlogPost> = mongoose.model<IBlogPost>(
  "BlogPost",
  BlogPostSchema
);

export default BlogPost;
