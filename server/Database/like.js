import pool from "./database.js";

export const createLike = async (type, target_id, user_id) => {
  const [result] = await pool.query(
    `INSERT INTO likes (type,target_id,user_id) VALUES (?, ?, ?)`,
    [type, target_id, user_id]
  );
  const like_id = result.insertId;
  return getLikeById(like_id);
};

export const getAllLikes = async () => {
  const [result] = await pool.query("SELECT * FROM likes");
  return result;
};

export const getLikeById = async (like_id) => {
  const [result] = await pool.query("SELECT * FROM likes WHERE like_id = ?", [
    like_id,
  ]);
  return result[0];
};

export const getLikeCountOfTargetId = async (target_id) => {
  const [result] = await pool.query(
    "SELECT count(*) FROM likes WHERE target_id = ?",
    [target_id]
  );
  return result[0];
};

export const deleteLike = async (like_id) => {
  const [result] = await pool.query("DELETE FROM likes WHERE like_id = ?", [
    like_id,
  ]);
  return result.affectedRows === 1;
};
