import express from "express";
import {
  _createComment,
  _deleteComment,
  _getALlComments,
  _getCommentById,
  _getCommentsCountOfPostId,
  _getCommentsOfPostId,
  _updateComment,
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

// PATCH Requests
router.patch("/", auth, _updateComment);

// DELETE Requests
router.delete("/", auth, _deleteComment);

export default router;
