import { createPost, getAllPosts, getPostById, getPostsOfUserId } from "../Database/post.js";

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
