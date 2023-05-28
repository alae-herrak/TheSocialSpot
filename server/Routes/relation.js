import express from "express";
import {
  _createRelation,
  _deleteRelation,
  _getAllRelations,
  _getRelationById,
  _getRelationOfTwoUserIds,
  _getRelationsOfUserId,
  _updateRelation,
} from "../Controllers/relation.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// POST Requests
router.post("/", auth, _createRelation);

// GET Requests
router.get("/", _getAllRelations);
router.get("/relation_id/:relation_id", _getRelationById);
router.get("/user_id/:user_id", _getRelationsOfUserId);
router.get("/ofTwoUsers", auth, _getRelationOfTwoUserIds);

// Patch Requests
router.patch("/", auth, _updateRelation);

// DELETE Requests
router.delete("/:relation_id", auth, _deleteRelation);

export default router;
