import express from "express";
import {
  _blockUser,
  _createUser,
  _deleteUser,
  _getAllUsers,
  _getUserById,
  _unblockUser,
  _updateEmail,
  _updateFullName,
  _updatePassword,
  _updateProfilePicture,
  _updateTheme,
  
} from "../Controllers/user.js";
const router = express.Router();

// POST Requests
router.post("/", _createUser);

// GET Requests
router.get("/", _getAllUsers);
router.get("/user_id/:user_id", _getUserById);

// PATCH Requests
router.patch("/update/theme", _updateTheme);
router.patch("/update/fullName", _updateFullName);
router.patch("/update/email", _updateEmail);
router.patch("/update/password", _updatePassword);
router.patch("/update/profilePicture", _updateProfilePicture);
router.patch("/block", _blockUser);
router.patch("/unblock", _unblockUser);

// DELETE Requests
router.delete("/delete/user_id/:user_id", _deleteUser);

export default router;
