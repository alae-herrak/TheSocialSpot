import pool from "./database.js";

export const createRelation = async (user_id1, user_id2, state) => {
  const [result] = await pool.query(
    `INSERT INTO relations (user_id1, user_id2, state) values (?, ?, ?)`,
    [user_id1, user_id2, state]
  );
  const relation_id = result.insertedId;
  return getRelationById(relation_id);
};

export const getAllRelations = async () => {
  const [result] = await pool.query(`SELECT * FROM relations`);
  return result;
};

export const getRelationById = async (relation_id) => {
  const [result] = await pool.query(
    `SELECT * FROM relations WHERE relation_id = ?`,
    [relation_id]
  );
  return result[0];
};

export const updateRelation = async (relation_id, state) => {
  const [result] = await pool.query(
    `UPDATE relations SET state = ? WHERE relation_id = ?`,
    [state, relation_id]
  );
  return getRelationById(relation_id);
};

export const deleteRelation = async (relation_id) => {
  const [result] = await pool.query(
    `DELETE FROM relations WHERE relation_id = ?`,
    [relation_id]
  );
  return result.affectedRows === 1;
};
