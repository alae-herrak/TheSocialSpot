import {
  createNotification,
  deleteNotification,
  getAllNotifications,
  getNotificationById,
  getNotificationsOfUserId,
  openNotificationsOfUserId,
} from "../Database/notification.js";

export const _createNotification = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { event, user_id2, ressource_id } = req.body;
    const newNotification = await createNotification(
      event,
      user_id,
      user_id2,
      ressource_id
    );
    res.send(newNotification);
  } catch (error) {
    res.send(error);
  }
};

export const _getAllNotifications = async (req, res) => {
  try {
    const notifications = await getAllNotifications();
    res.send(notifications);
  } catch (error) {
    res.send(error);
  }
};

export const _getNotificationById = async (req, res) => {
  try {
    const { notification_id } = req.params;
    const notification = await getNotificationById(notification_id);
    res.send(notification);
  } catch (error) {
    res.send(error);
  }
};

export const _getNotificationsOfUserId = async (req, res) => {
  try {
    const { user_id } = req.user;
    const notifications = await getNotificationsOfUserId(user_id);
    res.send(notifications);
  } catch (error) {
    res.send(error);
  }
};

export const _openNotificationsOfUserId = async (req, res) => {
  try {
    const { user_id } = req.user;
    const result = await openNotificationsOfUserId(user_id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

export const _deleteNotification = async (req, res) => {
  try {
    const { event, user_id1, user_id2, ressource_id } = req.body;
    const deleted = await deleteNotification(
      event,
      user_id1,
      user_id2,
      ressource_id
    );
    res.send(deleted);
  } catch (error) {
    res.send(error);
  }
};
