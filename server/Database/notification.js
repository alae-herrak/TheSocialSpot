import pool from "./database.js";

export const createNotification = async (
  event,
  user_id1,
  user_id2,
  ressource_id
) => {
  const [result] = await pool.query(
    `INSERT INTO notifications (event, user_id1, user_id2, ressource_id) VALUES (?, ?, ?, ?)`,
    [event, user_id1, user_id2, ressource_id]
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
    "SELECT * FROM notifications WHERE user_id1 = ?",
    [user_id]
  );
  return result;
};

export const deleteNotification = async (notification_id) => {
  const [result] = await pool.query(
    "DELETE FROM notifications WHERE notification_id = ?",
    [[notification_id]]
  );
  return result.affectedRows === 1;
};
