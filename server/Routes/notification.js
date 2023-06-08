import express from "express";
import auth from "../middleware/auth.js";
import {
  _createNotification,
  _deleteNotification,
  _getAllNotifications,
  _getNotificationById,
  _getNotificationsOfUserId,
} from "../Controllers/notification.js";

const router = express.Router();

// POST Requests
router.post("/", auth, _createNotification);

// GET Requests
router.get("/", auth, _getAllNotifications);
router.get("/notification_id/:notification_id", auth, _getNotificationById);
router.get("/user_id", auth, _getNotificationsOfUserId);

// DELETE Requests
router.delete("/", _deleteNotification);

export default router;
