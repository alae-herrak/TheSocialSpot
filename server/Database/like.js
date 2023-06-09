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

export const getPostLikeCountOfTargetId = async (target_id) => {
  const [result] = await pool.query(
    "SELECT count(*) FROM likes WHERE target_id = ? and type = ?",
    [target_id, "post"]
  );
  return result[0];
};

export const getCommentLikeCountOfTargetId = async (target_id) => {
  const [result] = await pool.query(
    "SELECT count(*) FROM likes WHERE target_id = ? and type = ?",
    [target_id, "comment"]
  );
  return result[0];
};

export const getTargetIdUsers = async (target_id) => {
  const [result] = await pool.query(
    "SELECT user_id FROM likes WHERE target_id = ?",
    [target_id]
  );
  return result;
};

export const getLikeId = async (target_id, user_id) => {
  const [result] = await pool.query(
    "SELECT like_id FROM likes WHERE target_id = ? AND user_id = ?",
    [target_id, user_id]
  );
  return result[0];
};

export const deleteLike = async (like_id) => {
  const [result] = await pool.query(
    "DELETE FROM likes WHERE like_id = ?",
    [[like_id]]
  );
  return result.affectedRows === 1;
};
