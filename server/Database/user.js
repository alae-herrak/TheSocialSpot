import pool from "./database.js";

export const createUser = async (
  fullName,
  email,
  password,
  profilePicture,
  theme
) => {
  const [result] = await pool.query(
    `INSERT INTO users (fullName, email, password, profilePicture, state, role, theme) VALUES (?, ?, ?, ?, 'active', 'user', ?)`,
    [fullName, email, password, profilePicture, theme]
  );
  const user_id = result.insertId;
  return getUserById(user_id);
};

export const getAllUsers = async () => {
  const [result] = await pool.query(`SELECT * FROM users WHERE role = 'user'`);
  return result;
};

export const getUserById = async (user_id) => {
  const [result] = await pool.query(
    `SELECT * FROM users WHERE role = 'user' AND user_id = ?`,
    [user_id]
  );
  return result[0];
};

export const getUserByEmail = async (emeail) => {
  const [result] = await pool.query(
    `SELECT * FROM users WHERE role = 'user' AND email = ?`,
    [emeail]
  );
  return result[0];
};

export const deleteUser = async (user_id) => {
  const [result] = await pool.query(`DELETE FROM users WHERE user_id = ?`, [
    user_id,
  ]);
  return result.affectedRows === 1;
};

export const updateTheme = async (user_id, theme) => {
  const [result] = await pool.query(
    `UPDATE users SET theme = ? WHERE user_id = ?`,
    [theme, user_id]
  );
  return getUserById(user_id);
};

export const updateFullName = async (user_id, fullName) => {
  const [result] = await pool.query(
    `UPDATE users SET fullName = ? WHERE user_id = ?`,
    [fullName, user_id]
  );
  return getUserById(user_id);
};

export const updateEmail = async (user_id, email) => {
  const [result] = await pool.query(
    `UPDATE users SET email = ? WHERE user_id = ?`,
    [email, user_id]
  );
  return getUserById(user_id);
};

export const updatePassword = async (user_id, password) => {
  const [result] = await pool.query(
    `UPDATE users SET password = ? WHERE user_id = ?`,
    [password, user_id]
  );
  return getUserById(user_id);
};

export const updateProfilePicture = async (user_id, profilePicture) => {
  const [result] = await pool.query(
    `UPDATE users SET profilePicture = ? WHERE user_id = ?`,
    [profilePicture, user_id]
  );
  return getUserById(user_id);
};

export const blockUser = async (user_id) => {
  const [result] = await pool.query(
    `UPDATE users SET state = 'blocked' WHERE user_id = ?`,
    [user_id]
  );
  return getUserById(user_id);
};

export const unblockUser = async (user_id) => {
  const [result] = await pool.query(
    `UPDATE users SET state = 'active' WHERE user_id = ?`,
    [user_id]
  );
  return getUserById(user_id);
};

export const userSearch = async (searchTerm) => {
  const [result] = await pool.query(
    `SELECT * FROM users WHERE fullName like ? OR email like ?`,
    [`%${searchTerm}%`, `%${searchTerm}%`]
  );
  return result;
};
