import axios from "axios";

import { Notification } from "../types";

const BASE_URL = "http://localhost:5000/notifications";
const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `${localStorage.getItem("token")}`;
  }
  return req;
});

export const createNotification = async (notification: Notification) => {
  return await API.post<Notification>("/", notification);
};

export const getNotificationsOfUser = async () => {
  return await API.get<Notification[]>("/user_id");
};

export const openNotificationsOfUser = async () => {
  return await API.patch("/openNotifications");
};

export const deleteNotification = async (
  event: string,
  user_id1: number,
  user_id2: number,
  ressource_id: number
) => {
  return await API.delete("/", {
    data: { event, user_id1, user_id2, ressource_id },
  });
};
