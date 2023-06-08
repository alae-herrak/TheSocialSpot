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
router.post("/", _createNotification);

// GET Requests
router.get("/", _getAllNotifications);
router.get("/notification_id/:notification_id", _getNotificationById);
router.get("/user_id/:user_id", _getNotificationsOfUserId);

// DELETE Requests
router.delete("/", _deleteNotification);

export default router;
