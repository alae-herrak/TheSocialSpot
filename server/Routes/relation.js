import express from "express";
import {
  _createRelation,
  _deleteRelation,
  _getAllRelations,
  _getRelationById,
  _updateRelation,
} from "../Controllers/relation.js";
const router = express.Router();

// POST Requests
router.post("/", _createRelation);

// GET Requests
router.get("/", _getAllRelations);
router.get("/relation_id/:relation_id", _getRelationById);

// Patch Requests
router.patch("/", _updateRelation);

// DELETE Requests
router.delete("/", _deleteRelation);

export default router;
