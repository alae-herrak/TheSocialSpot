import pool from "./database.js";

export const createPost = async (user_id, textContent, photo, date, edited) => {
  const [result] = await pool.query(
    `INSERT INTO posts (user_id,textContent,photo,date, edited) VALUES (?, ?, ?, ?, ?)`,
    [user_id, textContent, photo, date, edited]
  );
  const post_id = result.insertedId;
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
