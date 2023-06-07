import express from "express";
import {
  _createLike,
  _deleteLike,
  _getAllLikes,
  _getCommentLikeCountOfTargetId,
  _getLikeById,
  _getLikeId,
  _getPostLikeCountOfTargetId,
  _getTargetIdUsers,
} from "../Controllers/like.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// POST Requests
router.post("/", auth, _createLike);

// GET Requests
router.get("/", auth, _getAllLikes);
router.get("/like_id/:like_id", auth, _getLikeById);
router.get("/post/likeCount/:target_id", auth, _getPostLikeCountOfTargetId);
router.get("/comment/likeCount/:target_id", auth, _getCommentLikeCountOfTargetId);
router.get("/userIds/:target_id", auth, _getTargetIdUsers);
router.get("/like_id", auth, _getLikeId);

// DELETE Requests
router.delete("/", auth, _deleteLike);

export default router;
