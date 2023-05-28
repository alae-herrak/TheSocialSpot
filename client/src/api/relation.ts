import axios from "axios";

import { Relation } from "../types";

const BASE_URL = "http://localhost:5000/relations";
const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `${localStorage.getItem("token")}`;
  }
  return req;
});

export const getRelationOfTwoUserIds = async (
  user_id1: number,
  user_id2: number
) => {
  return await API.get<Relation>(
    `/ofTwoUsers?user_id1=${user_id1}&user_id2=${user_id2}`
  );
};

export const createRelation = async (relation: Relation) => {
  return await API.post<Relation>("/", relation);
};

export const updateRelation = async (relation_id: number, state: string) => {
  return await API.patch("/", { relation_id, state });
};

export const deleteRelation = async (relation_id: number) => {
  return await API.delete(`/${relation_id}`);
};
