import axios from "axios";

import { Post, PostToCreate } from "../types";

const BASE_URL = "http://localhost:5000/posts";
const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `${localStorage.getItem("token")}`;
  }
  return req;
});

export const createPost = async (post: PostToCreate) => {
  return await API.post<Post>("/", post);
};

export const getPostsOfUserId = async (user_id: number) => {
  return await API.get<Post[]>(`/user_id/${user_id}`);
};

export const updatePost = async (
  post_id: number,
  textContent: string,
  photo: string
) => {
  return await API.patch<Post>("/", { post_id, textContent, photo });
};

export const deletePost = async (post_id: number) => {
  return await API.delete<boolean>("/", { data: { post_id } });
};
