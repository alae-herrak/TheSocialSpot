import express from "express";
import {
  _createComment,
  _deleteComment,
  _getALlComments,
  _getCommentById,
  _getCommentsCountOfPostId,
  _getCommentsOfPostId,
} from "../Controllers/comment.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// POST Requests
router.post("/", auth, _createComment);

// GET Requests
router.get("/", auth, _getALlComments);
router.get("/comment_id/:comment_id", auth, _getCommentById);
router.get("/post_id/:post_id", auth, _getCommentsOfPostId);
router.get("/post_id/:post_id/commentCount", auth, _getCommentsCountOfPostId);

// DELETE Requests
router.delete("/", auth, _deleteComment);

export default router;
