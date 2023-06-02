import axios from "axios";

import { Comment, CommentCount } from "../types";

const BASE_URL = "http://localhost:5000/comments";
const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `${localStorage.getItem("token")}`;
  }
  return req;
});

export const createComment = async (comment: Comment) => {
  return await API.post<Comment>("/", comment);
};

export const getCommentsOfPostId = async (post_id: number) => {
  return await API.get<Comment[]>(`/post_id/${post_id}`);
};

export const getCommentsCountOfPostId = async (post_id: number) => {
  return await API.get<CommentCount>(`/post_id/${post_id}/commentCount`);
};

export const deleteComment = async (comment_id: number) => {
  return await API.delete<boolean>("/", { data: { comment_id } });
};
