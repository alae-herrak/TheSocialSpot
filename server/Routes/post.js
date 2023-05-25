import express from "express";
import {
  _createPost,
  _getAllPosts,
  _getPostById,
} from "../Controllers/post.js";

const router = express.Router();

// POST Requests
router.post("/", _createPost);

// GET Requests
router.get("/", _getAllPosts);
router.get("/post_id/:post_id", _getPostById);

export default router;

