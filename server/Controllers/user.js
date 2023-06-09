import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
import { userSearch } from "../Database/user.js";

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
    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET);
    res.send({ user, token });
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
    if (!user) return res.send(false);
    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    res.send(error);
  }
};

export const _deleteAccount = async (req, res) => {
  try {
    const { user_id } = req.user;
    const result = await deleteUser(user_id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

export const _updateTheme = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { theme } = req.body;
    const updatedUser = await updateTheme(user_id, theme);
    res.send(updatedUser);
  } catch (error) {
    res.send(error);
  }
};

export const _updateFullName = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { fullName } = req.body;
    const updatedUser = await updateFullName(user_id, fullName);
    res.send(updatedUser);
  } catch (error) {
    res.send(error);
  }
};

export const _updateEmail = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { email } = req.body;
    const updatedUser = await updateEmail(user_id, email);
    res.send(updatedUser);
  } catch (error) {
    res.send(error);
  }
};

export const _updatePassword = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 13);
    const updatedUser = await updatePassword(user_id, hashedPassword);
    res.send(updatedUser);
  } catch (error) {
    res.send(error);
  }
};

export const _updateProfilePicture = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { profilePicture } = req.body;
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
      if (!isValid) res.send(isValid);
      else {
        const token = jwt.sign(
          { user_id: user.user_id },
          process.env.JWT_SECRET
        );
        res.send({ user, token });
      }
    }
  } catch (error) {
    res.send(error);
  }
};

export const _isPasswordEmpty = async (req, res) => {
  try {
    const { password } = req.query;
    const isEmpty = bcrypt.compareSync("", password);
    res.send(isEmpty);
  } catch (error) {
    res.send(error);
  }
};

export const _isPasswordCorrect = async (req, res) => {
  try {
    const { password, hashedPassword } = req.query;
    const isCorrect = bcrypt.compareSync(password, hashedPassword);
    res.send(isCorrect);
  } catch (error) {
    res.send(error);
  }
};

export const _userSearch = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const result = await userSearch(searchTerm);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};
