import axios from "axios";

import { User, UserWithToken } from "../types";

const BASE_URL = "http://localhost:5000/users";
const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `${localStorage.getItem("token")}`;
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

export const updateFullName = async (fullName: string) => {
  return await API.patch<User>(`/update/fullname`, {
    fullName,
  });
};
export const updateProfilePicture = async (profilePicture: string) => {
  return await API.patch<User>(`/update/fullname`, {
    profilePicture,
  });
};

export const updateTheme = async (theme: string) => {
  return await API.patch("/update/theme", {
    theme,
  });
};
