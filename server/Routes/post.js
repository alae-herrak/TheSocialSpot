import express from "express";
import {
  _createPost,
  _deletePost,
  _getAllPosts,
  _getPostById,
  _getPostsOfUserId,
} from "../Controllers/post.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// POST Requests
router.post("/", auth, _createPost);

// GET Requests
router.get("/", _getAllPosts);
router.get("/post_id/:post_id", _getPostById);
router.get("/user_id/:user_id", auth, _getPostsOfUserId);

// DELETE Requests
router.delete("/", auth, _deletePost);

export default router;
