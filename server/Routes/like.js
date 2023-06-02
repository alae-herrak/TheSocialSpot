import express from "express";
import {
  _createLike,
  _deleteLike,
  _getAllLikes,
  _getLikeById,
  _getLikeCountOfTargetId,
  _getLikeId,
  _getTargetIdUsers,
} from "../Controllers/like.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// POST Requests
router.post("/", auth, _createLike);

// GET Requests
router.get("/", auth, _getAllLikes);
router.get("/like_id/:like_id", auth, _getLikeById);
router.get("/likeCount/:target_id", auth, _getLikeCountOfTargetId);
router.get("/userIds/:target_id", auth, _getTargetIdUsers);
router.get("/like_id", auth, _getLikeId);

// DELETE Requests
router.delete("/", auth, _deleteLike);

export default router;
