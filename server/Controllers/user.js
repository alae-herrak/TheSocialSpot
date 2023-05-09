import bcrypt from "bcrypt";
import {
  blockUser,
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  unblockUser,
  updateEmail,
  updatePassword,
  updateProfilePicture,
  updateUsername,
} from "../Database/database.js";

export const _createUser = async (req, res) => {
  try {
    const { username, email, password, profilePicture } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 13);
    const user = await createUser(
      username,
      email,
      hashedPassword,
      profilePicture
    );
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

export const _getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
};

export const _getUserById = async (req, res) => {
  try {
    const user = await getUserById(req.params.user_id);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

export const _deleteUser = async (req, res) => {
  try {
    const result = await deleteUser(req.params.user_id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

export const _updateUsername = async (req, res) => {
  try {
    const { user_id, username } = req.body;
    const updatedUser = await updateUsername(user_id, username);
    res.send(updatedUser);
  } catch (error) {
    res.send(error);
  }
};

export const _updateEmail = async (req, res) => {
  try {
    const { user_id, email } = req.body;
    const updatedUser = await updateEmail(user_id, email);
    res.send(updatedUser);
  } catch (error) {
    res.send(error);
  }
};

export const _updatePassword = async (req, res) => {
  try {
    const { user_id, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 13);
    const updatedUser = await updatePassword(user_id, hashedPassword);
    res.send(updatedUser);
  } catch (error) {
    res.send(error);
  }
};

export const _updateProfilePicture = async (req, res) => {
  try {
    const { user_id, profilePicture } = req.body;
    const updatedUser = await updateProfilePicture(user_id, profilePicture);
    res.send(updatedUser);
  } catch (error) {
    res.send(error);
  }
};

export const _blockUser = async (req, res) => {
  try {
    const { user_id } = req.body;
    const blockedUser = await blockUser(user_id);
    res.send(blockedUser);
  } catch (error) {
    res.send(error);
  }
};

export const _unblockUser = async (req, res) => {
  try {
    const { user_id } = req.body;
    const unblockedUser = await unblockUser(user_id);
    res.send(unblockedUser);
  } catch (error) {
    res.send(error);
  }
};
