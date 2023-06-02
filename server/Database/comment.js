import pool from "./database.js";

export const createComment = async (post_id, user_id, comment) => {
  const [result] = await pool.query(
    `INSERT INTO comments (post_id, user_id, comment, edited) VALUES (?, ?, ?, false)`,
    [post_id, user_id, comment]
  );
  const comment_id = result.insertId;
  return getCommentById(comment_id);
};

export const getALlComments = async () => {
  const [result] = await pool.query("SELECT * FROM comments");
  return result;
};

export const getCommentById = async (comment_id) => {
  const [result] = await pool.query(
    "SELECT * FROM comments WHERE comment_id = ?",
    [comment_id]
  );
  return result[0];
};

export const getCommentsOfPostId = async (post_id) => {
  const [result] = await pool.query(
    "SELECT * FROM comments WHERE post_id = ?",
    [post_id]
  );
  return result;
};

export const getCommentsCountOfPostId = async (post_id) => {
  const [result] = await pool.query(
    "SELECT count(*) FROM comments WHERE post_id = ?",
    [post_id]
  );
  return result[0];
};

export const deleteComment = async (comment_id) => {
  const [result] = await pool.query(
    "DELETE FROM comments WHERE comment_id = ?",
    [comment_id]
  );
  return result.affectedRows === 1;
};
