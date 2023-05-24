import express from "express";
import {
  _blockUser,
  _checkLogin,
  _createUser,
  _deleteAccount,
  _getAllUsers,
  _getUserByEmail,
  _getUserById,
  _isPasswordCorrect,
  _isPasswordEmpty,
  _unblockUser,
  _updateEmail,
  _updateFullName,
  _updatePassword,
  _updateProfilePicture,
  _updateTheme,
} from "../Controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// POST Requests
router.post("/", _createUser);

// GET Requests
router.get("/", _getAllUsers);
router.get("/user_id/:user_id", _getUserById);
router.get("/email/:email", _getUserByEmail);
router.get("/checkLogin", _checkLogin);
router.get("/isPasswordEmpty", auth, _isPasswordEmpty);
router.get("/isPasswordCorrect", auth, _isPasswordCorrect);

// PATCH Requests
router.patch("/update/theme", auth, _updateTheme);
router.patch("/update/fullName", auth, _updateFullName);
router.patch("/update/email", auth, _updateEmail);
router.patch("/update/password", auth, _updatePassword);
router.patch("/update/profilePicture", auth, _updateProfilePicture);
router.patch("/block", _blockUser);
router.patch("/unblock", _unblockUser);

// DELETE Requests
router.delete("/delete", auth, _deleteAccount);

export default router;
