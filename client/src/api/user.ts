import axios from "axios";

import { User } from "../types";

const URL = "http://localhost:5000/users";

export const createUser = async (User: User) => {
  return await axios.post(URL, User);
};

export const getAllUsers = async () => {
  return axios.get<User[]>(URL);
};
