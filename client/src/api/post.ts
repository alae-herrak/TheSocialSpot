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
