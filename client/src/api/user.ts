import axios from "axios";

import { User, UserWithToken } from "../types";

const BASE_URL = "http://localhost:5000/users";
const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

export const createUser = async (User: User) => {
  return await API.post<UserWithToken>("/", User);
};

export const getAllUsers = async () => {
  return API.get<User[]>("/");
};

export const getUserByEmail = async (email: string) => {
  return await API.get<UserWithToken>(`/email/${email}`);
};

export const checkLogin = async (email: string, password: string) => {
  return await API.get<UserWithToken>(
    `/checkLogin/?email=${email}&password=${password}`
  );
};

export const updateFullName = async (user_id: number, fullName: string) => {
  return await API.patch<User>(`/update/fullname`, {
    user_id,
    fullName,
  });
};
export const updateProfilePicture = async (
  user_id: number,
  profilePicture: string
) => {
  return await API.patch<User>(`/update/fullname`, {
    user_id,
    profilePicture,
  });
};
