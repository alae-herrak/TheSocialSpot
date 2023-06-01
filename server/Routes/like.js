import express from "express";
import {
  _createLike,
  _deleteLike,
  _getAllLikes,
  _getLikeById,
  _getLikeCountOfTargetId,
} from "../Controllers/like.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// POST Requests
router.post("/", auth, _createLike);

// GET Requests
router.get("/", auth, _getAllLikes);
router.get("/like_id/:like_id", auth, _getLikeById);
router.get("target_id/:target_id", auth, _getLikeCountOfTargetId);

// DELETE Requests
router.delete("/", auth, _deleteLike);

export default router;
