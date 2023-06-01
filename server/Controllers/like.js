import {
  createLike,
  deleteLike,
  getAllLikes,
  getLikeById,
  getLikeCountOfTargetId,
  getTargetIdUsers,
} from "../Database/like.js";

export const _createLike = async (req, res) => {
  try {
    const { type, target_id, user_id } = req.body;
    const like = await createLike(type, target_id, user_id);
    res.send(like);
  } catch (error) {
    res.send(error);
  }
};

export const _getAllLikes = async (req, res) => {
  try {
    const likes = await getAllLikes();
    res.send(likes);
  } catch (error) {
    res.send(error);
  }
};

export const _getLikeById = async (req, res) => {
  try {
    const { like_id } = req.params;
    const like = await getLikeById(like_id);
    res.send(like);
  } catch (error) {
    res.send(error);
  }
};

export const _getLikeCountOfTargetId = async (req, res) => {
  try {
    const { target_id } = req.params;
    const likes = await getLikeCountOfTargetId(target_id);
    res.send(likes);
  } catch (error) {
    res.send(error);
  }
};

export const _getTargetIdUsers = async (req, res) => {
  try {
    const { target_id } = req.params;
    const user_ids = await getTargetIdUsers(target_id);
    res.send(user_ids);
  } catch (error) {
    res.send(error);
  }
};

export const _deleteLike = async (req, res) => {
  try {
    const { like_id } = req.body;
    const result = await deleteLike(like_id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};
