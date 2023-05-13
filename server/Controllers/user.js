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
  updateTheme,
  updateFullName,
  getUserByEmail,
} from "../Database/user.js";

export const _createUser = async (req, res) => {
  try {
    const { fullName, email, password, profilePicture, theme } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 13);
    const user = await createUser(
      fullName,
      email,
      hashedPassword,
      profilePicture,
      theme
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

export const _getUserByEmail = async (req, res) => {
  try {
    const user = await getUserByEmail(req.params.email);
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

export const _updateTheme = async (req, res) => {
  try {
    const { user_id, theme } = req.body;
    const updatedUser = await updateTheme(user_id, theme);
    res.send(updatedUser);
  } catch (error) {
    res.send(error);
  }
};

export const _updateFullName = async (req, res) => {
  try {
    const { user_id, fullName } = req.body;
    const updatedUser = await updateFullName(user_id, fullName);
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

export const _checkLogin = async (req, res) => {
  try {
    const { email, password } = req.query;
    const user = await getUserByEmail(email);
    if (!user) res.send(false);
    else {
      const isValid = bcrypt.compareSync(password, user.password);
      res.send(isValid ? user : isValid);
    }
  } catch (error) {
    res.send(error);
  }
};
