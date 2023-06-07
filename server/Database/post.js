import pool from "./database.js";

export const createPost = async (user_id, textContent, photo, date, edited) => {
  const [result] = await pool.query(
    `INSERT INTO posts (user_id,textContent,photo,date, edited) VALUES (?, ?, ?, ?, ?)`,
    [user_id, textContent, photo, date, edited]
  );
  const post_id = result.insertId;
  return getPostById(post_id);
};

export const getAllPosts = async () => {
  const [result] = await pool.query(`SELECT * FROM posts`);
  return result;
};

export const getPostById = async (post_id) => {
  const [result] = await pool.query(`SELECT * FROM posts WHERE post_id = ?`, [
    post_id,
  ]);
  return result[0];
};

export const getPostsOfUserId = async (user_id) => {
  const [result] = await pool.query(`SELECT * FROM posts WHERE user_id = ?`, [
    user_id,
  ]);
  return result;
};

export const updatePost = async (post_id, textContent, photo) => {
  const [result] = await pool.query(
    `UPDATE posts SET textContent = ?, photo = ?, date = ?, edited = ? WHERE post_id = ?`,
    [textContent, photo, new Date(), true, post_id]
  );
  return getPostById(post_id);
};

export const deletePost = async (post_id) => {
  const [result] = await pool.query(`DELETE FROM posts WHERE post_id = ?`, [
    post_id,
  ]);
  return result.affectedRows === 1;
};
