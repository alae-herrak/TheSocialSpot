import {
  createRelation,
  deleteRelation,
  getAllRelations,
  getRelationById,
  updateRelation,
} from "../Database/relation.js";

export const _createRelation = async (req, res) => {
  try {
    const { user_id1, user_id2, state } = req.body;
    const relation = await createRelation(user_id1, user_id2, state);
    res.send(relation);
  } catch (error) {
    res.send(error);
  }
};

export const _getAllRelations = async (req, res) => {
  try {
    const relations = await getAllRelations();
    res.send(relations);
  } catch (error) {
    res.send(error);
  }
};

export const _getRelationById = async (req, res) => {
  try {
    const relation = await getRelationById(req.params.relation_id);
    res.send(relation);
  } catch (error) {
    res.send(error);
  }
};

export const _updateRelation = async (req, res) => {
  try {
    const { relation_id, state } = req.body;
    const relation = await updateRelation(relation_id, state);
    res.send(relation);
  } catch (error) {
    res.send(error);
  }
};

export const _deleteRelation = async (req, res) => {
  try {
    const { relation_id } = req.body;
    const relation = await deleteRelation(relation_id);
    res.send(relation);
  } catch (error) {
    res.send(error);
  }
};
