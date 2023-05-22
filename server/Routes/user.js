import express from "express";
import {
  _blockUser,
  _checkLogin,
  _createUser,
  _deleteUser,
  _getAllUsers,
  _getUserByEmail,
  _getUserById,
  _unblockUser,
  _updateEmail,
  _updateFullName,
  _updatePassword,
  _updateProfilePicture,
  _updateTheme,
} from "../Controllers/user.js";
import auth from '../middleware/auth.js'

const router = express.Router();

// POST Requests
router.post("/", _createUser);

// GET Requests
router.get("/", _getAllUsers);
router.get("/user_id/:user_id", _getUserById);
router.get("/email/:email", _getUserByEmail);
router.get("/checkLogin", _checkLogin);

// PATCH Requests
router.patch("/update/theme", auth, _updateTheme);
router.patch("/update/fullName", auth, _updateFullName);
router.patch("/update/email", auth, _updateEmail);
router.patch("/update/password", _updatePassword);
router.patch("/update/profilePicture", auth, _updateProfilePicture);
router.patch("/block", _blockUser);
router.patch("/unblock", _unblockUser);

// DELETE Requests
router.delete("/delete/user_id/:user_id", _deleteUser);

export default router;
