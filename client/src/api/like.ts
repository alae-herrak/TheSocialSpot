import axios from "axios";

import { Like, LikeCount } from "../types";

const BASE_URL = "http://localhost:5000/likes";
const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `${localStorage.getItem("token")}`;
  }
  return req;
});

export const createPostLike = async (target_id: number, user_id: number) => {
  const like: Like = {
    like_id: undefined,
    type: "post",
    target_id,
    user_id,
  };
  return await API.post<Like>("/", like);
};

export const getPostLikeCount = async (target_id: number) => {
  return await API.get<LikeCount>(`/likeCount/${target_id}`);
};

export const getPostLikeUserIds = async (target_id: number) => {
  return await API.get<{ user_id: number }[]>(`/userIds/${target_id}`);
};

export const deleteLike = async (like_id: number) => {
  return await API.delete<boolean>("/", { data: { like_id } });
};

export const createCommentLike = async (target_id: number, user_id: number) => {
  const like: Like = {
    like_id: undefined,
    type: "comment",
    target_id,
    user_id,
  };
  return await API.post<Like>("/", like);
};

export const getCommentLikeCount = async (target_id: number) => {
  return await API.get<LikeCount>(`/likeCount/${target_id}`);
};

export const getCommentLikeUserIds = async (target_id: number) => {
  return await API.get<{ user_id: number }[]>(`/userIds/${target_id}`);
};

export const getLikeId = async (target_id: number, user_id: number) => {
  return await API.get<{ like_id: number }>(
    `/like_id?target_id=${target_id}&user_id=${user_id}`
  );
};
