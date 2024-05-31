import express, { Request, Response, Router } from "express";
import {
  addBlogs,
  deleteBlogs,
  editBlogs,
  getAllBlogs,
  filterBlog,
  getSingleBlog,
  searchByTitle,
  uploadImage,
} from "../controllers/blog.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/all", getAllBlogs);

router.get("/single/:id", getSingleBlog);

router.post("/new", singleUpload, addBlogs);

router.put("/edit/:id", singleUpload, editBlogs);

router.delete("/delete/:id", deleteBlogs);

router.get("/filter", filterBlog);

router.get("/search", searchByTitle);

export default router;
