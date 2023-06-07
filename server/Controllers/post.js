import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getPostsOfUserId,
  updatePost,
} from "../Database/post.js";

export const _createPost = async (req, res) => {
  try {
    const { user_id, textContent, photo, date, edited } = req.body;
    const post = await createPost(user_id, textContent, photo, date, edited);
    res.send(post);
  } catch (error) {
    res.send(error);
  }
};

export const _getAllPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.send(posts);
  } catch (error) {
    res.send(error);
  }
};

export const _getPostById = async (req, res) => {
  try {
    const post = await getPostById(req.params.post_id);
    res.send(post);
  } catch (error) {
    res.send(error);
  }
};

export const _getPostsOfUserId = async (req, res) => {
  try {
    const posts = await getPostsOfUserId(req.params.user_id);
    res.send(posts);
  } catch (error) {
    res.send(error);
  }
};

export const _updatePost = async (req, res) => {
  try {
    const { post_id, textContent, photo } = req.body;
    const updatedPost = await updatePost(post_id, textContent, photo);
    res.send(updatedPost);
  } catch (error) {
    res.send(error);
  }
};

export const _deletePost = async (req, res) => {
  try {
    const { post_id } = req.body;
    const result = await deletePost(post_id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};
