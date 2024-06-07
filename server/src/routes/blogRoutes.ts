import express, { Request, Response, Router } from "express";
import {
  addBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  filterBlog,
  getSingleBlog,
  searchByTitle,
  uploadImage,
} from "../controllers/blog.js";
import { singleUpload } from "../middlewares/multer.js";
import { getSingleImage } from "../controllers/singleBlogImage.js";

const router = express.Router();

router.get("/", getAllBlogs);

router.post("/", singleUpload, addBlog);

router.put("/:id", singleUpload, editBlog);

router.delete("/:id", deleteBlog);

router.get("/filter", filterBlog);

router.get("/search", searchByTitle);

router.post("/image", singleUpload, uploadImage);

router.get("/getImage", getSingleImage);

router.get("/:slug", getSingleBlog);

export default router;
