import pool from "./database.js";

export const createNotification = async (
  event,
  user_id1,
  user_id2,
  ressource_id
) => {
  const [result] = await pool.query(
    `INSERT INTO notifications (event, user_id1, user_id2, ressource_id, opened) VALUES (?, ?, ?, ?, ?)`,
    [event, user_id1, user_id2, ressource_id, false]
  );
  const notification_id = result.insertId;
  return getNotificationById(notification_id);
};

export const getAllNotifications = async () => {
  const [result] = await pool.query("SELECT * FROM notifications");
  return result;
};

export const getNotificationById = async (notification_id) => {
  const [result] = await pool.query(
    "SELECT * FROM notifications WHERE notification_id = ?",
    [notification_id]
  );
  return result[0];
};

export const getNotificationsOfUserId = async (user_id) => {
  const [result] = await pool.query(
    "SELECT * FROM notifications WHERE user_id2 = ? ORDER BY notification_id DESC LIMIT 30",
    [user_id]
  );
  return result;
};

export const openNotificationsOfUserId = async (user_id) => {
  const [result] = await pool.query(
    "UPDATE notifications SET opened = ? WHERE user_id2 = ?",
    [true, user_id]
  );
  return result;
};

export const deleteNotification = async (
  event,
  user_id1,
  user_id2,
  ressource_id
) => {
  const [result] = await pool.query(
    "DELETE FROM notifications WHERE event = ? AND user_id1 = ? AND user_id2 = ? AND ressource_id = ?",
    [event, user_id1, user_id2, ressource_id]
  );
  return result.affectedRows === 1;
};
