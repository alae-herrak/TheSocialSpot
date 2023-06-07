import {
  createComment,
  deleteComment,
  getALlComments,
  getCommentById,
  getCommentsCountOfPostId,
  getCommentsOfPostId,
  updateComment,
} from "../Database/comment.js";

export const _createComment = async (req, res) => {
  try {
    const { post_id, user_id, comment } = req.body;
    const newComment = await createComment(post_id, user_id, comment);
    res.send(newComment);
  } catch (error) {
    res.send(error);
  }
};

export const _getALlComments = async (req, res) => {
  try {
    const comments = await getALlComments();
    res.send(comments);
  } catch (error) {
    res.send(error);
  }
};

export const _getCommentById = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const comment = await getCommentById(comment_id);
    res.send(comment);
  } catch (error) {
    res.send(error);
  }
};

export const _getCommentsOfPostId = async (req, res) => {
  try {
    const { post_id } = req.params;
    const comments = await getCommentsOfPostId(post_id);
    res.send(comments);
  } catch (error) {
    res.send(error);
  }
};

export const _getCommentsCountOfPostId = async (req, res) => {
  try {
    const { post_id } = req.params;
    const count = await getCommentsCountOfPostId(post_id);
    res.send(count);
  } catch (error) {
    res.send(error);
  }
};

export const _updateComment = async (req, res) => {
  try {
    const { comment_id, comment } = req.body;
    const updatedComment = await updateComment(comment_id, comment);
    res.send(updatedComment);
  } catch (error) {
    res.send(error);
  }
};

export const _deleteComment = async (req, res) => {
  try {
    const { comment_id } = req.body;
    const deleted = await deleteComment(comment_id);
    res.send(deleted);
  } catch (error) {
    res.send(error);
  }
};
